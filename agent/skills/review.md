# Skill: /review
> Run this immediately after completing any feature.
> Purpose: catch drift, violations, and bugs before they compound.

---

## What This Skill Does

1. Reads `context/standards.md` as the benchmark
2. Reads `context/architecture.md` for boundary violations
3. Audits every file modified in the last feature
4. Outputs a severity-ranked report
5. **Does NOT change any code automatically** — presents findings and waits

---

## Prompt to Use

```
/review

Audit the files changed for [feature name].
Check against context/standards.md and context/architecture.md.
Output findings as: 🔴 Critical | 🟡 Important | 🟢 Minor
Do not change any code. Wait for my approval before fixing anything.
```

---

## What to Look For

### 🔴 Critical
- Direct database calls inside components
- Credentials or API keys hardcoded in source files
- `any` types used
- Missing `try/catch` on async functions
- Security: unvalidated user input going directly into queries

### 🟡 Important
- Business logic inside a component instead of `/services`
- Animation without cleanup (missing `tl.kill()` or equivalent)
- Missing TypeScript interface on props
- Hardcoded style values that should reference design tokens
- A new dependency added without updating `context/architecture.md`

### 🟢 Minor
- Naming inconsistency vs `context/standards.md`
- Component file over recommended line limit
- Missing JSDoc on a public function
- Console.log left in production code

---

## Output Format

```
## Review Report — [Feature Name]
Date: [Date]

### 🔴 Critical (fix before proceeding)
- [File]: [Issue description] — [How to fix]

### 🟡 Important (fix in this session)
- [File]: [Issue description] — [How to fix]

### 🟢 Minor (fix when convenient)
- [File]: [Issue description] — [How to fix]

### ✅ Passed
- [What looked good]

Awaiting your instruction to proceed with fixes.
```
