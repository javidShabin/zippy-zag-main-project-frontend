import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/features/userSlice"; // Changed 'useReducer' to 'userReducer'
import cartReducer from "../redux/features/cartSlice";
import profileReducer from "../redux/features/profileSlice"

export const store = configureStore({
  reducer: {
    user: userReducer, // Correct key-value pair for the reducer
    cart: cartReducer,
    profile: profileReducer
  },
});
