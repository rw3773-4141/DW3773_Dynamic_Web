# Week 10 — Redux Toolkit in class

Bauhaus Prints follows the class print-shop exercise. `Header`, `Catalog`, and `Cart` share a Redux store through the Provider in `main.jsx`.

## Run

```sh
npm install
npm run dev
```

Open the URL Vite prints. This exercise uses the imported `PRINTS` array, so it does not need `npm run server`. Refreshing the page resets the cart, favourites, and filters.

## Class steps completed

- `cartSlice`: add a print, increase or decrease its quantity, remove a row, and clear the cart.
- `uiSlice`: colour and favourites-only filters.
- `favouritesSlice`: toggle a print id in the saved ids array.
- Selectors provide the cart rows, item count, total, favourite ids, and favourite count.
- The catalog stars and header count both read from Redux. The filtered catalog is calculated when rendering.
- `configureStore` enables the browser's Redux DevTools connection by default.

The homework continuation is in the existing [HW](HW) folder. Run `npm run lint` and `npm run build` to check this class project; the class lint command excludes the separate homework project.

Based on the instructor's [Week 10 notes](https://github.com/Kadee80/Dynamic_Web_Fall26/blob/main/Week10/README.md) and [class project](https://github.com/Kadee80/Dynamic_Web_Fall26/tree/main/Week10/end-of-class/week10-redux).
