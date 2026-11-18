# Week 11 Homework

This version adds price sorting and a way to clear the collection. The bottom bar shows the number and total value of the pieces that match the search.

## Sorting

I keep the selected sort order in the art slice because it is a choice the app needs to remember. The sorted array is calculated from the visible pieces, so I do not store a second copy of the collection. Sorting uses a copy of the array to keep the original data unchanged.

## Clearing the collection

I chose the `clearCollection` option and added it with `createSlice`. Clicking Clear collection opens a confirmation before anything is deleted. The confirmation uses local `useState` in `CollectionActions` because only that component needs to know whether it is open.

## Run

```sh
npm install
npm run dev
```

Open the local link from Vite. This project does not need `npm run server`, and refreshing resets the collection.

Run `npm run lint` and `npm run build` to check it.

## Checks

- Added three pieces and saw one `art/addArt` action for each submission. Its diff showed the new piece and the form resetting together.
- Typed one letter into the form. The diff only changed `form.name`.
- Searched for `MON`. The search term changed, the original data stayed the same, and the bar showed 2 pieces, $750.
- Checked the price sort without changing the original array.
- Cancelled the clear confirmation and kept the collection, then confirmed it and got 0 pieces, $0.
- [ ] Finish the history-slider check in Redux DevTools by moving back to the beginning and forward again.

A separate render check restored the initial and populated Redux states in both directions. The empty list, price order, count, and total rendered correctly.

[Assignment](https://github.com/Kadee80/Dynamic_Web_Fall26/blob/main/Week11/HW.md) and [Redux Toolkit createSlice docs](https://redux-toolkit.js.org/api/createSlice).
