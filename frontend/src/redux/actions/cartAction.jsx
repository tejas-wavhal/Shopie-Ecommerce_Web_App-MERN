import axios from 'axios';

//add to cart (store in local storage)
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => { //by second parameter we can directly access the state
  const { data } = await axios.get(`/api/v1/product/${id}`);
  dispatch({
    type: 'addToCart',
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity
    }
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));   //saved products in local storage
};

export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: 'removeFromCart',
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: 'savingShipppingInfo',
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
}