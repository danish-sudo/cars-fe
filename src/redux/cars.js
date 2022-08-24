import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  total: 0,
};
export const carsSlice = createSlice({
  name: "cars",
  initialState: { value: initialStateValue },
  reducers: {
    setCars: (state, action) => {
      state.value = action.payload;
    },
    clearCars: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const { setCars, clearCars } = carsSlice.actions;

export default carsSlice.reducer;
