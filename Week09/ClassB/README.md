# Week 9 Class B

I added error messages to the reading list form. They show after leaving a field or submitting the form. The Add book button is disabled while saving, and the form clears after the save works.

## Run

```sh
npm install
npm run dev
```

Open the local link from Vite. This exercise keeps the books in React state, so refreshing the page clears the list. It does not need `npm run server`.

## Form checks

- Title and author cannot be empty.
- Pages must be at least 1 if a number is entered.
- A finished book needs a start date.
- If saving fails, the form keeps the input and shows a message.

Run `npm run lint` and `npm run build` to check the project.
