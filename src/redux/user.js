import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  email: "",
  token: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    clearUser: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
