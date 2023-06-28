import { FC, ReactElement } from 'react';

type PropsType = {
  title?: string
  children: ReactElement | ReactElement[]
  position?: string
}

const Label: FC<PropsType> = ({ title, children, position }) => {

  return (
    <label
      className={`form__label ${position === 'games' ? 'form__label_position_games' : position === 'donation' ? 'form__label_position_donation' : ''} page__text`}>
      {title}
      {children}
    </label>
  )
};

export default Label;