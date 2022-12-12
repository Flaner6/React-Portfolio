import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ids: {},
  isFunctionComponentVisible: false,
  isClassComponentVisible: false,
};


export const slice = createSlice({
  name: 'twitter',
  initialState,
  reducers: {
    nextId: (sliceState, action) => {
      sliceState.ids[action.payload] = (sliceState.ids[action.payload] || 1) + 1;
    },
    toggleFunctionComponent: (sliceState, action) => {
      console.log(action)
      sliceState.isFunctionComponentVisible = !sliceState.isFunctionComponentVisible;
    },
    toggleClassComponent: sliceState => {
      sliceState.isClassComponentVisible = !sliceState.isClassComponentVisible;
    }
  }
});