import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  page: '',
  currentPage: '/ums',
  pageAfterAuth: '/home',
  signInError: ''
};


export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPageAfterAuth: (sliceState, action) => {
      sliceState.pageAfterAuth = action.payload;
    },
    setSignInError: (sliceState, action) => {
      sliceState.signInError = action.payload;
    },
    setUser: (sliceState, action) => {
      sliceState.user = action.payload;
    },
    setPage: (sliceState, action) => {
      sliceState.page = action.payload;
    },
    setCurrentPage: (sliceState, action) => {
      sliceState.currentPage = action.payload;
    },
  }
});