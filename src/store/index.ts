import { configureStore } from '@reduxjs/toolkit';
import contributorsSlice from './reducers/contributors/contributorsSlice';
import categoriesSlice from './reducers/categories/categoriesSlice';
import interviewSlice from './reducers/interview/interviewSlice';
import userSlice from './reducers/user/userSlice';

export const baseUrl = 'https://test-hire-hire.proninteam.ru/api/v1/';

export const store = configureStore({
  reducer: {
    contributors: contributorsSlice,
    categories: categoriesSlice,
    interview: interviewSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;