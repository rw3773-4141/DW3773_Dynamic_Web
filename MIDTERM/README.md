# Places to Eat

Places to Eat is a one-screen restaurant checklist for people who save recommendations around New York City. I can add a restaurant, choose its area, find it later with the area filter, and mark it visited after I go. This is useful when I am in one part of the city and want to remember the places I saved nearby.

## Elevator pitch

I save restaurant recommendations in different places and forget where they are. Places to Eat keeps them together, shows each place's area, and lets me check off places after I go.

## User story

As someone who saves restaurant recommendations around New York City, I want to record each restaurant's area, so that I can spot a place to try when I am in that part of the city.

The new field is an **area** select with five NYC areas as choices. A restaurant starts as "To try," and checking it marks it as visited. The area filter uses the saved choice to narrow the list.

The area select is controlled by React state in both the add and edit forms. The code stores the choice as `area`, matching the label in the interface. It is sent to json-server when I add or edit a restaurant, shown on its card, and still appears after a refresh. Older records without an area show "Area not set" instead of breaking the page.

## Developer checklist — written before implementation

- [ ] Copy my Week 06 server-backed todo app into this project, without generated files or dependencies.
- [ ] Rename the app's visible language from todos to restaurants and choose a clear title.
- [ ] Add a controlled area select to the create form, with a clear label and required choice.
- [ ] Send the selected area with the POST request to json-server.
- [ ] Show the area on every restaurant card, including a fallback for old records with no area.
- [ ] Add a controlled area select to the edit form, filled with the saved value.
- [ ] Include the area in the full PUT body when editing while preserving the visited state.
- [ ] Keep create, read, update, delete, and visited toggling working after a refresh.
- [ ] Filter restaurants by area using the already loaded data.
- [ ] Give loading, empty, and error states useful restaurant-specific text.
- [ ] Style the page deliberately and check it at phone width.
- [ ] Run lint and build, then test create, read, update, and delete against a temporary server database.

## Revised checklist

These are the steps I actually took:

- [x] Copied my Week 06 homework todo app into this folder without its built files or dependencies.
- [x] Renamed the components and text from todos to restaurants.
- [x] Changed the API route to /restaurants and started a new, empty restaurants collection in db.json.
- [x] Added a controlled area select to both the create and edit forms.
- [x] Added the area to the POST body and to the full record sent by PUT.
- [x] Kept the existing visited value during edits; used PATCH for the visited checkbox.
- [x] Showed the area on each card. An older record without it says "Area not set."
- [x] Added an area filter and kept the original visit-status filtering in React state.
- [x] Kept the form values after a failed save so the user can try again.
- [x] Reworded the loading, empty, no-results, and error states for restaurants.
- [x] Updated the page title and package name and made a mobile layout with CSS.
- [x] Ran lint and build; tested adding, editing the area, visiting, refreshing, and deleting a disposable restaurant entry. Checked the layout at phone and desktop widths.
- [x] Later changed the visible name to Places to Eat, used Area throughout the interface, and removed the extra decoration.
- [x] Checked the final code against the Week 06 and 07 class examples. Removed unused Tailwind setup and advanced CSS layout functions, and changed json-server to the version used in class.
- [x] Added a softly blurred New York skyline PNG as the background. The image contains the blur, so the page does not need a CSS blur effect.

**What changed between the lists:** My first plan covered the area field in the add form, server requests, list, and edit form. I had not written down every place the change would reach: the API route, the collection in `db.json`, the package name, and the browser title. I also added a retry-friendly form when saving fails and a separate message when a filter has no matches. Those details matter because the app should remain understandable even when the server or a filter does not return what I expect.

## Run the app

From the `MIDTERM` folder, run `npm install` once. Then keep two terminals open in that same folder:

Terminal 1:

```sh
npm run server
```

Terminal 2:

```sh
npm run dev
```

Open the local URL printed by Vite. The restaurants are saved by json-server in db.json on port 3001, so they remain after refresh. Run npm run lint and npm run build to check the code.

## Course concepts used

The React code follows the Week 06 todo-list exercise: `useState`, `useEffect`, props, controlled form inputs, `map` and `filter`, Axios requests, json-server, and loading, empty, and error messages. The new area field follows the Week 07 midterm requirement to save a new field in the create and edit forms and display it in the list. The layout uses regular CSS Flexbox and media queries for phone width.

## Props or Context

I chose props because this is a small, one-screen app. `App` owns the restaurant list, loading and error states, and the filters. It passes a restaurant and the needed create, edit, delete, and visit functions to the relevant components. Each form owns only the values the user is typing. This follows the Week 06 todo-list pattern and keeps the data flow easy for me to explain. Context would add more files without helping this app yet.

## With another week

I would add a short note for what I want to order at each restaurant. I would also let the user sort restaurants by name within an area.

## Presentation

The [Google Slides presentation](https://docs.google.com/presentation/d/1_S-qzKBmY2-vbo5vJTdymffBkxhFEEcfMWWmDo0WMH4/edit) is available online.
