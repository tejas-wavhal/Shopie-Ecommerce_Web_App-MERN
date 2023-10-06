import { createReducer } from '@reduxjs/toolkit';

//we are directly making a state by state.nameOfState
export const userReducer = createReducer(
  { user: {}, users: [], userDetail: {} },
  {
    loginRequest: state => {
      state.loading = true
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.message = action.payload.message
    },
    loginFail: (state, action) => {
      state.loading = false
      state.isAuthenticated = false
      state.error = action.payload
    },

    registerRequest: (state) => {
      state.loading = true
    },
    registerSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.message = action.payload.message
    },
    registerFail: (state, action) => {
      state.loading = false
      state.isAuthenticated = false
      state.error = action.payload
    },

    logoutRequest: state => {
      state.loading = true
    },
    logoutSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = false
      state.user = null
      state.message = action.payload
    },
    logoutFail: (state, action) => {
      state.loading = false
      state.isAuthenticated = false
      state.error = action.payload
    },

    loadUserRequest: state => {
      state.loading = true
    },
    loadUserSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload
    },
    loadUserFail: (state, action) => {
      state.loading = false
      state.isAuthenticated = false
      state.error = action.payload
    },

    updateProfileRequest: (state) => {
      state.loading = true
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false
      state.message = action.payload
    },
    updateProfileFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    changePasswordRequest: (state) => {
      state.loading = true
    },
    changePasswordSuccess: (state, action) => {
      state.loading = false
      state.message = action.payload
    },
    changePasswordFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    forgetPasswordRequest: (state) => {
      state.loading = true
    },
    forgetPasswordSuccess: (state, action) => {
      state.loading = false
      state.message = action.payload
    },
    forgetPasswordFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    resetPasswordRequest: (state) => {
      state.loading = true
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false
      state.message = action.payload
    },
    resetPasswordFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    updateProfilePictureRequest: (state) => {
      state.loading = true
    },
    updateProfilePictureSuccess: (state, action) => {
      state.loading = false
      state.message = action.payload
    },
    updateProfilePictureFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },




    //admin
    allUsersRequest: (state) => {
      state.userLoading = true
    },
    allUsersSuccess: (state, action) => {
      state.userLoading = false
      state.users = action.payload
    },
    allUsersFail: (state, action) => {
      state.userLoading = false
      state.error = action.payload
    },

    userDetailsRequest: (state) => {
      state.loading = true
    },
    userDetailsSuccess: (state, action) => {
      state.loading = false
      state.userDetail = action.payload
    },
    userDetailsFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    updateUserRequest: (state) => {
      state.updateLoading = true
    },
    updateUserSuccess: (state, action) => {
      state.updateLoading = false
      state.isUpdated = action.payload
    },
    updateUserFail: (state, action) => {
      state.updateLoading = false
      state.updateError = action.payload
    },
    updateUserReset: (state) => {
      state.updateLoading = false
      state.isUpdated = false
    },

    deleteUserRequest: (state) => {
      state.deleteloading = true
    },
    deleteUserSuccess: (state, action) => {
      state.deleteloading = false
      state.isDeleted = action.payload.success
      state.deleteMessage = action.payload.message
    },
    deleteUserFail: (state, action) => {
      state.deleteloading = false
      state.deleteError = action.payload
    },
    deleteUserReset: (state) => {
      state.deleteloading = false
      state.isDeleted = false
    },





    clearError: state => {
      state.error = null
    },
    clearMessage: state => {
      state.message = null
    },
  })
