import axios from 'axios';
import { AppDispatch, baseUrl } from '../../index';
import { donationLoading, donationLoadingError, donationLinkLoaded } from './donationSlice';

export type DonationAmountType = {
  id: number
  value: number
  currency: string
}

export const makeDonation = (amount: number, currency: string) => async (dispatch: AppDispatch) => {
  dispatch(donationLoading());
  await axios.post(`${baseUrl}donation/`, {amount, currency})
    .then((res) => dispatch(donationLinkLoaded(res.data)))
    .catch((error) => dispatch(donationLoadingError(error.message)));
};

export const getAmounts = async () => {
  return await axios.get<DonationAmountType>(`${baseUrl}donation/`)
    .then(res => res.data)
};
