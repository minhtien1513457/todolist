# Todo List App — Design Spec

**Date:** 2026-05-19  
**Status:** Approved

## Overview

A React web app for managing a basic todo list. Supports adding, completing, and deleting tasks. Data persists in the browser via localStorage. No backend required.

## Architecture

Custom hook + component split pattern. State and localStorage logic is isolated in a single hook; components are pure UI shells.

### File Structure

```
src/
  hooks/
    useTodos.js        # all state + localStorage logic
  components/
    TodoInput.jsx      # controlled input + add button
    TodoList.jsx       # renders list of TodoItem
    TodoItem.jsx       # single task row: checkbox + label + delete button
  App.jsx              # composes components, passes hook output as props
  index.js             # React entry point
```

### Data Shape

Stored in localStorage under the key `"todos"`:

```js
[{ id: string, text: string, completed: boolean }]
```

IDs are generated with `crypto.randomUUID()`.

## Components

### `useTodos` hook

Responsibilities:
- Load initial state from localStorage on mount
- Sync state to localStorage on every change via `useEffect`
- Expose: `todos`, `addTodo(text)`, `toggleTodo(id)`, `deleteTodo(id)`

### `App.jsx`

- Calls `useTodos()` and passes returned values as props
- Renders `<TodoInput>` and `<TodoList>` stacked vertically
- Contains no business logic

### `TodoInput.jsx`

- Controlled input with local `useState` for current text
- "Add" button and Enter key both call `addTodo(text)`, then clear the input
- Ignores empty or whitespace-only submissions

### `TodoList.jsx`

- Receives `todos`, `toggleTodo`, `deleteTodo` as props
- Maps over `todos`, renders one `<TodoItem>` per task
- Shows "No tasks yet" empty state when list is empty

### `TodoItem.jsx`

- Checkbox triggers `toggleTodo(id)` — completed tasks render with strikethrough text
- Delete button triggers `deleteTodo(id)`
- No inline editing

## Error Handling

- localStorage read is wrapped in `try/catch` — corrupted data falls back to an empty array
- localStorage write failures are silently ignored (quota exceeded is non-critical)

## Testing

- `useTodos`: tested with `renderHook` from `@testing-library/react` — cover add, toggle, delete, and localStorage persistence
- `TodoInput`: submit behavior, empty input guard
- `TodoItem`: checkbox toggle, delete button click
- No E2E tests for this scope

## Tooling

- **Scaffold:** Vite (`npm create vite@latest`)
- **Dependencies:** React only
- **Test dependencies:** `@testing-library/react`, `@testing-library/jest-dom`, `vitest`
