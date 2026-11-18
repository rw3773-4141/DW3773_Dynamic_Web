# Week 11 Class B

I continued the art collection app with search, the total value, and a count of the visible pieces. Typing an artist or title in the add form also highlights possible duplicates in the list.

## State and selectors

The form slice listens to `addArt` with `extraReducers`, so adding a piece and clearing the form happen from one action. Search only changes the search term. The visible list, count, total, and duplicate highlight are calculated from the existing state.

`selectVisibleCount` and `selectTotalValue` both use `selectVisibleArt`, so the numbers match the pieces on screen. Components import the actions and selectors through `src/store/index.js`.

## Run

```sh
npm install
npm run dev
```

Open the local link from Vite. Refreshing resets the collection. This project does not need `npm run server`.

Run `npm run lint` and `npm run build` to check it.

[Class B notes](https://github.com/Kadee80/Dynamic_Web_Fall26/blob/main/Week11/ClassB.md).
