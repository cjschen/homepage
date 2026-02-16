# Cut content from selenium caching
### Mentor your interns

I remember checking the commit history, and certainly enough, that test was written by someone I knew was a previous intern. That explained why the test seemed to be written almost like a unit test. It was certainly the way I wrote tests at the beginning of that internship as well.

Most automation engineers I know started out as testers first before teaching themselves how to code. That means that they usually came in with a good testing foundation.

Waterloo interns, in my experience, are the opposite. We come in with a more developer and engineering mindset. We didn't know any better. They approached it like we were taught in CS 245. Like a Unit Test. Given input X, does Y hold true. Given this webpage, do all the sums on that table add up to the total at the top. While my mentor in that job taught me a lot about good testing practice, it took a while for that to sink in and for me to start applying it to my work. 

How was this not caught in PR? Well, when I was young, I would get really defensive over my code. I still do sometimes, and the worst thing is when you pour your heart and soul into code only to be told it's bad and needs to be completely rewritten.

"Bro, Approve my PR?" and "Don't worry, I gotchu" were commonly heard between my fellow QA intern and I and I wouldn't be surprised if this is how this code got merged in the first place. Now I know to call out areas I'm uncertain in and make sure someone familiar with that code reviews my PR before I merge.

So keep a close eye on your interns! You don't know what, brilliant or bad, they could be sneaking into your code base.

### Promote a good testing culture


I mentioned the testing pyramid earlier, but frankly i couldn't tell you about the state of unit testing in that codebase. I know one team was very proud of their 100% unit test coverage, but I only knew that because I had a friend on that team and I was interested in what they were working on so I asked to try a ticket or two. 

Usually, to add classes for automation tests, we'd file jira tickets that would take a couple days to get done, but I didn't know we could do that until halfway through the term. Things would change without warning. I wouldn't understand the features and I wouldn't understand 

There's this good RedHat podcast episode called DevOps Tear Down that Wall https://www.redhat.com/en/command-line-heroes/season-1/devops-tear-down-that-wall. It talks about how in the olden days, devs would throw their code over the wall to operations, and it was now operations's job to make . Little communication or collaboration. Developers wanted to develop as many features as possible as fast as possible with no regard to quality, which was strictly opposed to Operation's goal of stability which incentivize as little change as possible. 

While not about QA specifically, this approach is also common to QA teams and it was how we largely operated at my former company. While I ate lunch and got along fabulously with my dev coworkers, I never directly worked with them. It was like there was a tall wall looming between us.  

In my current team, we strongly believe developers should write and own end to end tests for their own features. Of course, this comes with downsides of its own. 

During crunch time, delivering features punctually is always more important than writing e2e tests, and I just went on a diatribe about how those with a development mindset can write awful tests. Yet this gets developers to care more about their quality and makes everyone responsible for the quality of the product, rather than QA being the solely accountable for it. 

We're now shifting to a more centralized QA automation model, although developers still own all their tests and write a good amount. I know another centralized QA team we're collaborating with, doesn't want to let go of their ownership of tests because QA people know how to test the best and know the overall product the best.

I think all these approaches are valid, but no matter what, we should be well past the days of throwing features and tickets over a wall.