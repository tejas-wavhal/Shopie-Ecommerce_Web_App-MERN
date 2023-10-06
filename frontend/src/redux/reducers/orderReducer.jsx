import { createReducer } from '@reduxjs/toolkit';


export const orderReducer = createReducer(
  { orders: [], order: {} },
  {
    createOrderRequest: state => {
      state.loading = true
    },
    createOrderSuccess: (state, action) => {
      state.loading = false
      state.order = action.payload
    },
    createOrderFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    myOrderRequest: (state) => {
      state.loading = true
    },
    myOrderSuccess: (state, action) => {
      state.loading = false
      state.orders = action.payload
    },
    myOrderFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    allOrdersRequest: state => {
      state.loading = true
    },
    allOrdersSuccess: (state, action) => {
      state.loading = false
      state.orders = action.payload
    },
    allOrdersFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    updateOrderRequest: state => {
      state.loading = true
    },
    updateOrderSuccess: (state, action) => {
      state.loading = false
      state.isUpdated = action.payload
    },
    updateOrderFail: (state, action) => {
      state.loading = false
      state.updateError = action.payload
    },

    deleteOrderRequest: (state) => {
      state.loading = true
    },
    deleteOrderSuccess: (state, action) => {
      state.loading = false
      state.isDeleted = action.payload
    },
    deleteOrderFail: (state, action) => {
      state.loading = false
      state.deleteError = action.payload
    },

    orderDetailsRequest: (state) => {
      state.loading = true
    },
    orderDetailsSuccess: (state, action) => {
      state.loading = false
      state.order = action.payload
    },
    orderDetailsFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    //Reset
    UpdateOrderReset: (state) => {
      state.loading = false
      state.isUpdated = false
    },
    deleteOrderReset: (state) => {
      state.loading = false
      state.isDeleted = false
    },

    //Clear Error
    clearError: state => {
      state.error = null
    }
  })
