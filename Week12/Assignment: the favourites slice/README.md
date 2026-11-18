# Assignment: the favourites slice

I used my Week 10 print shop for this assignment. Each card has a favourite button next to Add, and the header shows the number of saved prints.

The colour and favourites-only filters work together. Selecting blue with favourites only shows saved blue prints. I kept that view setting in `uiSlice` and the saved ids in `favouritesSlice`.

## Run

```sh
npm install
npm run dev
```

Open the local link from Vite. This project does not need `npm run server`. The cart, favourites, and filters reset on refresh.

Run `npm run lint` and `npm run build` to check it.

`vite.mjs` supports the colon in this folder name by running Vite through a temporary link. Keep the folder name as it is.

## Answers

[ANSWERS.md](ANSWERS.md) has my three answers and the optional part I tried. The filter decisions are in the comment at the top of `src/components/Catalog.jsx`.

[Assignment instructions](https://github.com/Kadee80/Dynamic_Web_Fall26/blob/main/Week10/ASSIGNMENT-favourites.md).
