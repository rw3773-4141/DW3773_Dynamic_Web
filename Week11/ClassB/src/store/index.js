import {configureStore} from '@reduxjs/toolkit'

import {
  artReducer,
  addArt,
  removeArt,
  changeSearchTerm,
  selectVisibleArt,
  selectTotalValue,
  selectVisibleCount,
} from './slices/artSlice.js'
import {formReducer, changeName, changePrice} from './slices/formSlice.js'

const store = configureStore({
  reducer: {
    art: artReducer,
    form: formReducer,
  },
})

export {
  store,
  changeName,
  changePrice,
  addArt,
  removeArt,
  changeSearchTerm,
  selectVisibleArt,
  selectTotalValue,
  selectVisibleCount,
}
