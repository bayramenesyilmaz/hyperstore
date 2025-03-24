import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const loadCartFromStorage = () => {
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

export const calculateTotalPrice = (items) =>
  items.reduce((acc, item) => acc + item.price * item.quantity, 0);
