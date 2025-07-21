---
title: "Week 29 - Reading summary"
datetime: 2025-07-20
tags: ["reading", "sean-goedecke", "ai", "machine-learning"]
---

This week's reading. Per usual, [Sean Goedecke](https://www.seangoedecke.com) keeps being the my favorite read on the internet.

### [What happens when engineers work more than one job](https://www.seangoedecke.com/overemployment/)

By: **Sean Goedecke**

Sean comments on the recent news about a software developer named Soham from the Bay Area who managed to get hired by multiple tech companies simultaneously without their knowledge, collecting salaries from all of them.

Sean describes why tech companies are vulnerable to this:

- **Remote work**
- **Onboarding time** - In tech, we usually expect onboarding to take some time. Depending on the organization it can take weeks to months before a new engineer is expected to perform.
  - **Reflection:** On top of this, it also takes additional time until the manager discovers, accepts the truth, is brave enough to share, and take action.
- **Interviewing is a skill** - If you focus a lot of time on interviewing, you **will** get good at it. It doesn't necessarily translate to coding, but it will get you through the door.
- **Competitive salary expectation** - Since you're going to get salaries from multiple places, you can afford to lower them. This makes you attractive as a hire.

**Quote from the article:**

> The second reason is a bit subtle. Particularly for more senior engineers, when a company employs you, they're not just renting the time you spend sitting down and typing code. **They're renting the ambient processing you're doing for the rest of the workday**. Or even the ambient processing you're doing in the shower, or while you sleep, and so on. I have worked with very effective engineers who only spent an hour or two a day actively "working". But they were so effective because they spent the rest of the day thinking. When they sat down to work, they had hours and hours of background processing helping them make the right decisions and come up with useful new ideas.

I hadn't thought about it this way before. Quite a lot of the heavy thinking I do (architecture, problem solving) for my job is done **away** from the keyboard, and even outside of working hours. For example while walking or brushing my teeth. My work occupies my headspace.

> If you’re working multiple jobs, you’re cheating your employers out of that ambient processing time. You can’t usefully reflect on three jobs’ worth of problems simultaneously. You might still be able to do some good work, if you’re a strong engineer. But you won’t be able to do great work.

### [The three great virtues of an AI-assisted programmer](https://www.seangoedecke.com/llm-user-virtues/)

By: Sean Goedecke

Sean goes through Larry Wall's three virtues of a great programmer: laziness, impatience and hubris, and gives his own take on what they might be replaced with in the time of AI coding.

First he notes that AI coding is very enticing for people with these virtues:

> Laziness, impatience and hubris are some of the strongest reasons to try and use agentic AI tools for programming (like Cursor, Copilot Agent, or Cline). Laziness and impatience are obvious: I can’t be bothered to sit down and write this myself, so I’ll throw it at the LLM.

Unfortunately, these original virtues also make it easy to OVERUSE the new tools. Sean instead suggests three new virtues to strive for:

- **Obsession to keep your own mind working at the problem**
  - Instead of task switching and letting the agent run on its own, keep working on the problem
- **Impatience to eject and work it out yourself**
  - Be ready and eager to jump in and take over at the right time
- **Suspicion of what the AI is doing**
  - Double and triple check what the tool is doing

My take: Whatever the new virtues should be, I think this is an important point to make: **What made a great engineer in the past will not necessarily make a great engineer in a world where AI coding tools are prevalent**. I worry about this quite a lot personally. Can a person with the old virtues transition to the new virtues, or will they (we) just be completely replaced by another type of person?

### Other

- [Titanic Data Science Solutions](https://www.kaggle.com/code/startupsci/titanic-data-science-solutions) - An excellent overview of the Titanic data set on Kaggle, and how to analyze, clean, and create new features from it.
  - **Note:** In my attempts at making predictions from the dataset, parsing titles and performing age imputation actually made the result worse 🤷‍♂️ You can find my notebook here: [magnuswahlstrand/kaggle/titanic-machine-learning-from-disaster](https://github.com/magnuswahlstrand/kaggle/tree/main/titanic-machine-learning-from-disaster)
