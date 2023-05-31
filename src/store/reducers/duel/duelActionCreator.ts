import axios from 'axios';
import { AppDispatch, baseUrl } from '../../index';
import {
  duelLoading,
  duelLoaded,
  duelLoadingError,
  duelPatched
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
  questions: QuestionType[]
  wrong_answers_count: number
}

export type DuelReqType = {
  question_count: number
  players: DuelPlayerReqType[]
  language?: number
}

type QuestionType = {
  id: number
  question: { id: number, text: string }
}

type DuelPatchReqType = {
  winner_id: number
  question_id: number
}

export type DuelPatchResType = {
  players: DuelPlayerResType[]
  wrong_answers_count: number
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

export const getDuel = (duelId: string, token: string) => async (dispatch: AppDispatch) => {
  dispatch(duelLoading());
  await axios.get<DuelResType>(`${baseUrl}duel/${duelId}`,
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

export const patchDuel = (duelId: string, token: string, settings: DuelPatchReqType) => async (dispatch: AppDispatch) => {
  dispatch(duelLoading());
  await axios.patch<DuelPatchResType>(`${baseUrl}duel/${duelId}/`, settings,
    {
      headers: {
        Authorization: `JWT ${token}`
      }
    }
  )
    .then((res) => {
      dispatch(duelPatched(res.data));
    })
    .catch((error) => dispatch(duelLoadingError(error.message)));
};

