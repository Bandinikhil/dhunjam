import { createSlice } from "@reduxjs/toolkit";
import { login } from "../api/authApi";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
    error: null,
    status: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.data.token;
      state.user = action.payload.data.id;
      state.status = action.payload.status;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.token = null;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export const loginAsync = (username, password) => async (dispatch) => {
  try {
    const response = await login(username, password);
    dispatch(loginSuccess(response));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};

export default authSlice.reducer;
