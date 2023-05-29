import axios from 'axios';
import { AppDispatch, baseUrl } from '../../index';
import {
  duelLoading,
  duelLoaded,
  duelLoadingError
} from './duelSlice';
import { User } from '../user/userActionCreator';

type DuelPlayerReqType = {
  name: string
}

type DuelPlayerResType = {
  id: number
  name: string
  good_answers_count: number
}

export type DuelResType = {
  id: number
  owner: User
  players: DuelPlayerResType[]
  questions: { id: number, question: { id: number, text: string } }
}

export type DuelReqType = {
  question_count: number
  players: DuelPlayerReqType[]
  language?: number
}

export const createDuel = (settings: DuelReqType, token: string) => async (dispatch: AppDispatch) => {
  dispatch(duelLoading());
  await axios.post<DuelResType>(`${baseUrl}duel/`, settings,
    {
      headers: {
        Authorization: `JWT ${token}`
      }
    }
  )
    .then((res) => {
      dispatch(duelLoaded(res.data));
    })
    .catch((error) => dispatch(duelLoadingError(error.message)));
};
