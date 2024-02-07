import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  productDeleteSuccess: false,
};

export const productAdd = createAsyncThunk(
  'productSlice/productAdd',
  async params => {
    const response = await axios.post(
      `https://dummyjson.com/products/add`,
      params,
    );
    return response.data;
  },
);

export const productUpdate = createAsyncThunk(
  'productSlice/productUpdate',
  async product => {
    const response = await axios.put(
      `https://dummyjson.com/products/${product.id}`,
      {
        body: product.data,
      },
    );
    return response.data;
  },
);

export const getProductDetails = createAsyncThunk(
  'productSlice/getProductDetails',
  async params => {
    const response = await axios.get(
      `https://dummyjson.com/products/${params}`,
    );
    return response.data;
  },
);

export const deleteProduct = createAsyncThunk(
  'productSlice/deleteProduct',
  async id => {
    const response = await axios.delete(`https://dummyjson.com/products/${id}`);
    return response.data;
  },
);

export const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    deleteSuccess(state) {
      return { ...state, productDeleteSuccess: true };
    },
    deleteFailed(state) {
      return { ...state, productDeleteSuccess: false };
    },
    deleteInitial(state) {
      return { ...state, productDeleteSuccess: false };
    },
  },
});

export const { deleteSuccess, deleteFailed, deleteInitial } =
  productSlice.actions;

export default productSlice.reducer;
