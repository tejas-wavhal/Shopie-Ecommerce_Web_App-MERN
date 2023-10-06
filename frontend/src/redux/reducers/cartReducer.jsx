import { createReducer } from '@reduxjs/toolkit';

export const cartReducer = createReducer(
  { cartItems: [], shippingInfo: {} },
  {
    addToCart: (state, action) => {
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product    //checking product if already existeded or not in cart with the help of _id of product
      )

      if (isItemExist) {
        return {
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i  //if item exists already then then we are replacing it 
          ),
        };
      } else {
        return {
          cartItems: [...state.cartItems, item],
        };
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.product !== action.payload)
    },
    savingShipppingInfo: (state, action) => {
      state.shippingInfo = action.payload
    },
  }
);