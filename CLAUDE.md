# Project: Hart Template Refactor

## Goal
Clean up code structure, improve readability, prepare for Supabase backend integration without breaking existing functionality.

## Scope (what we're doing)
- Refactor component/file organization
- Simplify logic, remove duplication
- Standardize naming conventions
- Prepare data flow points for Supabase (quote calculator form, contact forms, etc.)

## Scope (what we're NOT doing)
- No visual/design changes
- No new features yet
- No database implementation yet (structure prep only)

## Deliverables
- Clean, readable codebase
- Clear comments marking where Supabase connects
- Git commit history (atomic commits per refactor phase)

## Stack to preserve
- Current tech stack (React + TypeScript + Vite, Tailwind)
- All existing functionality
- Same deployment (Netlify for now, moving to Vercel later)

## Working relationship between chats
- This chat: high-level decisions, planning, scope changes, architecture calls
- Claude Code session (hart-template folder): actual refactor execution, file-by-file work
- If a decision changes scope, it gets logged here first, then carried into the Claude Code session
