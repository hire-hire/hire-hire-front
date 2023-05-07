import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from './userActionCreator';

type InitialStateType = {
  user: User | null
  isLoading: boolean
  error: string
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
    userError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    userReceived: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = '';
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

export const { userLoading, userError, userReceived, userCreated, userPatched, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;