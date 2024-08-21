import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import authSlice from "./slices/authSlice";
import menuSlice from "./slices/menuSlice";
import SaveToLocalStorage from "./middlewere/SaveToLocalStorage"; 


const loadState = () => {
  try {
    const serializedCartItems = localStorage.getItem('cartItems');
    const serializedWishlistItems = localStorage.getItem('wishlistItems');
    
    if (serializedCartItems === null || serializedWishlistItems === null) {
      return undefined;
    }

    return {
      productData: {
        cartItems: JSON.parse(serializedCartItems),
        wishlistItems: JSON.parse(serializedWishlistItems),
      },
    };
  } catch (error) {
    return undefined;
  }
};

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    productData: productSlice,
    auth: authSlice,
    menu: menuSlice
  },
  preloadedState: persistedState, 
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(SaveToLocalStorage),
});
