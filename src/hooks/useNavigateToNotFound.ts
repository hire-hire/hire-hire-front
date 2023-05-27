import {useNavigate} from 'react-router-dom';

const useNavigateToNotFound = (): (() => void) => {
  const navigate = useNavigate();
  return (): void => {
      navigate('/404');
  };
};

export default useNavigateToNotFound;