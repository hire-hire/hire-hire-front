import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { userLogOut } from '../../store/reducers/user/userActionCreator';

const Profile = () => {

  const user = useAppSelector(state => state.user.user); 

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(userLogOut());
    navigate('/');
  };

  return (
    <section className='profile sections'>
      <h1 className='profile__title page__title'>
        <span className='page__span'>Личный</span> кабинет
      </h1>
    </section>
  )
};

export default Profile;