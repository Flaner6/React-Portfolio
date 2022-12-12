import { configureStore } from '@reduxjs/toolkit';
import  {bettingSlice}  from './models/betting/slice';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { bettingRootEpic } from './models/betting/epics';

const rootEpic = combineEpics(bettingRootEpic)

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    [bettingSlice.name]: bettingSlice.reducer
  },
  middleware: [epicMiddleware],
});

epicMiddleware.run(rootEpic);
