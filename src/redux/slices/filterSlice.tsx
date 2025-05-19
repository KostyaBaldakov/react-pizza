import { createSlice } from "@reduxjs/toolkit";

export interface Filters {
  categoryId: number;
  currentPage: number;

  sort: {
    name: string;
    sortProperty: string;
  };
}

export const initialStateFilters: Filters = {
  categoryId: 0,
  currentPage: 1,

  sort: {
    name: "популярный",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState: initialStateFilters,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setPage(state, action) {

      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const { setCategoryId, setSort, setPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
