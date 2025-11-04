import { configureStore } from '@reduxjs/toolkit';
import queryReducer from './querySlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      query: queryReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
