# Week 10 Class

This is the Bauhaus Prints shop from class. I used Redux to share the cart and favourites between the catalog, header, and cart components.

## Run

```sh
npm install
npm run dev
```

Open the local link from Vite. The prints come from `src/data/prints.js`, so this project does not need `npm run server`. Refreshing the page resets the cart, favourites, and filters.

## Redux state

- `cartSlice` keeps the items and quantities. I can add prints, change the quantity, remove an item, or clear the cart.
- `uiSlice` keeps the colour filter and the favourites-only filter.
- `favouritesSlice` keeps the saved print ids.

The header uses selectors to get the cart count, total price, and favourite count. The stars also read from the store, so they stay in sync with the count and filter.

The homework version is in [HW](HW). Run `npm run lint` and `npm run build` to check this project.

Based on the [class notes](https://github.com/Kadee80/Dynamic_Web_Fall26/blob/main/Week10/README.md) and [class code](https://github.com/Kadee80/Dynamic_Web_Fall26/tree/main/Week10/end-of-class/week10-redux).
