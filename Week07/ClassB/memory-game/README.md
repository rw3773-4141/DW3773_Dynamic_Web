# Week 7 Class B: Memory Game

This is the completed memory game from [the Week 7 Class B lesson](https://github.com/Kadee80/Dynamic_Web_Fall26/blob/main/Week07/ClassB.md). Click **New Game**, then flip two cards per turn. Matching pairs stay face up. A mismatch flips back after a short pause. The game counts turns and shows a message when all pairs match.

## Run

From this folder:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Run `npm run build` to check the project.

## How the state works

- `choiceOne` and `choiceTwo` hold the current pair. An effect with `[choiceOne, choiceTwo]` compares them after React has updated state.
- Matching cards get `matched: true` in a new `cards` array. Mismatches stay visible for 1.2 seconds, then reset.
- Another effect watches `[cards]` for the win. `cards.length > 0` prevents an empty board from counting as a win.
- New Game clears the current choices, turns, and win state. The mismatch timer is cleaned up if a new game starts before it finishes.
