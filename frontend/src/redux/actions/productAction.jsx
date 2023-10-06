import axios from 'axios';

export const getAllProducts = (keyword = "", category, currentPage = 1, price = [0, 25000], ratings = 0) => async dispatch => {
  try {
    dispatch({ type: 'allProductsRequest' });

    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    if (category) {
      link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }

    const { data } = await axios.get(link);


    dispatch({ type: 'allProductsSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'allProductsFail',
      payload: error.response.data.message,
    });
  }
};


export const getProductDetails = (id) => async dispatch => {
  try {
    dispatch({ type: 'productDetailsRequest' });

    const { data } = await axios.get(
      `/api/v1/product/${id}`
    );


    dispatch({ type: 'productDetailsSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'productDetailsFail',
      payload: error.response.data.message,
    });
  }
};


// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: 'newReviewRequest' });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: 'newReviewSuccess',
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: 'newReviewFail',
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'allReviewRequest' });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: 'allReviewSuccess',
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: 'allReviewFail',
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: 'deleteReviewRequest' });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: 'deleteReviewSuccess',
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: 'deleteReviewFail',
      payload: error.response.data.message,
    });
  }
};


// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: 'adminProductRequest' });

    const { data } = await axios.get("/api/v1/admin/products");

    dispatch({
      type: 'adminProductSuccess',
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: 'adminProductFail',
      payload: error.response.data.message,
    });
  }
};

// Create Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: 'createProductRequest' });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/product/new`,
      productData,
      config
    );

    dispatch({
      type: 'createProductSuccess',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'createProductFail',
      payload: error.response.data.message,
    });
  }
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: 'updateProductRequest' });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: 'updateProductSuccess',
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: 'updateProductFail',
      payload: error.response.data.message,
    });
  }
};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'deleteProductRequest' });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

    dispatch({
      type: 'deleteProductSuccess',
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: 'deleteProductFail',
      payload: error.response.data.message,
    });
  }
};

