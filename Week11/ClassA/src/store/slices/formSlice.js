import {createSlice} from '@reduxjs/toolkit'

const formSlice = createSlice({
  name: 'form',

  // the two inputs on the form, and nothing else
  initialState: {
    name: '',
    price: 0,
  },

  reducers: {
    // The assumption every reducer makes: whatever we want to change the
    // value TO is arriving in action.payload.
    changeName(state, action) {
      state.name = action.payload
    },

    changePrice(state, action) {
      state.price = action.payload
    },
  },
})

export const {changeName, changePrice} = formSlice.actions

export const formReducer = formSlice.reducer
