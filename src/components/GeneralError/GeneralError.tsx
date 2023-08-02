import { FC, useEffect } from 'react';

type PropsType = {
  errorText: string
  handleCloseErrorPopup: () => void
}

const GeneralError: FC<PropsType> = ({ errorText, handleCloseErrorPopup }) => {

  useEffect(() => {
    const closePopupTimer = setTimeout(() => handleCloseErrorPopup(), 3000);
    return () => clearTimeout(closePopupTimer);
  }, []);

  return (
    <div className='error'>
      <h1 className='page__title error__text'>
        {errorText}
      </h1>
    </div>
  )
};

export default GeneralError;