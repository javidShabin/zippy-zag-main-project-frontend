import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/features/userSlice';  // Changed 'useReducer' to 'userReducer'

export const store = configureStore({
  reducer: {
    user: userReducer,  // Correct key-value pair for the reducer
  },
});
