import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Category, ExtendedCategory } from './categoriesActionCreator';

type InitialStateType = {
  categories: Category[]
  category: ExtendedCategory | null
  isLoading: boolean
  error: string
};

const initialState: InitialStateType = {
  categories: [],
  category: null,
  isLoading: false,
  error: '',
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoriesLoading: (state) => {
      state.isLoading = true;
    },
    categoriesLoaded: (state, action: PayloadAction<Category[]>) => {
      state.isLoading = false;
      state.categories = action.payload;
      state.error = '';
    },
    categoriesLoadingError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    categoryLoaded: (state, action: PayloadAction<ExtendedCategory>) => {
      state.isLoading = false;
      state.category = action.payload;
      state.error = '';
    },
  },
});

export const { categoriesLoading, categoriesLoaded, categoriesLoadingError, categoryLoaded } = categoriesSlice.actions;

export default categoriesSlice.reducer;