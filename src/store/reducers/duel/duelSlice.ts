import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DuelResType } from './duelActionCreator';

type InitialStateType = {
  duel: DuelResType | null
  isLoading: boolean
  error: string
};

const initialState: InitialStateType = {
  duel: null,
  isLoading: false,
  error: '',
};

export const duelSlice = createSlice({
  name: 'duel',
  initialState,
  reducers: {
    duelLoading: (state) => {
      state.isLoading = true;
    },
    duelLoaded: (state, action: PayloadAction<DuelResType>) => {
      state.isLoading = false;
      state.duel = action.payload;
      state.error = '';
    },
    duelLoadingError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    duelReset: (state) => {
      state.isLoading = false;
      state.duel = null;
      state.error = '';
    },
  },
});

export const { duelLoading, duelLoaded, duelLoadingError, duelReset } = duelSlice.actions;

export default duelSlice.reducer;