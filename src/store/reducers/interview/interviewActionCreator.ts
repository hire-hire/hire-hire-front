import axios from 'axios';
import { AppDispatch, baseUrl } from '../../index';
import { interviewLoading, interviewLoaded, interviewLoadingError } from './interviewSlice';

export type Question = {
  id: number
  text: string
};

export type InterviewType = {
  id: number
  questions: Question[]
};

export type Answer = {
  answer: string
};

export const createInterview = (questionsCount: string, token: string) => async (dispatch: AppDispatch) => {
  dispatch(interviewLoading());
  await axios.post<InterviewType>(`${baseUrl}interview/`, 
  {
    question_count: questionsCount
  },
  {
    headers: {
      Authorization: `JWT ${token}`
    }
  }
  )
    .then((res) => {
      dispatch(interviewLoaded(res.data));
      localStorage.setItem('currentInterview', JSON.stringify(res.data));
    })
    .catch((error) => dispatch(interviewLoadingError(error.message)));
};

export const fetchInterview = async (id: string, token: string) => {
  return await axios.get<InterviewType>(`${baseUrl}interview/${id}/`, {
    headers: {
      Authorization: `JWT ${token}`
    }
  })
  .then(res => res.data)
};

export const fetchAnswer = async (id: number, token: string) => {
  return await axios.get<Answer>(`${baseUrl}question/${id}/`, 
  {
    headers: {
      Authorization: `JWT ${token}`
    }
  })
  .then(res => res.data)
  .catch(err => err);
};
