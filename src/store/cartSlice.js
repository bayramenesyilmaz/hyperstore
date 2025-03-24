import { createSlice } from "@reduxjs/toolkit";

// 📌 localStorage'dan sepeti ve toplam fiyatı yüklemek için yardımcı fonksiyon
const loadCartFromStorage = () => {
  if (typeof window !== "undefined") {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      return {
        items: savedCart,
        totalPrice: calculateTotalPrice(savedCart),
      };
    } catch (error) {
      console.error("LocalStorage okuma hatası:", error);
      return { items: [], totalPrice: 0 };
    }
  }
  return { items: [], totalPrice: 0 };
};

// 📌 Toplam fiyatı hesaplama fonksiyonu
const calculateTotalPrice = (items) =>
  items.reduce((acc, item) => acc + item.price * item.quantity, 0);

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

      // Toplam fiyatı güncelle
      state.totalPrice = calculateTotalPrice(state.items);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      // Toplam fiyatı güncelle
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
