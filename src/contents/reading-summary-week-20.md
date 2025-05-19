---
title: "Week 20 - Reading summary"
datetime: 2025-05-19
tags: ["reading", "productivity"]
---

I usually read a few articles in the evening while waiting for my son to fall asleep. Here is (part of) the things I've read about this week.

### [**Why You Should Write Weekly 15-5s**](https://eugeneyan.com/writing/15-5/)

By: **Eugene Yan**

On the value of spending 15 minutes or less per week to write a summary of the main things accomplished during the week, current blockers, and and key tasks for next week. The text should be short enough for someone to read in 5 minutes. The goal is to provide insight of you work to your direct manager (or your team, or other stakeholders) and build trust.

**Reflection:** I like the 15-5 format, and have done similar things in the past. Usually as a newsletter for my team. At my current job we have a system of DAILY reports, I think that is a bit much, and it feels more like a chore rather than a help.

### [**Erik Bernhardsson - Former CTO @ Better.com**](https://applyingml.com/mentors/erik-bernhardsson/)

By: **Eugene Yan**

Erik is the former CTO of [Better.com](Better.com) and form BI and ML engineer at Spotify. The most interesting part of this article was reading about his experience with being an engineer at Spotify and being part of the initial initial recommendation system (RecSys 😉) there. This interview by Eugene Yan is part of a series of [mentor interviews](https://applyingml.com/mentors/) that (I believe) ask the same questions to a several senior, mainly ML and Data, engineers. A few interesting quotes that stood out from this interview:

**On biggest regret of his career:**

> ... looking back has been times when I built prototypes of things but didn’t really educate the organization on the capabilities. In particular the Spotify music recommendation system could have been used in production 2-3 years earlier if I had spent 5% less time tweaking ML algorithms and used that time towards building internal demos/prototypes to get people excited about my work.

**On how to tackle new problems with ML:**

> **Imagine you're given a new, unfamiliar problem to solve with machine learning. How would you approach it?**

> The skeptic in me would scream: if it’s unfamiliar, how do you even know that ML is the right solution? I would look at the problem with zero bias towards ML and I think that’s super important to do.

### [**How Core Git Developers Configure Git**](https://blog.gitbutler.com/how-git-core-devs-configure-git)

By: **Scott Chacon**

Summarises the output of of an event called "Spring Cleaning" where Git core team members where challenged to remove their own git configuration and see how the defaults work. The result is a short list of commands that the Git core team developers think are most important to change from git's own defaults.

**Reflection:** I really like this kind of posts. TDLR at the top if you are lazy, but technical and information dense for the connoisseur. Never heard of Scott before, but this is a great read. I spend a considerable amount of time improving my own dev setup (too much?), but sometimes I need a reminder that there are even more things to weak 🤔. Here are some of the recommendations that I have already applied:

- `git config --global branch.sort -committerdate` - Sort branches by most recent commit date. I already had an alias for this, but it was 200 characters of git and awk intermingled 😵‍💫
- `git config --global diff.algorithm histogram` - Use the improved _histogram_ over the defaul _myers_ algorithm for diffing. Much better at grouping changes in a way that makes sense to a human it seems.
- `git config --global help.autocorrect prompt` - Prompt for auto correct of incorrectly typed git commands.
- `git config --global push.autoSetupRemote true` - Automatically create upstream branch if missing, and avoid the classic error: `fatal: The current branch BRANCH has no upstream branch.`
