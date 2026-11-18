import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './features/cartSlice.js'
import uiReducer from './features/uiSlice.js'
import favouritesReducer from './features/favouritesSlice.js'

// configureStore also connects the browser's Redux DevTools extension.
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    ui: uiReducer,
    favourites: favouritesReducer,
  },
})
