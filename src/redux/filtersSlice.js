import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    name: "",
  },
  reducers: {
    setInputValue: (state, action) => {
      state.name = action.payload;
    },
  },
});
export const { setInputValue } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
