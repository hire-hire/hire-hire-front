import { FC, ReactElement } from 'react';
import helpImage from '../../images/help-circle.png';

type PropsType = {
  children: ReactElement
  hint: string
  position?: string
}

const LabelContainer: FC<PropsType> = ({ children, hint, position }) => {
  return (
    <div className='label-container'>
      {children}
      <div className='label-container__hint'>
        <img src={helpImage} alt='Подсказка' className='label-container__image' />
        <span className={`label-container__info ${position === 'games' ? 'label-container__info_position_games' : ''} page__text`}>
          {hint}
        </span>
      </div>
    </div>
  )
};

export default LabelContainer;