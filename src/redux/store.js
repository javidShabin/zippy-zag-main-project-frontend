import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/features/userSlice"; // Changed 'useReducer' to 'userReducer'
import shortProfilReducer from "../redux/features/shortProfileSlice";

export const store = configureStore({
  reducer: {
    user: userReducer, // Correct key-value pair for the reducer
    visible: shortProfilReducer,
  },
});
