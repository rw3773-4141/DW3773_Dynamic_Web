/* The sort order is state because the app needs to remember the user's choice.
   The sorted array is derived from the visible pieces and that choice, so it
   is not stored. I sort a copy to keep the original collection unchanged. */
import {createSlice, createSelector, nanoid} from '@reduxjs/toolkit'

const artSlice = createSlice({
  name: 'art',

  initialState: {
    searchTerm: '',
    sortOrder: 'added',
    data: [], // an array of {id, name, price}
  },

  reducers: {
    changeSortOrder(state, action) {
      state.sortOrder = action.payload
    },

    clearCollection(state) {
      state.data = []
    },

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

export const {changeSearchTerm, addArt, removeArt, changeSortOrder, clearCollection} = artSlice.actions

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

export const selectSortedArt = createSelector(
  [selectVisibleArt, (state) => state.art.sortOrder],
  (visible, sortOrder) => sortOrder === 'price-desc'
    ? [...visible].sort((first, second) => second.price - first.price)
    : visible
)
