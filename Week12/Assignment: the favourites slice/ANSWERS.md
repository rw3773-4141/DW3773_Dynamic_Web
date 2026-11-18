# Favourites slice answers

## 1. What is the action type, and where do its two halves come from?

The toggle action has the type `favourites/favouriteToggled`. The first half comes from the slice name, `favourites`, and the second comes from the reducer name, `favouriteToggled`.

## 2. Why keep a list of ids instead of a flag on each print?

`prints.js` is a static catalogue outside the store, so the store only needs to own my saved choices as a list of ids. To put a changing `favourite` flag on each print, I would first need to move the catalogue into state or keep a separate changing copy of it. The store would then be responsible for the print data too, including keeping that copy up to date when the catalogue changes.

## 3. What happens if a saved print is removed from the catalogue?

I saved Counter Grid (`p2`), removed its entry from `prints.js`, and rendered the app with the same store: the card disappeared, favourites only showed the empty message, and the app still rendered. The favourites count stayed at 1 because `p2` was still in the saved ids, and the count selector reads that array rather than the catalogue. A real app should check saved ids against the current catalogue and remove ids for prints that no longer exist.

## Optional part

I added Clear favourites. It empties the ids array, including saved ids that are no longer in the catalogue, and leaves the cart alone.

## Checks

`npm run lint` and `npm run build` passed. I also checked the toggle sequence (`p1`, `p2`, then `p1` again), cart isolation, the count selector, both filters together, and clearing favourites with a rendered component check; I restored Counter Grid after the removal experiment.

The local preview loaded in Chrome. Reading the action in Redux DevTools and moving its history slider are still pending because browser access was blocked when Chrome switched to another window; the action type above was checked from the action creator.
