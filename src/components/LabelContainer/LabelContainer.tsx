import { FC, ReactElement } from 'react';
import helpImage from '../../images/help-circle.png';

type PropsType = {
  children: ReactElement
  hint: string
}

const LabelContainer: FC<PropsType> = ({ children, hint }) => {
  return (
    <div className='label-container'>
      {children}
      <div className='label-container__hint'>
        <img src={helpImage} alt='Подсказка' className='label-container__image' />
        <span className='label-container__info page__text'>
          {hint}
        </span>
      </div>
    </div>
  )
};

export default LabelContainer;