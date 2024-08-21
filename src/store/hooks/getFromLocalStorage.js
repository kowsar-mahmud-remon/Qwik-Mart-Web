import { useEffect, useState } from "react";

const useGetFromLocalStorage = (cartItems, wishlistItems) => {
  useEffect(() => {
    const serializedCartItems = localStorage.getItem(`${cartItems}`);
    const serializedWishlistItems = localStorage.getItem(`${wishlistItems}`);
  }, [cartItems, wishlistItems]);

};
export default useGetFromLocalStorage;