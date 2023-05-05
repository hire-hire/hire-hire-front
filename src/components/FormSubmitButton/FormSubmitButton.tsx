import { FC } from 'react';

type PropsType = {
  title: string
  disabled: boolean
}

const FormSubmitButton: FC<PropsType> = ({ title, disabled }) => {
  return (
    <button type="submit" className={`submitButton page__text ${disabled ? 'submitButton_type_disabled' : ''}`} value={ title } aria-label="Кнопка отправки формы" disabled={ disabled }>{ title }</button>
  )
};

export default FormSubmitButton;