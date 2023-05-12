import { FC, ReactElement } from 'react';

type PropsType = {
  title: string
  children: ReactElement | ReactElement[]
}

const Label:FC<PropsType> = ({ title, children }) => {
  return (
    <label className='form__label page__text'>
      { title }
      { children }
    </label>
  )
};

export default Label;