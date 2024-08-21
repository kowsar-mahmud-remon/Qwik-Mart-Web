
const SaveToLocalStorage = (store) => (next) => (action) => {
  const result = next(action);

  const { productData } = store.getState();
//  console.log(productData);

  localStorage.setItem('cartItems', JSON.stringify(productData.cartItems));
  localStorage.setItem('wishlistItems', JSON.stringify(productData.wishlistItems));

  return result;
};

export default SaveToLocalStorage;
