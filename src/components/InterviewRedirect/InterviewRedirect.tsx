import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux';
import Preloader from '../Preloader/Preloader';
import { useNavigate, useParams } from 'react-router-dom';

const InterviewRedirect = () => {
  const interviewId = useAppSelector(state => state.interview.interview?.id);
  const navigate = useNavigate();
  const { categoryTitle, languageTitle } = useParams();

  useEffect(() => {
    setTimeout(() => {
      navigate(`/${categoryTitle}/${languageTitle}/interview/${interviewId}`);
    }, 500);
  }, [ interviewId ]);

  return <Preloader />
};

export default InterviewRedirect;