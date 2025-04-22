import { createSlice } from "@reduxjs/toolkit";

type PizzaItem = {
  id: number;
  count: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export interface Pizza {
  items: PizzaItem[];
}

const initialState: Pizza = {
  items: [],
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
