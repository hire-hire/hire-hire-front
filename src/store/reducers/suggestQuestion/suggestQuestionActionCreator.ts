import axios from 'axios';
import { AppDispatch, baseUrl } from '../..';
import {
  suggestQuestionLoading,
  suggestQuestionLoaded,
  suggestQuestionLoadingError
} from './suggestQuestionSlice';

export type QuestionReqType = {
  text: string
  answer: string
  language: number
}

export type QuestionResType = {
  add_questions_for24_count: number
  limit_add_questions_per_day: number
}

export const postQuestion = (questions: QuestionReqType[]) => async (dispatch: AppDispatch) => {
  dispatch(suggestQuestionLoading)
  await axios.post(`${baseUrl}add_question/`,
    questions,
    {withCredentials: true,})
    .catch((error) => dispatch(suggestQuestionLoadingError(error.message)));
};

export const checkQuestionsLimit = () => async (dispatch: AppDispatch) => {
  dispatch(suggestQuestionLoading)
  await axios.get(`${baseUrl}added_questions_and_limit`,
    {withCredentials: true,})
    .then((res) => dispatch(suggestQuestionLoaded(res.data)))
    .catch((error) => dispatch(suggestQuestionLoadingError(error.message)));
};
