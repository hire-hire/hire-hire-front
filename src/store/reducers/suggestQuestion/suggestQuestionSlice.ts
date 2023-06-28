import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { QuestionResType } from './suggestQuestionActionCreator';

type InitialStateType = {
  questionStatus: QuestionResType | null
  isLoading: boolean
  error: string
};

const initialState: InitialStateType = {
  questionStatus: null,
  isLoading: false,
  error: '',
};

export const suggestQuestionSlice = createSlice({
  name: 'suggestQuestion',
  initialState,
  reducers: {
    suggestQuestionLoading: (state) => {
      state.isLoading = true;
    },
    suggestQuestionLoaded: (state, action: PayloadAction<QuestionResType>) => {
      state.isLoading = false;
      state.questionStatus = action.payload;
      state.error = '';
    },
    suggestQuestionLoadingError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    suggestQuestionReset: (state) => {
      state.isLoading = false;
      state.questionStatus = null;
      state.error = '';
    },
  },
});

export const { 
  suggestQuestionLoading, 
  suggestQuestionLoaded, 
  suggestQuestionLoadingError,
  suggestQuestionReset } = suggestQuestionSlice.actions;

export default suggestQuestionSlice.reducer;