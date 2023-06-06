import cartReducer from './cartSlice';
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    cart: cartReducer,
  }
})