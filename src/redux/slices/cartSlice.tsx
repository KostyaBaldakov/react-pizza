import { createSlice } from "@reduxjs/toolkit";

type CartItem = {
  id: number;
  count: number;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
};

export interface Cart {
  totalPrice: number;
  items: CartItem[];
}

const initialState: Cart = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }

      if (findItem?.count === 0) {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
      }
    },

    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
