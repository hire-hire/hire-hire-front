import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from './userActionCreator';

type InitialStateType = {
  user: User | null
  isLoading: boolean
  error: any
};

const initialState: InitialStateType = {
  user: null,
  isLoading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoading: (state) => {
      state.isLoading = true;
    },
    userError: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    userErrorReset: (state) => {
      state.isLoading = false;
      state.error = '';
    },
    userReceived: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.error = '';
      state.isLoading = false;
    },
    userCreated: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = '';
    },
    userPatched: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = '';
    },
    userLoggedOut: (state) => {
      state.isLoading = false;
      state.user = null;
      state.error = '';
    }
  },
});

export const { 
  userLoading, 
  userError, 
  userReceived, 
  userCreated, 
  userPatched, 
  userLoggedOut,
  userErrorReset } = userSlice.actions;

export default userSlice.reducer;