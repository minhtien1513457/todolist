# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (defaults to port 5173, falls back to 5174)
npm run build     # production build
npm run lint      # ESLint
npm run test -- --run          # run tests once
npm run test -- --run src/hooks/useTodos.test.js   # run a single test file
```

## Architecture

No backend. All state lives in the browser.

**State layer:** `src/hooks/useTodos.js` — single custom hook that owns the todo list state and syncs it to `localStorage` under the key `"todos"`. Data shape: `{ id: string, text: string, completed: boolean }[]`. IDs use `crypto.randomUUID()`.

**UI layer:** Three pure components in `src/components/` that receive data and callbacks as props — no internal state except `TodoInput` (controlled input text). `App.jsx` is the only place `useTodos` is called; it passes everything down.

```
useTodos()  ←→  localStorage
    ↓
  App.jsx
  ├── TodoInput   (onAdd)
  └── TodoList    (todos, onToggle, onDelete)
        └── TodoItem × N
```

**Testing:** Vitest + @testing-library/react, jsdom environment, globals enabled. `src/setupTests.js` extends jest-dom matchers. Component tests were skipped — only `useTodos` has tests.

## Docs

- Design spec: `docs/superpowers/specs/2026-05-19-todolist-design.md`
- Implementation plan: `docs/superpowers/plans/2026-05-19-todolist.md`
