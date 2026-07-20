# AGENT.md

# Chronicle（《佣书》）AI Development Guide

Version: 1.0

---

# 1. Project Overview

## Project Name

佣书（Chronicle）

## Project Goal

This project is **not intended to become a complete commercial game**.

The current objective is to create **one highly polished playable chapter** that can serve as a portfolio project for game development and AI-related job applications.

Quality is always more important than quantity.

Do not suggest adding more chapters unless requested.

Do not optimize for scalability before the first chapter reaches production quality.

---

# 2. What This Game Is

Chronicle is an interactive historical narrative game.

The player experiences history through work instead of exposition.

The player is a young copyist (佣书) working inside a bookstore in early Qing dynasty Lingnan.

The player has no grand mission.

The player simply wants to finish today's work and earn today's wage.

History slowly reveals itself during ordinary work.

Every feature added to the game should strengthen this feeling.

---

# 3. Current Development Scope

Current milestone:

Complete Chapter One only.

Everything should serve Chapter One.

Do not design later chapters.

Do not build systems that are not used in Chapter One.

Do not create premature abstractions.

If something only appears in Chapter Five, do not implement it now.

---

# 4. Core Design Philosophy

The player should feel like they are handling historical documents.

The player should never feel like they are clicking through dialogue.

Reading is only one part of gameplay.

Interaction is equally important.

Every story advancement should happen because the player performed an action.

Examples:

Sorting papers

Comparing handwriting

Matching torn pages

Opening manuscripts

Finding inconsistencies

Organizing archives

Instead of:

Next

Next

Next

Next

Dialogue should never become the primary gameplay loop.

---

# 5. Chapter One Design Goal

Chapter One has one responsibility:

Introduce the player's identity.

Introduce the bookstore.

Teach the core gameplay.

End with a mystery.

Nothing more.

The player should finish Chapter One with exactly three questions:

Who wrote the strange manuscript?

Why did the bookstore owner react so strongly?

Who is searching for these documents?

Do not answer these questions inside Chapter One.

---

# 6. Gameplay Loop

Every chapter should follow the same structure.

Receive today's work.

↓

Perform actual work.

↓

Discover something unusual.

↓

Investigate.

↓

Obtain new historical material.

↓

Return to bookstore.

↓

Story progresses.

The work itself is gameplay.

The story grows naturally from work.

---

# 7. Chapter One Gameplay

Current gameplay should focus on manuscript organization.

The player sorts different documents into categories.

Possible categories:

- 家书
- 契约
- 佛经
- 地方志
- 诗稿
- 账本
- 杂纸

Most documents belong somewhere.

One document belongs nowhere.

That document begins the story.

Sorting is not a mini-game.

Sorting is the player's profession.

Treat it seriously.

---

# 8. Narrative Principles

Never explain history before players become curious.

Never dump background information.

History should emerge from:

Objects

Dialogue

Environment

Documents

Player observation

Every NPC sincerely believes what they say.

Avoid obvious villains.

Avoid conspiracy storytelling.

Avoid absolute historical truth.

The theme is historical memory.

Not historical certainty.

---

# 9. UI Philosophy

The interface should disappear.

The manuscript should become the focus.

Avoid obvious game UI.

Avoid modern mobile design.

Avoid colorful cards.

Avoid large floating buttons.

Avoid excessive shadows.

Avoid flashy transitions.

Players should feel they are reading inside an old bookstore.

Not inside an app.

---

# 10. Visual Language

Keywords:

Quiet

Restrained

Paper

Ink

Wood

Warm light

Breathing

Silence

References:

Ancient Chinese manuscripts

Woodblock printing

Museum archive interfaces

Historical document restoration

Avoid:

Cyberpunk

Glassmorphism

Material Design

Game HUD

Modern visual novel UI

---

# 11. Animation Principles

Animation should almost disappear.

Slow.

Natural.

Subtle.

Paper moves.

Ink fades.

Light changes.

No bounce.

No spring.

No zoom.

No swipe.

No exaggerated easing.

If players notice the animation,

it is probably too strong.

---

# 12. Coding Principles

Keep components small.

Keep components reusable.

Do not introduce unnecessary dependencies.

Prefer native browser APIs when possible.

Story content belongs inside JSON files.

Never hardcode story inside React components.

Do not rewrite architecture unless requested.

---

# 13. Before Every Task

Before making changes:

Read AGENT.md.

Understand current goal.

Explain your implementation plan.

Wait if the requested scope is unclear.

Do not start rewriting unrelated systems.

---

# 14. After Every Task

Always report:

Files modified

Reason for modification

Possible side effects

Things that should be tested manually

Never claim something works unless verified.

---

# 15. Priority Order

When making decisions, always follow this priority.

1. Preserve the identity of Chronicle.

2. Improve gameplay.

3. Improve narrative pacing.

4. Improve readability.

5. Improve visual polish.

6. Improve architecture.

Beautiful code is less important than a better player experience.

---

# 16. Definition of Success

A player finishes Chapter One.

They understand they are a copyist.

They enjoy organizing historical documents.

They become curious about the mysterious manuscript.

They immediately want to begin Chapter Two.

If these goals are achieved,

Chapter One is successful.

Everything else is secondary.