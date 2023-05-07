import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

type PropsType = {
  isLoggedIn: boolean
  children: ReactElement
}

const ProtectedRoute: FC<PropsType> = ({isLoggedIn, children}) => {
  return (
    isLoggedIn ? children : <Navigate to='/login' />
  );
};

export default ProtectedRoute;