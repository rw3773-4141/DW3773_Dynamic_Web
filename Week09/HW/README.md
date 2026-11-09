# Places to Eat

Places to Eat is a list of NYC restaurants I want to try. I can save a restaurant, choose its area, filter the list, and mark it visited after I go. This is my Week 9 update to the midterm project.

## User story

As someone who saves restaurant recommendations around New York City, I want to record each restaurant's area, so that I can spot a place to try when I am in that part of the city.

I added an area select to both the add and edit forms. The area is saved in `db.json` and shown on the restaurant card, so it is still there after refreshing. Older entries without an area show “Area not set.”

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

- [x] Started with the Week 6 todo app and changed it to a restaurant list.
- [x] Changed the API route and `db.json` collection to `restaurants`.
- [x] Added the area select to both the add and edit forms.
- [x] Included the area in POST and PUT, and kept the visited value when editing.
- [x] Showed the area on each card and added a fallback for older entries.
- [x] Used PATCH for the visited checkbox.
- [x] Added area and visit filters.
- [x] Added loading, empty, error, and no-results messages.
- [x] Kept the input after a failed save and disabled the button while saving.
- [x] Added `onBlur` and touched fields so validation messages show beside the inputs.
- [x] Connected the messages with `aria-invalid` and `aria-describedby`.
- [x] Added the phone layout and NYC skyline background.
- [x] Ran lint and build, and checked adding, editing, visiting, refreshing, and deleting with a temporary database.

My first checklist covered the area field, but I missed some smaller changes, like updating the API route, database collection, and page title. I also needed to think about failed saves and empty filter results. In Week 9, I added messages beside the fields so it is clear what needs to be fixed before saving.

## Run

In `Week09/HW`, install the packages once:

```sh
npm install
```

Then open two terminals in this folder.

Terminal 1:

```sh
npm run server
```

Terminal 2:

```sh
npm run dev
```

Open the local link from Vite. json-server runs on port 3001 and saves the restaurants in `db.json`.

## Why I used props

I used props because this is a small app with one page. `App` keeps the restaurant list and filters, then passes the data and functions to the other components. Each form keeps its own input values with `useState`. This is easier for me to follow than adding Context here.

## With another week

I would add a note for what I want to order at each restaurant and a way to sort the list by name.

## Presentation

[Google Slides](https://docs.google.com/presentation/d/1_S-qzKBmY2-vbo5vJTdymffBkxhFEEcfMWWmDo0WMH4/edit) and the [presentation outline](PRESENTATION.md).
