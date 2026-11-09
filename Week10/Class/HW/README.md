# Week 10 homework — Bauhaus Prints

This continues the Redux class exercise. Each catalog card has a favourite star, the header shows the saved count, and the favourites-only filter works together with the colour filter.

## Run

```sh
npm install
npm run dev
```

Open the URL Vite prints. No separate server is needed: the print catalog is imported from `src/data/prints.js`. The store resets when the page refreshes. Use `npm run lint` and `npm run build` to check the project.

## Favourites slice

`src/features/favouritesSlice.js` owns `ids`, an array of print ids. `favouriteToggled(print.id)` adds an id once or removes it if it is already saved. The reducer is registered as the third branch of the store, alongside `cart` and `ui`.

The star uses `selectFavouriteIds` and the header uses `selectFavouriteCount`. Neither component keeps a separate local favourite value.

**Which slice owns “show only favourites”?** It belongs in `uiSlice` because it controls which cards are visible. Turning the filter off should not remove the saved favourites.

**What is the action type?** `favourites/favouriteToggled`. In Redux DevTools, the first favourite action added `p1` at index 0 of `favourites.ids`, changing `[]` to `['p1']`. The cart and ui branches did not change, and the comment at the top of the slice records this diff.

**Why store ids?** Favourites describe the user's saved choices, while `PRINTS` describes the catalog. Storing ids keeps the catalog data in one place and lets the same saved list drive the stars, count, and filter without copying each print or adding a user-specific flag to it.

## Watch it in Redux DevTools

`configureStore` provides the DevTools connection. With the Redux DevTools browser extension available:

1. Open the app's Redux tab and click the star on Composition I.
2. Select `favourites/favouriteToggled` and inspect the diff: `favourites.ids` gains `p1`.
3. Save another print, add something to the cart, and change a filter.
4. Move the history slider back to the initial state, then forward again. The stars, header count, filters, and cart should follow that selected state.

Checked in Chrome Redux DevTools: I saved Composition I and Counter Grid, added Composition I to the cart, and turned on the favourites-only filter. Moving the history slider back to `@@INIT (0)` restored zero favourites, an empty cart, and the unchecked filter. Moving it forward to action 4 restored both filled stars, a favourite count of 2, one cart item totaling $40, and the checked filter.

## Final project state plan — Places to Eat

My final project will have the restaurant list, create and edit fields, touched fields, saving/loading/error states, edit visibility, and area and visit-status filters. I will use `useState` inside each form or row for its inputs, touched fields, saving messages, and edit visibility, and keep the restaurant list, loading/error states, and filters in `App` with `useState` and pass the values and handlers through props. I do not need Context or Redux for this one-screen version because only a few nearby components share the data.

Assignment: [Week 10 homework](https://github.com/Kadee80/Dynamic_Web_Fall26/blob/main/Week10/HW.md).
