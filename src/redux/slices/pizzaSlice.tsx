import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type PizzaItem = {
  id: number;
  count: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

type SearchParamsType = {
  currentPage: number;
  category: string;
  sort: string;
  search: string;
};

export interface InitialStateType {
  items: PizzaItem[];
  status: string;
}

const initialStatePizza: InitialStateType = {
  items: [],
  status: "loading", // loading | success | error
};

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchParamsType>(
  "pizza/fetchPizzas",
  async ({ currentPage, category, sort, search }) => {
    const { data } = await axios.get<PizzaItem[]>(
      `https://67b4aaf3a9acbdb38ecfeebc.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=desc${search}`
    );

    return data;
  }
);

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState: initialStatePizza,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading";
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzaItem[]>) => {
      state.items = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.status = "error";
    });
  },
});

//   extraReducers: {
//     [fetchPizzas.pending]: (state) => {
//       state.status = "loading";
//       state.items = [];
//     },
//     [fetchPizzas.rejected]: (state) => {
//       state.items = [];
//       state.status = "error";
//     },
//     [fetchPizzas.fulfilled]: (state, action) => {
//       state.items = action.payload;
//       state.status = "success";
//     },
//   },
// });

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
