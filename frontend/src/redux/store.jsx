import { configureStore } from "@reduxjs/toolkit"
import { allReviewReducer, createProductReducer, deleteProductReducer, deleteReviewReducer, newReviewReducer, productDetailsReducer, productReducer, updateProductReducer } from "./reducers/productReducer"
import { userReducer } from "./reducers/userReducer"
import { cartReducer } from "./reducers/cartReducer"
import { orderReducer } from "./reducers/orderReducer"

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : []
const shippingInfoFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("shippingInfo"))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingInfo: shippingInfoFromStorage
  },
}

const store = configureStore({
  reducer: {
    products: productReducer,
    createProduct: createProductReducer,
    updateProduct: updateProductReducer,
    deleteProduct: deleteProductReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
    newReview: newReviewReducer,
    allReview: allReviewReducer,
    deleteReview: deleteReviewReducer,
  },
  preloadedState: initialState
})

export const server = "http://localhost:4000/api/v1"

export default store