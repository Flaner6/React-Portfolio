import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

export const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (sliceState, action) => {
      sliceState.users = action.payload;
    },
    setUserById: (sliceState, action) => {
      sliceState.users = sliceState.users.map((user) => {
        if (user.id === action.payload.id) {
          return {
            ...user,
            ...action.payload
          }
        }

        return user;
      });
    },
    deleteUserById: (sliceState, action) => {
      sliceState.users = sliceState.users.filter(user => user.id !== action.payload.id)
    },
  },
});

