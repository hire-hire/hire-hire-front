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
  const usernamePattern = '^[\da-zA-Z.@+-_]+$';
  const passwordPattern = '^.*(?=.{8,40})(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z0-9!#$%&?].*$';

  const user = useAppSelector(state => state.user);

  useEffect(() => {
    if(user.user) {
      navigate(`/profile/${user.user.username.toLowerCase()}`);
    }
    if(user.error) {
      const errKeys = Object.keys(user.error);
      const errObj: any = {};
      errKeys.forEach((key) => {
        errObj[key] = user.error[key][0];
      });
      resetForm(
        {
          ...values
        },
        {
          ...errObj
        },
        false
      )
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

  const usernameErrorMessage = errors.username === 'Введите данные в указанном формате.' ? 'Логин не отвечает требованиям' : errors.username;

  const passwordErrorMessage = errors.password === 'Введите данные в указанном формате.' ? 'Пароль не отвечает требованиям' : errors.password;

  return (
    <section className='register'>
      <Form type='register' onSubmit={handleSubmit} title='Регистрация'>
        <Label title='Логин'>
          <LabelContainer hint='От 2 до 25 символов, только латинские буквы, только арабские цифры, нижнее подчеркивание, точка, запятая, +,-, без пробелов'>
            <Input
              type='text'
              name='username'
              error={usernameErrorMessage}
              value={values.username || ''}
              handleChange={handleChangeValidation}
              maxLength={25}
              minLength={2}
              pattern={usernamePattern} />
          </LabelContainer>
          <InputError error={usernameErrorMessage} />
        </Label>
        <Label title='Придумай пароль'>
          <LabelContainer hint={`От 8 до 40 символов, только латинские буквы, как минимум одна заглавная или строчная буква, как минимум одна цифра, только арабские цифры, без пробелов, другие допустимые символы - ~ ! ? @ # $ % ^ & * _ - + ( ) [ ] { } > < / \ | " ' . , : ;')`}>
            <Input
              type='password'
              name='password'
              error={passwordErrorMessage}
              value={values.password || ''}
              handleChange={handleChangeValidation}
              pattern={passwordPattern}
              maxLength={40}
              minLength={8}
              inputRef={passwordRef} />
          </LabelContainer>
          <InputError error={passwordErrorMessage} />
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
        <p className='register__text page__text'>Все поля обязательны для заполнения</p>
      </Form>
    </section>
  )
};

export default RegisterForm;