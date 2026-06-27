# Skill: /imprint
> Run this after any UI component or layout work.
> Purpose: keep the design system registry synchronized so nothing gets duplicated.

---

## What This Skill Does

1. Reads the modified component and layout files
2. Reads `context/design.md` for the existing token and pattern definitions
3. Extracts new component structures, class patterns, and layout decisions
4. Checks for drift from the established visual language
5. Updates `context/design.md` with any new approved patterns

---

## Prompt to Use

```
/imprint

Scan the UI components modified in this session.
Check for visual drift against context/design.md.
Extract any new component patterns or layout structures.
Update context/design.md with new patterns — do not create conflicting variants.
```

---

## What to Extract

- New component names and their file paths
- Class patterns or style compositions used
- Layout decisions (grid columns, spacing values, breakpoint behavior)
- Any new design token values introduced (flag if they're undeclared)
- Animation patterns (timing, easing, trigger type)

---

## Red Flags to Surface

- A new color value not in the token system
- A spacing value hardcoded instead of using a token
- A layout pattern that duplicates an existing component
- An animation using non-standard timing

---

## Output Format (append to `context/design.md`)

```md
## Component Registry Update — [Date]

### New Components Added
| Component | File | Pattern Notes |
|-----------|------|---------------|
| [Name] | [path] | [What makes it distinct] |

### New Patterns Captured
- [Pattern description]

### Flags
- [Any undeclared token or drift from design language]
```
