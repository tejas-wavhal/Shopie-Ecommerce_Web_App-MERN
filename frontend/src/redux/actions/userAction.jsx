import axios from 'axios';

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'loginRequest' });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );

    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'loginFail', payload: error.response.data.message });
  }
};

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: 'registerRequest' });

    const config = { headers: { "Content-type": "multipart/form-data" } };

    const { data } = await axios.post(`/api/v1/register`, userData, config);
    console.log(data)
    dispatch({ type: 'registerSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'registerFail',
      payload: error.response.data.message,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: 'loadUserRequest' });

    const { data } = await axios.get(`/api/v1/me`);

    dispatch({ type: 'loadUserSuccess', payload: data.user });
  } catch (error) {
    dispatch({ type: 'loadUserFail', payload: error.response.data.message });
  }
};


// Logout User
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: 'logoutRequest' });
    const { data } = await axios.get(`/api/v1/logout`);

    dispatch({ type: 'logoutSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'logoutFail', payload: error.response.data.message });
  }
};


// Update Profile
export const updateProfile = (name, email) => async (dispatch) => {
  try {
    dispatch({ type: 'updateProfileRequest' })

    const { data } = await axios.put(
      `/api/v1/me/update`,
      { name, email },
      {
        headers: {
          "Content-type": "application/json"
        },
        withCredentials: true,
      })


    dispatch({ type: 'updateProfileSuccess', payload: data.message })
  } catch (error) {
    dispatch({ type: 'updateProfileFail', payload: error.response.data.message })
  }
};

// Update Profile Picture
export const updateProfilePicture = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: 'updateProfilePictureRequest' })

    const { data } = await axios.put(
      `api/v1/me/updateprofilepicture`,
      formdata,
      {
        headers: {
          "Content-type": "multipart/form-data"
        },
        withCredentials: true,
      })


    dispatch({ type: 'updateProfilePictureSuccess', payload: data.message })
  } catch (error) {
    dispatch({ type: 'updateProfilePictureFail', payload: error.response.data.message })
  }
}

// Update Password
export const updatePassword = (oldPassword, newPassword) => async (dispatch) => {
  try {
    dispatch({ type: 'changePasswordRequest' })

    const { data } = await axios.put(
      `/api/v1/password/update`,
      { oldPassword, newPassword },
      {
        headers: {
          "Content-type": "application/json"
        },
        withCredentials: true,
      })


    dispatch({ type: 'changePasswordSuccess', payload: data.message })
  } catch (error) {
    dispatch({ type: 'changePasswordFail', payload: error.response.data.message })
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: 'forgetPasswordRequest' });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/password/forgot`, email, config);

    dispatch({ type: 'forgetPasswordSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'forgetPasswordFail',
      payload: error.response.data.message,
    });
  }
};

// Reset Password
export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: 'resetPasswordRequest' });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      { password },
      config
    );

    dispatch({ type: 'resetPasswordSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'resetPasswordFail',
      payload: error.response.data.message,
    });
  }
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: 'allUsersRequest' });
    const { data } = await axios.get(`/api/v1/admin/users`);

    dispatch({ type: 'allUsersSuccess', payload: data.users });
  } catch (error) {
    dispatch({ type: 'allUsersFail', payload: error.response.data.message });
  }
};

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'userDetailsRequest' });
    const { data } = await axios.get(`/api/v1/admin/user/${id}`);

    dispatch({ type: 'userDetailsSuccess', payload: data.user });
  } catch (error) {
    dispatch({ type: 'userDetailsFail', payload: error.response.data.message });
  }
};

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: 'updateUserRequest' });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/admin/user/${id}`,
      userData,
      config
    );

    dispatch({ type: 'updateUserSuccess', payload: data.success });
  } catch (error) {
    dispatch({
      type: 'updateUserFail',
      payload: error.response.data.message,
    });
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'deleteUserRequest' });

    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

    dispatch({ type: 'deleteUserSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'deleteUserFail',
      payload: error.response.data.message,
    });
  }
};
