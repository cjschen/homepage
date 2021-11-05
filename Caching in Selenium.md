Please note that I'm not a spokesperson for the companies I work for and these views are my own and not do not reflect the views of my past or present employers.

# Case Study: Improving runtime of tests using @CacheLookup in Selenium

## Background
I'mma be honest. I'm not much of a blogger. I like to write, but it's mostly unpublished fiction wholly seperate from my profesional life, written first and formost for myself and maybe a friend. 

In addition to that, I never though I had much to say. 

But ~~after comming up with a website header a little too playful for a professional portfolio and therefore needing a blog~~ after some thought, I thought of the perfect thing. I'm pretty sure it's what got me my internship with PlanGrid, now part of Autodesk, in the first place actually. 

## The Scenario

Back when I was still a wee intern at my first testing job, before I knew anything about good testing practice, we had a couple of curious tests right before monthly releases. One that went from running 10 minutes per test run that would balloon to over three hours. I would take my computer home just so I could finish all the verifications on them.

One of our site pages that displayed information for a user about the clients they were managing. 

Each client was a row in a dynamically loaded table, with one column being the amount of money that contract was worth. At the top of the page, it would show the sum of all the contracts being managed.

Usually, a typical user might manage a dozen or two clients, so we had a selenium test which would scroll down to the bottom. The Selenium test was written using the Page Object Model, and we'd set up the Elements like this. 

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

```java
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

First of all, checking for the spinner extremely inefficient

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

But because, it would mean that 

The fix was easy 

#### Caching (or lack thereof)

Secondly, there was the automatic reloading that Selenium does

Virender Singh at ToolsQA has written a much better technical how-to writeup than I will provide here. 

The jist of it is that to accomodate dynamic websites, every time a WebElement is used, FindElement is triggered in order to look up the latest version of the Web Element.

This is fine for small webpages, and critical for dynamic elements that change like spinners and dynamic tables but for large webpages, it will really slow down the test.

Therefore, static elements which the webpage knows won't change should be cached using `@CacheLookup` while elements that do change between uses should be refreshed every time.


#### The Fixed version 

In the end, this version took around half an hour to run 

```java

import helpers.scrollToBottom;
import helpers.waitForElement;
import helpers.waitForElementToDissapear;

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
        waitForElementToDissapear(spinner)
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

As a caveat I should mention we were only maintaining that code until a the new testing framework was being developed and that's why it wasn't held up to a good standard. The people I worked with are amazing and I learned a lot at that job. In particualr my mentor for that role taught me stuff I still apply to this day

Despite my best effort, caching the page was more addressing a symptom than the root cause. I went on to intern at join full time a QA team with much better automation practices. 

Here's what I've learned since then: 

### The Test itself was all wrong

Taking a test down from three hours to half an hour is definitely a grand feat, but no single e2e test should take that long to begin with. 

This is also not the sort of test that I would automate using an e2e UI test. 

### Isolate E2E fixtures
Why did the account blow up with so many clients right before release? I'm not sure, but I'm sure it had to do with more rigorous testing during that week. All I knew was that.

Later on my manager told me I was wrong and that it would create flaky tests, but that was long after the other intern and I had done it for a while. Oops.

The tools our team provides to other engineers will automatically create a new user and give them a new project to test on. Afterwards, the user and project are archived accordingly. 

One company that Autodesk aquired after us would spin up a whole new database and a whole new backend for every end to end test run!

As our producs got bigger and more mature and integrated into Autodesk's systems this has become harder though. With the new system, user activation can take a long time and it causes tests to be flaky. The new product is too heavy to spin up a new instance for every run.

It's a tradeoff. You'll have to evaluate your own situation to figure out what the best solution for you is.

### Mentor your interns

I remember checking the commit history, and certainly enough, that test was written by someone I knew was a previous intern.

At the University of Waterloo, in my experience at least, testing jobs are seen as beneath developing jobs, whether they be frontend, backend or infra, but now I wouldn't want to hire an intern with that mindset and I certainly wouldn't let a new tester run amok with bad testing experience.

Most automation engineers I know started out as testers first before teaching themselves how to code. That means that they usually came in with a good testing foundation  

"Bro, Approve my PR?" and "Don't worry, I gotchu" were commonly heard between my fellow QA intern and I and I wouldn't be surprised if this is how this code got merged in the first place.

When I was young, I would get really defensive over my code. I still do sometimes, and the worst thing is when you pour your heart and soul into code only to be told it's bad and needs to be completely rewritten.

So while it sounds like I'm kinda blaming the intern, it's not the intern's fault. They didn't know any better. They approached it like we were taught in CS 245. Like a Unit Test. Given input X, does Y hold true. Given this webpage, do all the sums on that table add up to the total at the top.

### Promote a good testing culture 



In our team, we strongly believe developers should own their own end to end tests. 

## Sources 

https://www.toolsqa.com/selenium-webdriver/cachelookup-in-pageobjectmodel/

Tags: #testing #best-practices #automation