import { configureStore } from '@reduxjs/toolkit';
import contributorsSlice from './reducers/contributors/contributorsSlice';
import categoriesSlice from './reducers/categories/categoriesSlice';
import interviewSlice from './reducers/interview/interviewSlice';
import userSlice from './reducers/user/userSlice';
import duelSlice from './reducers/duel/duelSlice';

export const baseUrl = process.env.REACT_APP_API_URL;

export const store = configureStore({
  reducer: {
    contributors: contributorsSlice,
    categories: categoriesSlice,
    interview: interviewSlice,
    user: userSlice,
    duel: duelSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;