import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Contributor } from './contributorsActionCreator';

type InitialStateType = {
  contributors: Contributor[]
  isLoading: boolean
  error: string
};

const initialState: InitialStateType = {
  contributors: [],
  isLoading: false,
  error: '',
};

export const contributorsSlice = createSlice({
  name: 'contributors',
  initialState,
  reducers: {
    contributorsLoading: (state) => {
      state.isLoading = true;
    },
    contributorsLoaded: (state, action: PayloadAction<Contributor[]>) => {
      state.isLoading = false;
      state.contributors = action.payload;
      state.error = '';
    },
    contributorsLoadingError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { contributorsLoading, contributorsLoaded, contributorsLoadingError } = contributorsSlice.actions;

export default contributorsSlice.reducer;