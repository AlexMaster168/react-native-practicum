import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
