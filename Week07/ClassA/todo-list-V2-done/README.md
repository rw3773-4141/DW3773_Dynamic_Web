# Week 7 Class A: Todo List with Context

This is the Week 6 todo list refactored to use React Context. Adding, editing, deleting, and toggling done still save through `json-server`. All, Active, and Done filter the todos already loaded in memory.

## Run

In this folder, run `npm install` once. Then keep two terminals open:

```sh
npm run server
```

```sh
npm run dev
```

Open the local URL shown by Vite. The server API is at `http://localhost:3001/todos`.

## Context layout

- `src/context/todos.jsx` owns the todo list, loading/error state, and server operations. `src/hooks/use-todos-context.jsx` lets components read them.
- `src/context/filter.jsx` owns the selected filter. The filter buttons change it; `TodoList` reads it through `src/hooks/use-filter-context.jsx`.
- `App` loads todos on mount. `fetchTodos` is wrapped in `useCallback` so it remains stable in the effect dependency list.
- Each `TodoItem` still receives its own `todo` prop. Its edit form state stays local to that row.

The filter has a separate context because it is display state, while the todos context handles saved data and server requests. These providers do not read each other, so either nesting order works. Order would matter if one provider needed to consume the other's context: the provider it reads would need to wrap it.

Run `npm run build` to check the project.
