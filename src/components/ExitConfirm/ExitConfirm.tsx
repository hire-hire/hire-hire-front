import { useAppDispatch } from 'hooks/redux';
import { FC } from 'react';
import { userLogOut } from 'store/reducers/user/userActionCreator';

type PropsType = {
  handleCloseExitConfirm: () => void
};

const ExitConfirm: FC<PropsType> = ({ handleCloseExitConfirm }) => {

  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(userLogOut());
    handleCloseExitConfirm();
  };

  return (
    <div className='exit-confirm'>
      <h1 className='exit-confirm__title page__title'>
        Вы <span className='page__span'>уверены</span>, что хотите выйти?
      </h1>
      <div className='exit-confirm__buttons'>
        <button onClick={handleCloseExitConfirm} type='button' className='exit-confirm__button exit-confirm__title_type_white sections__link'>
          Остаться
        </button>
        <button onClick={handleLogOut} type='button' className='exit-confirm__button sections__link'>
          Выйти
        </button>
      </div>
    </div>
  )
};

export default ExitConfirm;