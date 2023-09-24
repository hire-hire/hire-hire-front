import React, { ChangeEvent } from 'react';

export interface SuggestFormTextAreaProps {
  id: string;
  title: string;
  errors: string;
  value: string;
  placeholder: string;
  name: string;
  minLen: number;
  maxLen: number;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const SuggestFormTextArea: React.FC<SuggestFormTextAreaProps> = ({
  title,
  id,
  errors,
  disabled,
  value,
  placeholder,
  onChange,
  name,
  minLen,
  maxLen,
}) => {
  return (
    <fieldset className='suggest-form__field page__title'>
      <div className='suggest-form__label-container'>
        <label htmlFor={id}>{title}</label>
        <span
          className={`suggest-form__label-error page__text ${
            errors ? 'suggest-form__label-error_type_visible' : ''
          }`}
        >
          {`(${errors})`}
        </span>
      </div>
      <textarea
        id={id}
        required
        disabled={disabled}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        className={`suggest-form__area page__text ${
          errors ? 'suggest-form__area_type_error' : ''
        }`}
        minLength={minLen}
        maxLength={maxLen}
      />
      <p className='suggest-form__area-hint page__text'>
      {value ? value.length : 0}/{`${maxLen.toString().charAt(0)}-${maxLen.toString().slice(1)}`}

      </p>
    </fieldset>
  );
};

export default SuggestFormTextArea;
