import { createSlice } from "@reduxjs/toolkit";

// Helper function to get the profile image from local storage
const getInitialProfileImage = () => {
  const savedImage = localStorage.getItem("profileImage");
  return savedImage ? savedImage : ""; // Return saved image or empty string if none exists
};

const initialState = {
  image: getInitialProfileImage(), // Set initial image from local storage
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileImage: (state, action) => {
      state.image = action.payload;
      localStorage.setItem("profileImage", action.payload); // Save image to local storage
    },
  },
});

export const { setProfileImage } = profileSlice.actions;
export default profileSlice.reducer;
