import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    totalQuantity: 0,
    total: 0,
  },

  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.totalQuantity += 1;
      state.total += action.payload.price * action.payload.quantity;
    },
    reset: (state) => {
      state.products = [];
      state.totalQuantity = 0;
      state.total = 0;
    }
  }
})

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;