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
      <h1 className='profile__title sections__main-title'>
        Личный кабинет
      </h1>
      <p className="page__text">
        Username: {user?.username}
      </p>
      <p className="page__text">
        Id: {user?.id}
      </p>
      <button onClick={handleLogOut} className='profile__exit-button page__text'>
        Выйти
      </button>
    </section>
  )
};

export default Profile;