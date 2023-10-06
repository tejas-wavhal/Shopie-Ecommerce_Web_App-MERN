import { createReducer } from '@reduxjs/toolkit';

export const productReducer = createReducer(
  { products: [], productsCount: [], filteredProductsCount: [] },
  {
    allProductsRequest: state => {
      state.loading = true;
    },
    allProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount;
    },
    allProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    adminProductRequest: state => {
      state.loading = true;
      state.products = [];
    },
    adminProductSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    adminProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: state => {
      state.error = null;
    },
  }
);

export const productDetailsReducer = createReducer(
  { productDetails: {} },
  {
    productDetailsRequest: state => {
      state.loading = true;
    },
    productDetailsSuccess: (state, action) => {
      state.loading = false;
      state.productDetails = action.payload.product;
    },
    productDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  }
);

export const newReviewReducer = createReducer(
  {},
  {
    newReviewRequest: state => {
      state.loading = true;
    },
    newReviewSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    newReviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    newReviewReset: (state) => {
      state.success = false;
    },

    clearError: state => {
      state.error = null;
    },
  }
);

export const allReviewReducer = createReducer(
  { reviews: [] },
  {
    allReviewRequest: state => {
      state.loading = true;
    },
    allReviewSuccess: (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    },
    allReviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: state => {
      state.error = null;
    },
  }
);

export const deleteReviewReducer = createReducer(
  {},
  {
    deleteReviewRequest: state => {
      state.loading = true;
    },
    deleteReviewSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    deleteReviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteReviewReset: (state) => {
      state.isDeleted = false;
    },

    clearError: state => {
      state.error = null;
    },
  }
);

export const createProductReducer = createReducer(
  { product: {} },
  {
    createProductRequest: state => {
      state.loading = true;
    },
    createProductSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.product = action.payload.product;
    },
    createProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createProductReset: (state) => {
      state.success = false;
    },

    clearError: state => {
      state.error = null;
    },
  }
);

export const updateProductReducer = createReducer(
  {},
  {
    updateProductRequest: state => {
      state.loading = true;
    },
    updateProductSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    updateProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProductReset: (state) => {
      state.isUpdated = false;
    },

    clearError: state => {
      state.error = null;
    },
  }
);

export const deleteProductReducer = createReducer(
  {},
  {
    deleteProductRequest: state => {
      state.loading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    deleteProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProductReset: (state) => {
      state.isDeleted = false;
    },

    clearError: state => {
      state.error = null;
    },
  }
);

