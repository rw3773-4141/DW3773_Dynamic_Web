// I use one toggle for each print so the button only sends an id, and the reducer decides whether to add or remove it.
import {createSlice} from '@reduxjs/toolkit'

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    ids: [],
  },
  reducers: {
    // Optional Part 8: clear every saved id, including ids missing from the catalogue.
    favouritesCleared(state) {
      state.ids = []
    },
    favouriteToggled(state, action) {
      const id = action.payload
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((savedId) => savedId !== id)
      } else {
        state.ids.push(id)
      }
    },
  },
})

export const {favouriteToggled, favouritesCleared} = favouritesSlice.actions
export const selectFavouriteIds = (state) => state.favourites.ids
export const selectFavouriteCount = (state) => state.favourites.ids.length
export default favouritesSlice.reducer
