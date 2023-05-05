import { FC, FormEventHandler, ReactElement } from 'react';

type PropsType = {
  children?: ReactElement[]
  title: string
  onSubmit: (param: any) => void
}

const Form: FC<PropsType> = ({children, title, onSubmit}) => {
  return (
    <form onSubmit={onSubmit} className='form form_type_auth' name='auth-form' noValidate>
      <h2 className='form__title sections__secondary-title'>{title}</h2>
      { children }
    </form>
  )
};

export default Form;