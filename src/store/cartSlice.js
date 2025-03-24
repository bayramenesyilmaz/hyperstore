import { createSlice } from "@reduxjs/toolkit";
import { calculateTotalPrice, loadCartFromStorage } from "@/lib/utils";

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart: (state) => {
      const { items, totalPrice } = loadCartFromStorage();
      state.items = items;
      state.totalPrice = totalPrice;
    },
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.totalPrice = calculateTotalPrice(state.items);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      state.totalPrice = calculateTotalPrice(state.items);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, clearCart, hydrateCart } =
  cartSlice.actions;
export default cartSlice.reducer;
