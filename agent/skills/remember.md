# Skill: /remember
> Run this at the end of every coding session — without exception.
> Purpose: eliminate session amnesia. The folder remembers so the chat doesn't have to.

---

## What This Skill Does

1. Reviews everything that happened in the current session
2. Compresses it into a structured summary
3. Overwrites `agent/memory.md` with the updated state
4. States clearly what the next session should start with

This is what prevents the "start from scratch" feeling every time you open Cursor.

---

## Prompt to Use

```
/remember

This session is ending. Compress everything into agent/memory.md.

Record:
- What features or tasks were completed
- What files were created or modified
- Any architecture decisions made
- Any new dependencies added
- Any issues or bugs that are still open
- The exact next task for the next session
```

---

## Output Format (overwrites `agent/memory.md`)

```md
# Session Memory
> Updated: [DATE] — Session [N]

## Project Phase
[Current phase name and number]

## Last Completed Task
[Specific task name from progress.md — mark it as done there too]

## What Was Built This Session
- [File created/modified] — [what it does]
- [File created/modified] — [what it does]

## Architecture Decisions Made
- [Decision] — [why]

## Dependencies Added
- [package] — [reason]

## Open Issues
- [Bug or blocker] — [status]

## Next Task
[Exact next task from progress.md — be specific enough that the AI can start without asking]

## Environment State
- [x] Dependencies installed
- [ ] Auth configured
- [x] Deployment connected
```
