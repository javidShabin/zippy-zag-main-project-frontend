import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserShow: false,
  visible: {},
};

export const shortProfileSlice = createSlice({
  // Renamed from 'userrSlice' to 'userSlice'
  name: "visible",
  initialState,
  reducers: {
    showProfile: (state, action) => {
      state.isUserShow = true;
      state.visible = action.payload;
    },
    hideProfile: (state) => {
      state.isUserShow = false;
      state.visible = {};
    },
  },
});

export const { showProfile, hideProfile } = shortProfileSlice.actions;
export default shortProfileSlice.reducer; // Export the correct reducer
