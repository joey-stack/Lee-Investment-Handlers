# Skill: /recover
> Run this the moment something breaks or the AI starts looping.
> Purpose: isolate the actual root cause. One fix at a time.

---

## What This Skill Does

1. Reads the error description you provide
2. Reads recent files modified before the break
3. Isolates ONE most-likely root cause
4. Proposes ONE targeted fix
5. Waits for your approval before touching anything

The rule: **one diagnosis, one fix, one confirmation**. No cascading changes.

---

## Prompt to Use

```
/recover

I'm seeing this error: [paste error message or describe behavior]
It started after: [what you just did / what file was last changed]

Run isolation audit. Find the single most likely root cause.
Propose ONE fix. Do not change multiple files. Wait for my approval.
```

---

## Isolation Checklist the AI Should Run

1. **Type errors** — did a recent change break an interface?
2. **Import errors** — was a file moved, renamed, or deleted?
3. **Environment errors** — is a missing `.env` variable causing a null?
4. **State loops** — is a `useEffect` dependency causing infinite re-renders?
5. **Async errors** — is a missing `await` or unhandled promise causing silent failure?
6. **Build errors** — is a new dependency incompatible with the current framework version?
7. **Path resolution** — is a `@/` alias misconfigured?

---

## Output Format

```
## Recovery Report

### Error Identified
[What the error is, in plain language]

### Root Cause (Most Likely)
[Single specific cause — file, line, function, or config]

### Proposed Fix
[Exact change to make — file path + what to change]

### Why This Fix
[One sentence explaining the reasoning]

### What NOT to Touch
[Anything the AI thinks should be left alone to avoid cascading issues]

Awaiting your approval to proceed.
```
