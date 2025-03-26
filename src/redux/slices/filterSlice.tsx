import { createSlice } from "@reduxjs/toolkit";

export interface Filters {
  categoryId: number;
  currentPage: number;

  sort: {
    name: string;
    sortProperty: string;
  };
}

const initialState: Filters = {
  categoryId: 0,
  currentPage: 1,

  sort: {
    name: "популярный",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setPage(state, action) {
      console.log(action.payload);

      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setPage } = filterSlice.actions;

export default filterSlice.reducer;
