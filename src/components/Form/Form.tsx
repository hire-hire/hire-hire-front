import { FC, ReactElement } from 'react';

type PropsType = {
  children?: ReactElement[]
  title: string
  type: string
  onSubmit: (param: any) => void
}

const Form: FC<PropsType> = ({children, title, onSubmit, type}) => {
  return (
    <form onSubmit={onSubmit} className={`form form_type_${type}`} name={`${type}-form`} noValidate>
      <h2 className='form__title page__title'>{title}</h2>
      { children }
    </form>
  )
};

export default Form;