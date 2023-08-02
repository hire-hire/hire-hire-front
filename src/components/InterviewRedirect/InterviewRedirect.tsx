import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Preloader from '../Preloader/Preloader';
import { useNavigate, useParams } from 'react-router-dom';
import { interviewReset } from '../../store/reducers/interview/interviewSlice';

const InterviewRedirect = () => {
  const interviewId = useAppSelector(state => state.interview.interview?.id);
  const navigate = useNavigate();
  const { categoryTitle, languageTitle } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.removeItem('rightAnswers');
    localStorage.removeItem('wrongAnswers');
    const redirectDelay = setTimeout(() => {
      navigate(`/${categoryTitle}/${languageTitle}/interview/${interviewId}`);
      dispatch(interviewReset);
    }, 1000);
    return () => clearTimeout(redirectDelay);
  }, [interviewId]);

  return <Preloader />
};

export default InterviewRedirect;