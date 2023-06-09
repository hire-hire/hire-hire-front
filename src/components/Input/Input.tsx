import { ChangeEvent, FC } from 'react';

type PropsType = {
  type: string
  error?: string
  name: string
  placeholder?: string
  value?: string | number
  handleChange?: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void
  minLength?: number
  maxLength?: number
  pattern?: string
  inputRef?: any
  step?: string
  handleFocus?: () => void
}

const Input: FC<PropsType> = ({
  step,
  inputRef,
  type,
  error,
  name,
  placeholder,
  value,
  handleChange,
  minLength,
  maxLength,
  pattern,
  handleFocus }) => {

  return (
    <input
      onFocus={handleFocus}
      ref={inputRef}
      placeholder={placeholder}
      type={type}
      className={`input page__text ${error ? 'input_type_error' : ''} ${step ? 'input_type_donation' : ''}`}
      name={name}
      id={name}
      value={value}
      onChange={handleChange}
      minLength={minLength}
      maxLength={maxLength}
      pattern={pattern}
      required
      step={step}
    />
  )
};

export default Input;