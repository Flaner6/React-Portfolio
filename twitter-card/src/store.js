import { configureStore } from '@reduxjs/toolkit';
import { slice as twitterSlice } from './models/twitter/slice';

export const store = configureStore({
  reducer: {
    [twitterSlice.name]: twitterSlice.reducer,
  },
})