## Background
I'mma be honest. I'm not much of a blogger. I like to write, but it's mostly unpublished fiction wholly separate from my professional life, written first and foremost for myself and maybe a friend. 

In addition to that, I never though I had much to say. 

But ~~after coming up with a website header a little too playful for a professional portfolio and therefore needing a blog~~ after some thought, I thought of the perfect thing. I'm pretty sure it's what got me my internship with PlanGrid, now part of Autodesk, in the first place actually. 

## The Scenario

![The website](/selenium-demo.png)


Back when I was still a wee intern at my first testing job, before I knew anything about good testing practice, we had a couple of curious tests right before monthly releases. One that went from running 10 minutes per test run that would balloon to over three hours. I would take my computer home just so I could finish all the verifications on them.

One of our site pages that displayed information for a user about the clients they were managing.

Each client was a row in a dynamically loaded table, with one column being the amount of money that contract was worth. At the top of the page, it would show a summary of the account with the sum of all the contracts being managed and the number of clients.

Usually, a typical user might manage a couple dozen clients, so we had a selenium test which would scroll down to the bottom. The Selenium test was written using the Page Object Model, and we'd set up the Elements like this. 

```java
import helpers.elementExists;
import helpers.scrollToBottom;

@FindBy(className="dollar-amount")
public List<WebElement> amountList;
@FindBy(className="client-names")
public List<WebElement> namesList;
@FindBy(className="total-dollar-amount")
public WebElement totalAmount;

@FindBy(className="num-clients")
public WebElement numClients;
@FindBy(className="spinner")
public WebElement spinner;
```

And then they'd be used in the test like this,

~~```java~~
int clientCount = 0
// waitForElement returns True if the element exists, False otherwise
while(clientCount <= namesList.size() && !elementExists(spinner)) {
    clientCount = namesList.size();
    scrollToBottom();
}

Assert.assertEquals(Integer.parseInt(numClients.getText()), clientCount);

Double sum = 0;

for(int i=0; i < amountList.size() ; i++) {
    sum = Double.parseDouble(amountList[i].getText());
}

Assert.assertEquals(sum, totalAmount);
```

### What went wrong

If you subscribe to the same testing best practices as me, you're already seeing some flags. This test takes around 10 minuites to run during our regular nightly regression suites, but during release week, our fixture advisor would balloon to have hundreds of clients to manage. 

This meant that the test now takes around 3 hours to finish! Why was this? Well two things. 

#### That Spinner

First of all, checking for the spinner extremely inefficient.

Taking a closer look at the `elementExists` function, was a wrapper around a `waitForElement`, with multiple long waits and retries. 

Like this: 

```java
static boolean elementExists(WebElement elem) {
    try {
        waitForElement(elem);
        return true;
    } catch(ExpectedElementNotFoundException) {
        return false;
    }
}

static void waitForElement(WebElement elem) throws ExpectedElementNotFoundException{
    // retry
    for(int i = 0; i < 3; i++) {
        if (driver.findElements(elem).size() != 0) {
            return
        }
        Thread.sleep(10000);
    }

    throw new ExpectedElementNotFoundException()
}
``` 

But because we were essentially negating a wait for statement, it would mean that we were waiting for a really long timeout.

#### Caching (or lack thereof)

Secondly, there was the automatic reloading that Selenium does
    
Virender Singh at ToolsQA has written a much better technical how-to writeup than I will provide here.  https://www.toolsqa.com/selenium-webdriver/cachelookup-in-pageobjectmodel/

The jist of it is that to accommodate dynamic websites, every time a WebElement is used, FindElement is triggered in order to look up the latest version of the Web Element.

This is fine for small webpages, and critical for dynamic elements that change like spinners and dynamic tables but for large webpages, it will really slow down the test.

Therefore, static elements which the webpage knows won't change should be cached using `@CacheLookup` while elements that do change between uses should be refreshed every time.


#### The Fixed version 

In the end, this version took around half an hour to run 

