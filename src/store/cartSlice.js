import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addItem: (state, action) => {
      const product = action.payload;

      const existingItem = state.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({
          ...product,
          quantity: 1,
        });
      }
    },

    removeItem: (state, action) => {
      return state.filter(
        (item) => item.id !== action.payload
      );
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.find(
        (item) => item.id === id
      );

      if (!item) {
        return;
      }

      if (quantity <= 0) {
        return state.filter(
          (item) => item.id !== id
        );
      }

      item.quantity = quantity;
    },

    clearCart: () => {
      return [];
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;