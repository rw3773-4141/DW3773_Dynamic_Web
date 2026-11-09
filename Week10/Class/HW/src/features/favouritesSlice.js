/* Checked in Redux DevTools: favourites/favouriteToggled with payload 'p1'
   added 'p1' at index 0 of favourites.ids ([] -> ['p1']). The cart and ui
   branches did not change. Moving the history slider to @@INIT reset the
   page, and moving it forward restored the favourites, cart, and filter. */
import {createSlice} from '@reduxjs/toolkit'

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    ids: [],
  },
  reducers: {
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

export const {favouriteToggled} = favouritesSlice.actions
export const selectFavouriteIds = (state) => state.favourites.ids
export const selectFavouriteCount = (state) => state.favourites.ids.length
export default favouritesSlice.reducer
