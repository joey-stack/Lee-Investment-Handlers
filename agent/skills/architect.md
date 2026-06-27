# Skill: /architect
> Run this before writing any feature code.
> Purpose: force planning before execution. No code until the plan is approved.

---

## What This Skill Does

1. Reads the target feature from `context/progress.md`
2. Reads the system constraints from `context/architecture.md`
3. Asks you focused technical validation questions — **one at a time**
4. Once you approve the answers, outputs a written implementation plan
5. Saves the plan to `agent/current-feature-plan.md`

Only after you explicitly say "approved" or "proceed" does any code get written.

---

## Prompt to Use

```
/architect

I want to build: [feature name or description]

Read context/progress.md to confirm this is the next task.
Read context/architecture.md for constraints.
Ask me validation questions one at a time.
Once I confirm, write the plan to agent/current-feature-plan.md and wait for approval before writing code.
```

---

## Validation Questions the AI Should Ask

These are examples of what a proper architect session surfaces before coding:

- What data does this feature read, and from where?
- What data does this feature write, and to where?
- Does this require a new service module, or extend an existing one?
- Are there any third-party integrations or new dependencies needed?
- What are the edge cases and failure states?
- What does "done" look like — what is the acceptance criteria?
- Does this affect any existing component in `context/design.md`?

---

## Output Format (`agent/current-feature-plan.md`)

```md
# Feature Plan: [Feature Name]
Date: [Date]

## What We're Building
[One paragraph]

## Files to Create
- /services/[name].ts — [purpose]
- /hooks/[name].ts — [purpose]
- /components/[name].tsx — [purpose]

## Files to Modify
- [file] — [what changes and why]

## Data Flow
[Describe how data moves: user action → hook → service → DB → response → UI]

## Acceptance Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]

## Dependencies Added
- [None / package name + reason]
```
