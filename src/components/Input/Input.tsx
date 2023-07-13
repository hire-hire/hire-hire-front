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
  min?: number
  handleKeyPress?: (e: any) => any
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
  handleFocus,
  min,
  handleKeyPress }) => {

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
      min={min}
      onKeyDown={handleKeyPress}
    />
  )
};

export default Input;