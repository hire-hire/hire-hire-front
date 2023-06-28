import { FC, ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import UserLink from "../UserLink/UserLink";
import { useAppSelector } from "hooks/redux";

type PropsType = {
  children: ReactElement
  handleCloseMobileMenu: () => void
  handleOpenExitConfirm: () => void
};

const MobileMenu: FC<PropsType> = ({ children, handleCloseMobileMenu, handleOpenExitConfirm }) => {

  const user = useAppSelector(state => state.user.user);

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: any) => {
    if (e.targetTouches[0].clientX) {
      setTouchStart(e.targetTouches[0].clientX);
    }
  };

  const handleTouchMove = (e: any) => {
    if (e.targetTouches[0].clientX) {
      setTouchEnd(e.targetTouches[0].clientX);
      if (touchStart - touchEnd < -100) {
        handleCloseMobileMenu();
      }
    }
  };

  const handleCloseMenu = () => {
    handleCloseMobileMenu();
  };

  const handleConfirmOpen = () => {
    handleCloseMenu();
    handleOpenExitConfirm();
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className='mobile-menu'>
      {children}
      <nav className='mobile-menu__container'>
        <ul className='mobile-menu__items page__list'>
          <li className='mobile-menu__item'>
            <Link onClick={handleCloseMenu} to='/donation' className='mobile-menu__link page__link page__text'>
              ЗаДонать
            </Link>
          </li>
          <li className='mobile-menu__item'>
            <Link onClick={handleCloseMenu} to='/suggest-question' className='mobile-menu__link page__link page__text'>
              Предложить вопрос
            </Link>
          </li>
          <li className='mobile-menu__item'>
            <Link onClick={handleCloseMenu} to='/team' className='mobile-menu__link page__link page__text'>
              Команда
            </Link>
          </li>
        </ul>
      </nav>
      <button onClick={handleCloseMenu} type='button' className='mobile-menu__button'></button>
      <UserLink handleCloseMobileMenu={handleCloseMobileMenu} />
      {
        user
          ?
          <button onClick={handleConfirmOpen} type='button' className='mobile-menu__ext-button'>
          </button>
          : null
      }
    </div>
  )
};

export default MobileMenu;