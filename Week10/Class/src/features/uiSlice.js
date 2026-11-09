import {createSlice} from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    colourFilter: 'all',
    favouritesOnly: false,
  },
  reducers: {
    filterChanged(state, action) {
      state.colourFilter = action.payload
    },
    favouritesOnlyChanged(state, action) {
      state.favouritesOnly = action.payload
    },
  },
})

export const {filterChanged, favouritesOnlyChanged} = uiSlice.actions
export const selectColourFilter = (state) => state.ui.colourFilter
export const selectFavouritesOnly = (state) => state.ui.favouritesOnly
export default uiSlice.reducer
