import { FC } from 'react';
import { useAppSelector } from '../../hooks/redux';
import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';
import UserLink from '../UserLink/UserLink';

type PropsType = {
  handleOpenMobileMenu: () => void
  handleOpenExitConfirm: () => void
};

const Header: FC<PropsType> = ({ handleOpenMobileMenu, handleOpenExitConfirm }) => {

  const user = useAppSelector(state => state.user.user);

  return (
    <header className='header'>
      <div className='header__content'>
        <Logo place='header' />
        <Menu />
        {
          user ?
            <div className='header__container'>
              <UserLink place='header'/>
              <button onClick={handleOpenExitConfirm} type='button' className='header__ext-button'></button>
            </div>
            :
            <UserLink place='header'/>
        }
        <button type='button' onClick={handleOpenMobileMenu} className='header__menu-btn'></button>
      </div>
    </header>
  )
};

export default Header;