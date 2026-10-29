# Reading Queue

## Elevator pitch

Reading Queue is a small app for people who keep a list of books they want to read. It shows which book they plan to pick up next, and lets them mark books finished.

## User story

As a reader with a growing list of books, I want to mark how soon I plan to read each one, so I can choose what to start next without scanning the whole list.

The new field is a **priority** select: Next, Later, or Someday.

## Developer checklist — written before implementation

- [x] Copy the working server-backed list into the Week 7 homework folder and rename the visible app for books.
- [x] Add a controlled priority select to the create form with a sensible default.
- [x] Include priority in the POST body and keep `done: false` for new books.
- [x] Show each book's priority in the list and handle records without the field.
- [x] Add the controlled priority select to the edit form, prefilled from the book.
- [x] Include priority in the PUT request while preserving the book's other fields.
- [x] Add a local filter by priority so the field helps choose a book.
- [x] Keep create, read, update, delete, and finished state working after refresh.
- [x] Make loading, empty, and error states useful, and check the layout at phone width.
- [x] Verify with a production build and a browser check.

## Revised checklist

These are the steps the work actually took:

- [x] Copy the Week 7 context app, then rename its components, hook, context, UI text, and API functions for books.
- [x] Change the server collection to `books` and start with an empty `db.json`.
- [x] Make both title and priority controlled in `BookCreate` and `BookEdit`.
- [x] Send priority with POST; send the complete book, including `done`, with PUT.
- [x] Show a priority badge on each row. Treat an older record with no priority as Later.
- [x] Keep the finished checkbox working through PATCH and the full create/read/edit/delete workflow through the server.
- [x] Filter the loaded books by priority without another request.
- [x] Clear the create form only after a successful POST, and keep an edit open after a failed PUT.
- [x] Add useful loading, empty, and error states, including a retry button.
- [x] Update the API examples, package name, and lockfile; style the app for desktop and phone widths.
- [x] Test create, filter, edit, finish, refresh, and delete against a temporary server database. Run the production build.

**What I missed initially:** renaming the API route and database collection also meant updating `api.http` and the package metadata. The first checklist also missed preserving form values after a failed save and adding a retry path for a failed load. I had anticipated the older-record fallback and full PUT body, which were easy to overlook in the original todo app.

## Run it

From this folder, install packages once with `npm install`. Keep two terminals open:

```sh
npm run server
```

```sh
npm run dev
```

Open the local URL printed by Vite. `db.json` holds your books, so edits survive refresh. Run `npm run build` to check the project.

## State and components

I kept Context for the books because the create form and list rows all need the same saved data and server operations. The priority filter lives in `App` and passes directly to the filter buttons and list as props; it only changes what is shown on this screen. A row still receives its own book as a prop, and its edit form state stays local to that row.

## Another week

I would add a page-progress field so I could return to a book after starting it, then sort unfinished books by priority.
