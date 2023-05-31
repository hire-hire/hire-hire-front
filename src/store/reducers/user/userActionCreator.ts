import axios from 'axios';
import { AppDispatch, baseUrl } from '../../index';
import { userLoading, userError, userReceived, userCreated, userPatched, userLoggedOut } from './userSlice';

export type User = {
  username: string
  id: number
  is_duel_moderator?: boolean
}

export type UserRequestType = {
  username: string
  password: string
};

export type UserLoginType = {
  username: string
  password: string
}

export type UserTokenResponceType = {
  refresh: string
  access: string
}

export const getUser = (access: string, refresh: string) => async (dispatch: AppDispatch) => {
  dispatch(userLoading());
  await axios.get<User>(`${baseUrl}auth/users/me/`, {
    headers: {
      Authorization: `JWT ${access}`
    }
  })
    .then((res) => {
      dispatch(userReceived(res.data));
      refreshToken(refresh);
    })
    .catch((error) => dispatch(userError(error.message)));
};

export const getUsers = async (token: string) => {
  await axios.get<User>(`${baseUrl}auth/users/`, {
    headers: {
      Authorization: `JWT ${token}`
    }
  })
    .then((res) => res.data)
    .catch((error) => error);
};

export const postUser = (user: UserRequestType) => async (dispatch: AppDispatch) => {
  dispatch(userLoading());
  await axios.post<User>(`${baseUrl}auth/users/`, user)
    .then((res) => dispatch(userCreated(res.data)))
    .catch((error) => dispatch(userError(error.message)));
};

export const patchUser = (user: any) => async (dispatch: AppDispatch) => {
  dispatch(userLoading());
  await axios.patch<User>(`${baseUrl}auth/users/me`, user)
    .then((res) => dispatch(userPatched(res.data)))
    .catch((error) => dispatch(userError(error.message)));
};

export const userLogIn = (user: UserLoginType) => async (dispatch: AppDispatch) => {
  await axios.post<UserTokenResponceType>(`${baseUrl}auth/jwt/create/`, user)
    .then((res) => {
      localStorage.setItem('refreshToken', JSON.stringify(res.data.refresh));
      localStorage.setItem('token', JSON.stringify(res.data.access));
      dispatch(getUser(res.data.access, res.data.refresh));
    })
    .catch((error) => error);
};

export const userLogOut = () => (dispatch: AppDispatch) => {
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('token');
  dispatch(userLoggedOut());
};

export const refreshToken = async (token: string) => {
  await axios.post(`${baseUrl}auth/jwt/refresh/`, {refresh: token})
    .then((res) => {
      localStorage.setItem('token', JSON.stringify(res.data.access));
    })
    .catch((error) => error);
};

export const verifyToken = async (token: string) => {
 return await axios.post(`${baseUrl}auth/jwt/verify/`, {token})
    .then((res) => {
      if(res.data.code && res.data.code === 'token_not_valid') {
        return false;
      } else {
        return true;
      }
    })
    .catch((error) => error);
};


