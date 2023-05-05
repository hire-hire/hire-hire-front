import axios, { AxiosResponse } from "axios";
import { AppDispatch, baseUrl } from "../..";
import { categoriesLoading, categoriesLoaded, categoriesLoadingError, categoryLoaded } from "./categoriesSlice";

export type Category = {
  id: number
  title: string
  icon: string
};

export type SubCategory = {
  id: number
  title: string
  icon: string
  category: number
};

export type ExtendedCategory = {
  id: number
  languages: SubCategory[]
  title: string
  icon: string
};

export const fetchCategories = () => async (dispatch: AppDispatch) => {
  dispatch(categoriesLoading());
  await axios.get(`${baseUrl}category/`)
    .then((res) => {
      dispatch(categoriesLoaded(res.data));
      localStorage.setItem('categories', JSON.stringify(res.data));
    })
    .catch((error) => dispatch(categoriesLoadingError(error.message)));
};

export const fetchCategory = (id: number | undefined) => async (dispatch: AppDispatch) => {
  dispatch(categoriesLoading());
  await axios.get<ExtendedCategory>(`${baseUrl}category/${id}/`)
    .then((res: AxiosResponse) => {
      dispatch(categoryLoaded(res.data));
      localStorage.setItem('currentCategory', JSON.stringify(res.data));
    })
    .catch((error) => dispatch(categoriesLoadingError(error.message)));
};





