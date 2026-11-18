import {configureStore} from '@reduxjs/toolkit'

import {artReducer, addArt, removeArt, changeSearchTerm} from './slices/artSlice.js'
import {formReducer, changeName, changePrice} from './slices/formSlice.js'

const store = configureStore({
  reducer: {
    art: artReducer,
    form: formReducer,
  },
})

// One door in and out. Components import everything they need from
// '../store' and never reach into a slice file directly, so if a slice
// moves or gets renamed, this is the only file that changes.
export {store, changeName, changePrice, addArt, removeArt, changeSearchTerm}
