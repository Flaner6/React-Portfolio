import { configureStore } from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { slice as authSlice } from './models/auth/slice';
import { slice as usersSlice } from './models/users/slice';
import { authRootEpic } from './models/auth/epics';

const rootEpic = combineEpics(authRootEpic)

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [usersSlice.name]: usersSlice.reducer
  },
  middleware: [epicMiddleware],
});

epicMiddleware.run(rootEpic);