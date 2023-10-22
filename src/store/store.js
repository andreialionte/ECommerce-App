import { configureStore, createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartProd: [],
    products: 1, 
  },
  reducers: {
    addToCart: (state, action) => {
      const checkIfTheItemIsTheSameWithOther = state.cartProd.filter((item) => item.id === action.payload.id)
      const checkIfItemIsAlreadyInCart = state.cartProd.find((item) => item.id === action.payload.id);
      if(checkIfItemIsAlreadyInCart && checkIfTheItemIsTheSameWithOther) {
        state.products++;
        return; 
      }
      state.cartProd.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const itemToRemove = action.payload;
      state.products--;
      if(state.products < 1){
        state.cartProd = state.cartProd.filter((item) => item.id !== itemToRemove.id); 
        state.products = 1;
      }
    },
    setProductCount: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, setProductCount } = cartSlice.actions;

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export default store;
