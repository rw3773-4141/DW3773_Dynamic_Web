import {createSlice, createSelector, nanoid} from '@reduxjs/toolkit'

const artSlice = createSlice({
  name: 'art',

  initialState: {
    searchTerm: '',
    data: [], // an array of {id, name, price}
  },

  reducers: {
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload
    },

    addArt(state, action) {
      state.data.push({
        id: nanoid(),
        name: action.payload.name,
        price: action.payload.price,
      })
    },

    removeArt(state, action) {
      state.data = state.data.filter((item) => item.id !== action.payload)
    },
  },
})

export const {changeSearchTerm, addArt, removeArt} = artSlice.actions

/* createSelector takes a list of small "input" selectors and a function
   that combines their results. It remembers the last answer, and only
   runs the combining function again when one of the inputs has actually
   changed. Typing in the FORM no longer re-filters the collection. */

export const selectVisibleArt = createSelector(
  [(state) => state.art.data, (state) => state.art.searchTerm],
  (data, searchTerm) =>
    data.filter((art) =>
      art.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
)

// selectors compose: this one takes the one above as its input
export const selectTotalValue = createSelector(
  [selectVisibleArt],
  (visible) => visible.reduce((running, art) => running + art.price, 0)
)

export const artReducer = artSlice.reducer

export const selectVisibleCount = createSelector(
  [selectVisibleArt],
  (visible) => visible.length
)
