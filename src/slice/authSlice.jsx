import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = sessionStorage.getItem('token');

const initialState = token
  ? { isLoggedIn: true, token }
  : { isLoggedIn: false, token: null };

export const login = createAsyncThunk('user/login', async data => {
  const response = await axios.post(`https://dummyjson.com/auth/login`, data);
  const userData = response.data;

  if (userData) {
    sessionStorage.setItem('token', userData.token);
    return userData;
  }
  return { status: 404, message: 'Invalid credentials' };
});

export const logout = () => {
  sessionStorage.clear();
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      console.log('action', action.payload);
      return { ...state, token: action.payload.token, isLoggedIn: true };
    },
    loginFailed(state, action) {
      return { ...state, status: true, msg: action.payload };
    },
    setLoginStatesFalse(state) {
      return { ...state, fetchError: false };
    },
  },
});
export const { loginSuccess, loginFailed } = authSlice.actions;
export default authSlice.reducer;
