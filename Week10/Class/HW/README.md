# Week 10 Homework

I added favourites to the print shop. Clicking a star saves or removes a print, and the header shows how many are saved. I also added a favourites-only filter that works with the colour filter.

## Run

```sh
npm install
npm run dev
```

Open the local link from Vite. This project uses the prints in `src/data/prints.js`, so it does not need `npm run server`. The store resets after refreshing.

## Favourites

`favouritesSlice.js` keeps an array of print ids. `favouriteToggled(print.id)` adds the id if it is not saved and removes it if it is already there. I added this reducer to the store with `cart` and `ui`, and used selectors for the stars and header count.

## Questions

1. I put the favourites-only filter in `uiSlice` because it changes what is shown on screen. Turning the filter off should keep the saved favourites.
2. The action type is `favourites/favouriteToggled`. In DevTools, the first favourite action changed `favourites.ids` from `[]` to `['p1']`, while the cart and ui stayed the same.
3. I only store ids because the title, colour, and price are already in `PRINTS`. This keeps the catalog separate from the user's choices, and the same id list works for the stars, count, and filter.

## DevTools check

I saved Composition I and Counter Grid, added Composition I to the cart, and turned on the favourites-only filter. When I moved the history slider back to `@@INIT`, the favourites and cart were empty and the filter was off. Moving it forward to action 4 brought back both favourites, one cart item, the $40 total, and the filter.

The action type and diff are also in a comment at the top of `favouritesSlice.js`.

## Final project state

Places to Eat will need the restaurant list, form inputs and touched fields, loading and saving states, error messages, edit visibility, and area and visit filters. I will keep the list, loading errors, and filters in `App` with `useState` and pass them through props, while each form or row uses its own `useState` for its inputs, touched fields, save status, errors, and edit visibility. I don't think I need Context or Redux because this app only has one page and a few components that share data.

Run `npm run lint` and `npm run build` to check the project.

[Week 10 assignment](https://github.com/Kadee80/Dynamic_Web_Fall26/blob/main/Week10/HW.md).
