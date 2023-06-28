import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { InterviewType } from './interviewActionCreator';

type InitialStateType = {
  interview: InterviewType | null
  isLoading: boolean
  error: string
};

const initialState: InitialStateType = {
  interview: null,
  isLoading: false,
  error: '',
};

export const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    interviewLoading: (state) => {
      state.isLoading = true;
    },
    interviewLoaded: (state, action: PayloadAction<InterviewType>) => {
      state.isLoading = false;
      state.interview = action.payload;
      state.error = '';
    },
    interviewLoadingError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    interviewReset: (state) => {
      state.isLoading = false;
      state.interview = null;
      state.error = '';
    },
  },
});

export const { interviewLoading, interviewLoaded, interviewLoadingError, interviewReset } = interviewSlice.actions;

export default interviewSlice.reducer;