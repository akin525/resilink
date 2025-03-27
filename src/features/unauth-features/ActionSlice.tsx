import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidenav: false,
  topnav: false,
};

const actionSlice = createSlice({
  name: "action",
  initialState,
  reducers: {
    toggleSidenav(state, action) {
      state.sidenav = action.payload;
    },
    toggleTopnav(state, action) {
      state.topnav = action.payload;
    }
  },
});

export const { toggleSidenav, toggleTopnav } = actionSlice.actions;
export default actionSlice.reducer;
