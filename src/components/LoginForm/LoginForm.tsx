import { FormEvent, useEffect } from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import Form from '../Form/Form';
import FormLink from '../FormLink/FormLink';
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton';
import Input from '../Input/Input';
import InputError from '../InputError/InputError';
import Label from '../Label/Label';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { userLogIn } from '../../store/reducers/user/userActionCreator';

const LoginForm = () => {

  const { values, handleChange, isFormValid, resetForm, errors } = useFormWithValidation();

  const userName = useAppSelector(state => state.user.user?.username);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if(userName) {
      resetForm({...values, userName}, errors, false);
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      username: values.username,
      password: values.password
    };
    dispatch(userLogIn(user));
    navigate('/');
  };

  return (
    <Form onSubmit={handleSubmit} title='Вход'>
      <Label title='Юзернейм'>
        <Input
          type='text'
          name='username'
          error={errors.username}
          value={values.username || ''}
          handleChange={handleChange}
          maxLength={150}
          minLength={1} />
        <InputError error={errors.username} />
      </Label>
      <Label title='Пароль'>
        <Input
          type='password'
          name='password'
          error={errors.password}
          value={values.password || ''}
          handleChange={handleChange}
          maxLength={128}
          minLength={8} />
        <InputError error={errors.password} />
      </Label>
      <FormSubmitButton title='Войти' disabled={!isFormValid} />
      <p className='login-form__hint page__text'>В первый раз здесь?</p>
      <FormLink path='/register' title='Зарегистрироваться' />
    </Form>
  )
};

export default LoginForm;