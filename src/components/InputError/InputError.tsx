import { FC } from 'react';

type PropsType = {
  error: string
}

const InputError: FC<PropsType> = ({error}) => {
  return (
    <span className={`input__error page__text ${error ? 'input__error_type_visible' : ''}`}>
      {error}
    </span>
  )
};

export default InputError;