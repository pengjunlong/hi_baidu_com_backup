---
title: 十个有效代码审查的建议
date: 2019-11-06 20:04:06
description: 代码审查很重要，这里给出一些建议
categories: 软件开发
tags: [代码质量,最佳实践,建议] 
toc: 
feature: 
---

> https://www.evoketechnologies.com/blog/simple-effective-code-review-tips/

### 目标
在软件开发中，代码审查可以确保代码符合业务功能需求，帮助开发者遵循最佳实践，另外，代码审查环节也帮助提高了软件质量。

### 具体建议
根据我的经验，这里想分享10个简单的代码审查建议，用来帮助代码审查者和软件开发者进行代码审查。

<!--more-->

1. Highlight issues in the code
Never force software developers to change the code written by them. It may hurt their ego and they may repeat the same mistake if they do not understand the reason behind code change recommendation. Highlight the issues in the existing code and its consequences.
Here’s an interesting quote on this point: “If an egg is broken by outside force, life ends. If broken by inside force, life begins. Great things always begin from inside.” – Jim Kwik, Learning Expert.

2. Explain relevant principles
If software developers hesitate to accept given suggestions/recommendations, then explain them relevant principles such as Separation of Concerns, SRS (Single Responsibility Principle), Open-Closed principle, Cyclomatic complexity. If necessary, discuss with them the Non Functional Requirements (NFR) such as Maintainability, Extensibility, Testability and Reliability.

3. Discuss relevant quotes
To make the code review process more interesting and engrossing, remind developers relevant quotes/proverbs:
“Any stupid can write the program that computer understands but only good programmers write code that humans understand” – Martin Fowler
“Measuring programming progress by lines of code is like measuring aircraft building progress by weight.” – Bill Gates
“Fat model and thin controller”, “High cohesion and Low coupling”
“When debugging, novices insert corrective code; experts remove defective code.” – Richard Pattis

4. Do few things offline
Instead of explaining the entire solution to developers during the code review process, simply share the links of relevant websites or encourage them to research on the internet by providing keywords. This action would certainly save the code reviewer’s time and energy. And of course, developers would also like it, since they too need some time to assimilate the proposed solution. 
Instead of always sitting next to a developer during the code review process, code reviewers should obtain the code from the source control or shared path, so that it saves developers time. And this would also give code reviewers ample time to recommend the best solution in the context.

5. Consider as an Opportunity to learn best practices
Sometimes software developers may take the code reviewer’s comments personally and defend the code without a valid reason. It then becomes the responsibility of a code reviewer to inform the developer to consider this exercise as an opportunity to learn/discuss best practices, but not to identify issues to criticize. Ideally, code reviewers should inform the managers that code review comments should not be used to assess a software developer’s skills. Code review should always be done in a competitive spirit to find more useful comments.

6. Always be patient and relook if required
Sometimes, developers do not accept suggestions/recommendation and keep debating. A code reviewer many not know the exact context and challenges, when the code was written. A code reviewer should understand all the points being made by the developer without losing patience. Furthermore, to make the point crystal clear, a code reviewer can explain the points on a paper or on a whiteboard by comparing the developer’s approach vs code reviewer’s approach. Every approach has its pros and cons, need to choose the right approach, whichever weighs more after careful evaluation.
Many times, a third approach evolves which is acceptable to both the developer and the code reviewer. If both of them do not come to a conclusion, then stop the discussion by saying “Let’s discuss this tomorrow, after doing some more analysis”. If the same issue is re-looked on another day with a fresh mindset, it is quite likely that a new approach evolves. Always remember that “No problem can be solved from the same level of consciousness that created it.” – Albert Einstein

7. Explain the need for best coding practices
Generally, software developers mention that best coding practices are not followed due to tight project schedules. Developers may feel that it is an acceptable practice. However, code reviewers should educate software developers that as the code size increases or after sometime, the application becomes very difficult to maintain. Moreover, if a client verifies the code then poor quality code may give wrong impression on the team’s/organization’s quality standards. It may also impact awarding new projects or referring an organization to prospective clients.
If the project schedules are too tight then code reviewers should suggest developers to perform code refactoring while fixing a defect/adding an enhancement or in next version. While refactoring the code, some functionality may break accidently. Code reviewers should convince the project managers by explaining the importance of code refactoring and the need for allocating additional time to plan this activity.

8. Consult second level code reviewer (if not convinced)
If a code reviewer recommends few suggestions, but the developer hesitates to accept these, then discuss it out with the developer. It is quite possible that the code reviewer may not know the entire context. If the developer is still not convinced with the recommendations of the code reviewer, it is perfectly all right to consult a second level code reviewer. However, the developer should ensure that second code reviewer’s suggestions are forwarded to the first code reviewer to ensure that everyone is on the same page.

9. Capture the enhancements and technical debt
It is quite likely that some code review suggestions cannot be implemented during current release. However, a code reviewer should ensure that all accepted recommendations are clearly documented in a shared code review document, so that these are implemented at an appropriate time in future. Additionally, code reviewer should identify and capture all the enhancements from technology and business perspective. Once the project is completed, all captured enhancements can be considered for implementation, instead of searching at that moment. Finding enhancements during code reviews is more efficient than finding separately at the end of the project.

10. Document all code review comments
Document all code review comments in an email, word document, excel, or any standard tool used by the organization. Making a mistake for the first time is acceptable, but it is not a good sign to repeat the same mistake. The code review document helps software developers to cross check the highlighted issues and avoid making similar mistakes in future. Additionally, maintaining a code review document is a mandatory part of the Capability Maturity Model Integration (CMMI) level process.

### 小结

The above code review tips would help code reviewers and developers to perform effective code reviews. The code review process should always be pursued in a constructive way by all stakeholders to gain maximum benefit.

The code review process not only improves the software quality but also helps software developers to enhance their skills continuously. Hence, organizations/project managers must ensure that code reviews are made integral part of software development lifecycle.
