import { configureStore } from "@reduxjs/toolkit";
import filters from "./slices/filterSlice";
import cart from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    filters,
    cart,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
