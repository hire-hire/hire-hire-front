import { ChangeEvent, FC } from 'react';

type PropsType = {
  type: string
  error: string
  name: string
  placeholder?: string
  value: string
  handleChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void
  minLength?: number
  maxLength?: number
  pattern?: string
  inputRef?: any
}

const Input: FC<PropsType> = ({ inputRef, type, error, name, placeholder, value, handleChange, minLength, maxLength, pattern }) => {
  return (
    <input
      ref={inputRef}
      placeholder={placeholder}
      type={type}
      className={`input page__text ${error ? 'input_type_error' : ''}`}
      name={name}
      id={name}
      value={value}
      onChange={handleChange}
      minLength={minLength}
      maxLength={maxLength}
      pattern={pattern} required />
  )
};

export default Input;