import { createSlice } from "@reduxjs/toolkit";

// Helper function to load from localStorage
const loadStateFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : { items: [], totalQuantity: 0 };
};

// Helper function to save to localStorage only if totalQuantity is greater than 0
const saveStateToLocalStorage = (state) => {
  if (state.totalQuantity > -1) {
    localStorage.setItem("cart", JSON.stringify(state));
  }
};

const initialState = loadStateFromLocalStorage();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.totalQuantity += 1;
      state.items = action.payload;
      saveStateToLocalStorage(state); // Save updated state to localStorage
    },
    decrement: (state) => {
      state.totalQuantity -= 1;
      state.items = [];
      saveStateToLocalStorage(state); // Save updated state to localStorage
    },
  },
});

export const { increment, decrement } = cartSlice.actions;
export default cartSlice.reducer;
