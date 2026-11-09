# Week 09 Class B — Forms Continued

This reading-list exercise continues the controlled React form from the class starter. It shows validation after a field is visited or the form is submitted, places an accessible message beside each invalid field, and waits for an asynchronous save before clearing the form. While saving, the submit button is disabled. If saving fails, the form keeps the entered values and shows an error.

## Preview

From this folder, run:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. No separate server is needed for this exercise: the books are stored in React state, so refreshing the page clears the list.

## Try it

1. Submit the empty form to see the title and author messages.
2. Enter a title and author, select **Finished It**, then submit without a start date to see the conditional date message.
3. Add a valid book. The button says **Saving...** during the simulated save, then the book appears in the list and the form resets.

Run `npm run lint` and `npm run build` to check the project.
