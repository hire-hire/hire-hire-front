import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { FC } from 'react';

type PropsType = {
  place?: string
  handleCloseMobileMenu?: () => void
};

const UserLink: FC<PropsType> = ({ place, handleCloseMobileMenu }) => {

  const user = useAppSelector(state => state.user.user);

  return (
    <>
      {
        user
          ?
          <Link onClick={handleCloseMobileMenu} to={`/profile/${user.username.toLowerCase()}`} className={`user-link page__link ${place ? 'user-link_place_header' : 'user-link_place_menu'}`} >
            <span className={`user-link__login page__text ${place ? 'user-link__login_place_header' : ''}`}>
              {user.username}
            </span>
            <span className={`user-link__role ${place ? 'user-link__role_place_header' : ''}`}>
              {user.id}
            </span>
          </ Link>
          :
          <Link onClick={handleCloseMobileMenu} to={'/login'} className={`user-link ${place ? 'user-link_place_header' : ''} page__link page__text`}>
            Вход
          </Link>
      }
    </>
  )
};

export default UserLink;