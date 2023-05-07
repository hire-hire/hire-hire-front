import axios from "axios";
import { AppDispatch, baseUrl } from "../..";
import { contributorsLoading, contributorsLoaded, contributorsLoadingError } from "./contributorsSlice";

export type Contributor = {
  first_name: string
  last_name: string
  middle_name: string
  photo: string
  role: string
  contacts: ContributorContact[]
};

export type ContributorContact = {
  social_network: string
  contact: string
};

export const fetchContributors = () => async (dispatch: AppDispatch) => {
  dispatch(contributorsLoading());
  await axios.get(`${baseUrl}contributors/`)
    .then((res) => dispatch(contributorsLoaded(res.data)))
    .catch((error) => dispatch(contributorsLoadingError(error.message)));
};

export const fetchContributor = async (id: number) => {
  return await axios.get<Contributor>(`${baseUrl}contributors/${id}`)
  .then(res => res.data)
  .catch(err => err);
};
