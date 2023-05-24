import { ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import Form from '../Form/Form';
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton';
import Input from '../Input/Input';
import InputError from '../InputError/InputError';
import Label from '../Label/Label';
import LabelContainer from '../LabelContainer/LabelContainer';
import { postUser } from '../../store/reducers/user/userActionCreator';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const RegisterForm = () => {

  const { values, handleChange, isFormValid, resetForm, errors } = useFormWithValidation();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const emailPattern = '\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*\\.\\w{2,4}';
  const usernamePattern = '^[\\w.@+-]+$';
  const passwordPattern = '\(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}';

  const user = useAppSelector(state => state.user.user);

  useEffect(() => {
    if(user) {
      navigate(`/profile/${user.username.toLowerCase()}`);
    }
  }, [ user ]);

  const passwordRef: any = useRef();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.password !== values.repeatPassword) {
      resetForm(values, { ...errors, repeatPassword: 'Пароли не совпадают' }, false);
    } else {
      const newUser = {
        username: values.username,
        password: values.password
      };
      dispatch(postUser(newUser));
    }
  };

  const handleChangeValidation = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    handleChange(e);
    if (values.username && values.password && values.username.length === values.password.length && values.username === values.password) {
      resetForm({ ...values, password: '', repeatPassword: '' }, { ...errors, password: 'Логин и пароль не должны совпадать', repeatPassword: '' }, false);
      passwordRef.current.focus();
    }
    if (values.password && values.repeatPassword && values.password.length === values.repeatPassword.length && values.password !== values.repeatPassword) {
      resetForm({ ...values, repeatPassword: '', password: '' }, { ...errors, repeatPassword: 'Пароли не совпадают' }, false);
    }
  };

  return (
    <section className='register'>
      <Form type='register' onSubmit={handleSubmit} title='Регистрация'>
        <Label title='Логин'>
          <LabelContainer hint='От 2 до 25 символов, только латинские буквы, только арабские цифры, нижнее подчеркивание, точка, запятая, +,-, без пробелов'>
            <Input
              type='text'
              name='username'
              error={errors.username}
              value={values.username || ''}
              handleChange={handleChangeValidation}
              maxLength={25}
              minLength={2}
              pattern={usernamePattern} />
          </LabelContainer>
          <InputError error={errors.username} />
        </Label>
        <Label title='Придумай пароль'>
          <LabelContainer hint={`От 8 до 40 символов, только латинские буквы, как минимум одна заглавная или строчная буква, как минимум одна цифра, только арабские цифры, без пробелов, другие допустимые символы - ~ ! ? @ # $ % ^ & * _ - + ( ) [ ] { } > < / \ | " ' . , : ;')`}>
            <Input
              type='password'
              name='password'
              error={errors.password}
              value={values.password || ''}
              handleChange={handleChangeValidation}
              pattern={passwordPattern}
              maxLength={40}
              minLength={8}
              inputRef={passwordRef} />
          </LabelContainer>
          <InputError error={errors.password} />
        </Label>
        <Label title='Повтори пароль'>
          <LabelContainer hint='повтори пароль введеный выше'>
            <Input
              type='password'
              name='repeatPassword'
              error={errors.repeatPassword}
              value={values.repeatPassword || ''}
              handleChange={handleChangeValidation}
              pattern={passwordPattern}
              maxLength={40}
              minLength={8} />
          </LabelContainer>
          <InputError error={errors.repeatPassword} />
        </Label>
        <FormSubmitButton title='Зарегистрироваться' disabled={!isFormValid} />
      </Form>
    </section>
  )
};

export default RegisterForm;