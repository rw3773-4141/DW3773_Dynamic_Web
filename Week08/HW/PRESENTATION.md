# Reading Queue — five-minute presentation

Use this as a Markdown slide outline. Rehearse it once aloud with a timer. Before class, run `npm run server` and `npm run dev` in separate terminals and open the app in a browser.

## 0:00–0:35 · What the app does

Reading Queue helps someone with a growing list of books decide what to read next. It keeps the list on a local server, lets the reader mark books finished, and makes the next choice easy to find.

## 0:35–1:05 · User story and new field

> As a reader with a growing list of books, I want to mark how soon I plan to read each one, so I can choose what to start next without scanning the whole list.

The new **priority** select has three useful choices: Next, Later, and Someday. The filter uses that same field to narrow the shelf.

## 1:05–1:45 · The two checklists

Show the unchanged developer checklist and revised checklist in `README.md`. Explain the gap: I expected to add the field in create, request, list, and edit, but also had to update the server collection and API examples, account for older records, and make failed saves recoverable. Week 8 added validation messages and accessible error attributes.

## 1:45–3:40 · Live demo

1. Show the empty state. Add a book with a title and choose **Later**.
2. Filter to **Later**, then edit that book to **Next**. Show that it moved to the Next filter.
3. Mark it finished. Reload the page and point out that the title, priority, and finished state survived.
4. Narrow the browser window to phone width. Show the stacked form and readable list.
5. Delete the book and return to the empty state.

If time is short, focus on add, edit, reload, and phone width; those show the core requirements.

## 3:40–4:35 · One code path

Show the priority field in `src/components/BookCreate.jsx`: `name="priority"`, `value={values.priority}`, and `onChange={handleChange}` make it controlled. Point to `src/api.js` where the POST includes `priority`. In `src/components/BookItem.jsx`, the priority appears as a badge. In `src/components/BookEdit.jsx`, the existing value loads into the select, and `src/context/books.jsx` sends it with the complete book in the PUT request. The filter in `src/components/BookList.jsx` uses the saved value.

## 4:35–5:00 · What changed in Week 8

An empty title now shows a message beside the field. If a save fails, the form keeps what the reader typed. With another week, I would add a page-progress field so someone could resume a book where they left off.
