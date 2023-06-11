import axios from 'axios';
import { AppDispatch, baseUrl } from '../..';
import { 
  suggestQuestionLoading, 
  suggestQuestionLoaded, 
  suggestQuestionLoadingError } from './suggestQuestionSlice';

export type QuestionReqType = {
  text: string
  answer: string
  language: number
}

export type QuestionResType = {
  id: number
  extra_data: {
    add_question_for24_count: number, 
    limit_add_questions_per_day: number
  }
  text: string
  answer: string
  ip_address: string
  pub_date: string
  status: string
  user_cookie_id: string
  language: number
  author: number
}

export const postQuestion = (question: QuestionReqType) => async (dispatch: AppDispatch) => {
  dispatch(suggestQuestionLoading());
  await axios.post(`${baseUrl}add_question/`, question)
    .then((res) => dispatch(suggestQuestionLoaded(res.data)))
    .catch((error) => dispatch(suggestQuestionLoadingError(error.message)));
};
