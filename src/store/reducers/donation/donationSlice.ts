import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = {
  donationLink: string | null
  isLoading: boolean
  error: string
};

const initialState: InitialStateType = {
  donationLink: null,
  isLoading: false,
  error: '',
};

export const donationSlice = createSlice({
  name: 'donation',
  initialState,
  reducers: {
    donationLoading: (state) => {
      state.isLoading = true;
    },
    donationLoadingError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    donationLinkLoaded: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.donationLink = action.payload;
      state.error = '';
    },
  },
});

export const { donationLoading, donationLoadingError, donationLinkLoaded } = donationSlice.actions;

export default donationSlice.reducer;