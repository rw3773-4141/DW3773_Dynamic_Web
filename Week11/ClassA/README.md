# Week 11 Class A

This is the first part of the art collection app. I can add a piece with a name and price, then delete it from the list.

## Store plan

The form slice keeps the name and price being typed. The art slice keeps the collection and search term. The total and filtered list can be calculated from those values, so they do not need their own state.

The form reads its values from Redux and sends them together in `addArt({name, price})`. Each slice only changes its own part of the store.

## Run

```sh
npm install
npm run dev
```

Open the local link from Vite. This version stops where Class A ended: search and total are completed in Class B, and the form keeps its input after adding a piece. The collection resets on refresh and does not need `npm run server`.

Run `npm run lint` and `npm run build` to check it.

[Class A notes](https://github.com/Kadee80/Dynamic_Web_Fall26/blob/main/Week11/ClassA.md).
