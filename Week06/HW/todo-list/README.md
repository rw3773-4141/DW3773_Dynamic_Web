# Week 06 Homework: Persistent Todo List

This continues the Class B todo list. The list is stored in `db.json` by `json-server`, so adding, editing, deleting, and checking off a todo survive a refresh. The All, Active, and Done buttons filter the todos already loaded in React state.

## Run it

From this folder, install dependencies once:

```sh
npm install
```

Keep two terminals open:

```sh
npm run server
```

```sh
npm run dev
```

Open the local URL printed by Vite. The API runs at `http://localhost:3001/todos`. Start the server before using the page.

## How it works

- `src/api.js` holds the Axios requests: GET, POST, PUT, DELETE, and PATCH.
- `src/App.jsx` loads the saved list on mount and updates React state only after each request succeeds.
- Editing sends the whole todo with PUT. Checking the `done` box changes only that field with PATCH.
- Filtering is done in `App.jsx` with `filter()` and makes no new API request.
- If the API cannot be reached, the page shows an error. A failed add or edit keeps the typed title for another attempt.

Run `npm run lint` and `npm run build` to check the project.
