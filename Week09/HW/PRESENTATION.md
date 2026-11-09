# Places to Eat — five-minute presentation outline

1. **Pitch:** I save restaurant recommendations around New York City and forget which places are nearby. Places to Eat keeps them in one list, filters them by area, and lets me mark the places I visited.
2. **User story:** As someone who saves restaurant recommendations around New York City, I want to record each restaurant's area, so that I can spot a place to try when I am in that part of the city. The area select comes from that need.
3. **Original plan:** Show the developer checklist in `README.md`. It covers the create field, API, list, edit field, persistence, and mobile styling.
4. **What changed:** Show the revised checklist. I also had to change the API route and database collection, handle older rows with no area, keep the full area in PUT, and add validation and retry messages. The original checklist missed those details.
5. **Live demo:** Start `npm run server` and `npm run dev`. Add a place, filter by area, edit its area, mark it visited, refresh, and delete it. Submit an empty form to show the field messages. Resize the browser to phone width.
6. **Code walkthrough:** `RestaurantCreate` controls the area select; `createRestaurant` in `api.js` POSTs it. `RestaurantItem` displays it or “Area not set.” `RestaurantEdit` controls the saved value, and `App` sends the entire restaurant through PUT. `db.json` stores the resulting record.