```java

import helpers.scrollToBottom;
import helpers.waitForElement;
import helpers.waitForElementToDisappear;

@FindBy(className="client-names")
public List<WebElement> namesList;

@CacheLookup
@FindBy(className="dollar-amount")
public List<WebElement> amountList;

@CacheLookup
@FindBy(className="total-dollar-amount")
public WebElement totalAmount;

@CacheLookup
@FindBy(className="num-clients")
public WebElement numClients;

@FindBy(className="spinner")
public WebElement spinner;

@Test
public void TestTotalSumEqualSum() {
    int clientCount = 0;
    int expectedClientCount = Integer.parseInt(numClients.getText())
    while(clientCount <= expectedClientCount) { // don't use .size()
        clientCount = namesList.size(); // Unavoidable re-indexing of the page
        scrollToBottom();
        waitForElement(spinner)
        waitForElementToDisappear(spinner)
    }

    Assert.assertEquals(expectedClientCount, clientCount);

    Double sum = 0;

    for(int i=0; i < clientCount ; i++) {  // don't use .size()
        // This is okay even though it's dynamic because 
        // we only use amountList after it's all loaded
        sum = Double.parseDouble(amountList[i].getText());
    }

    Assert.assertEquals(sum, totalAmount);
    }

```

## What I would do differently today

I've glossed over some of the other bad testing practices present, and we'll talk about them now.

As a caveat I should mention we were only maintaining that code until a the new testing framework was being developed and that's why it wasn't held up to a good standard. The people I worked with are amazing and I learned a lot at that job. In particular my mentor for that role taught me stuff I still apply to this day

Despite my best effort, caching the page was more addressing a symptom than the root cause. I went on to intern at join full time a QA team with much better automation practices. 

Here's what I've learned since then: 

### Test structure

Taking a test down from three hours to half an hour is definitely a grand feat, but no single e2e test should take that long to begin with. 

Automated testing isn't the same as functional testing and functional testing is more complicated than "does this work". While I will talk later about why this test was written this way, it was written like someone who thought like a person, and not like a computer. 

"What Do I do to make sure the site is working properly? I should make sure all the numbers add up correctly" is a very easy statement to think, but in reality this test is testing many things.

This test was testing many things, many of which I would not do in a UI test today.

UI tests are expensive in time, computing resources and with paid testing infrastructure like Saucelabs, Firebase Test Lab and Cypress dashboard, in terms of money too. That's why modern testing best practices dictate more unit tests, a good amount of integration tests, and very minimal e2e UI tests and manual testing. It's commonly called the test pyramid https://www.ministryoftesting.com/dojo/lessons/the-mobile-test-pyramid

Luckily, this test didn't commit the sin of trying to check everything in one giant long test, but there was still quite a lot. 

Today, I would break out this test into a performance or load test, a backend integration test verifying that the sum of all the clients's contracts matched the total being returned, an e2e test ensuring that the spinner and infinite scroll functionality worked as intended.

### Isolate E2E fixtures
Why did the account blow up with so many clients right before release? I'm not sure, but I'm sure it had to do with more rigorous testing during that week. All I knew was that it did and that these tests had to pass in order to release, so I did whatever I thought of to make it work.

This expanded to other tests as well. If a test relied on a client being available, I would just pick another random client and switch out the configuration values. Predictably, it often wasn't long before they stopped working again. Later on my manager told me I was wrong and that it would create flaky tests, but that was long after the other intern and I had done it for a while. Oops.

The tools our team provide to other engineers will automatically create a new user and give them a new project to test on. Afterwards, the user and project are archived accordingly.

One team I work with would spin up a whole new database and a whole new backend for every end to end test run!

As our products got bigger and more mature and integrated into Autodesk's systems this has become harder though. With more moving parts and security requirements, user activation can take a long time and it causes tests to be flaky. The new product is too heavy to spin up a new instance for every run.

It's a tradeoff. You'll have to evaluate your own situation to figure out what the best solution for you is.


## Sources 

https://www.toolsqa.com/selenium-webdriver/cachelookup-in-pageobjectmodel/

Tags: #testing #best-practices #automation