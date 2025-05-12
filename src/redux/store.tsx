import { configureStore } from "@reduxjs/toolkit";

import filters from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import pizzaReducer from "./slices/pizzaSlice";

export const store = configureStore({
  reducer: {
    filters,
    cart,
    pizza: pizzaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;



// import { configureStore } from '@reduxjs/toolkit';
// import filter from './filter/slice';
// import cart from './cart/slice';
// import pizza from './pizza/slice';
// import { useDispatch } from 'react-redux';

// export const store = configureStore({
//   reducer: {
//     filter,
//     cart,
//     pizza,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;

// type AppDispatch = typeof store.dispatch;

// export const useAppDispatch = () => useDispatch<AppDispatch>();