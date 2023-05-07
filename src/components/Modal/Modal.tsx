import { FC, ReactElement, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

const modal = document.querySelector('#modal');

type PropsType = {
  children: ReactElement
  isModalOpen: boolean
  handleCloseMobileMenu: () => void
};

const Modal: FC<PropsType> = ({ children, isModalOpen, handleCloseMobileMenu }) => {

  const modalContainer = useMemo(() => {
    return document.createElement('div');
  }, []);

  // modalContainer.classList.add('modal__container');

  useEffect(() => {
    if (isModalOpen) {
      modal?.appendChild(modalContainer);
      return () => {
        modal?.removeChild(modalContainer);
      }
    }
  }, [ isModalOpen, modalContainer ]);

  const handleClose = (e: any) => {
    if(e.target.classList.contains('modal__container') && !e.target.classList.contains('mobile-menu')) {
      handleCloseMobileMenu();
    } else {
      return
    }
  };

  if (isModalOpen) {
    return createPortal(
    <div onClick={handleClose} className='modal__container'>
      {children}
    </div>
    , modalContainer);
  } else {
    return null;
  };
};

export default Modal;