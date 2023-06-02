import { FormEvent, useEffect } from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import Form from '../Form/Form';
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton';
import Input from '../Input/Input';
import InputError from '../InputError/InputError';
import Label from '../Label/Label';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogIn } from '../../store/reducers/user/userActionCreator';

const LoginForm = () => {

  const { values, handleChange, isFormValid, errors, resetForm } = useFormWithValidation();

  const user = useAppSelector(state => state.user);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  

  useEffect(() => {
    if (user.user) {
      navigate(`/profile/${user.user.username.toLowerCase()}`)
    }
    if (user.error) {
      resetForm(
        { ...values },
        {
          username: 'Неверный логин или пароль',
          password: 'Неверный логин или пароль'
        },
        false
      );
    }
  }, [user]);
  

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      username: values.username,
      password: values.password
    };
    dispatch(userLogIn(user));
  };

  return (
    <section className='login'>
      <Form type='auth' onSubmit={handleSubmit} title='Войти'>
        <Label title='Логин'>
          <Input
            type='text'
            name='username'
            error={errors.username}
            value={values.username || ''}
            handleChange={handleChange}
            maxLength={25}
            minLength={2} />
          <InputError error={errors.username} />
        </Label>
        <Label title='Пароль'>
          <Input
            type='password'
            name='password'
            error={errors.password}
            value={values.password || ''}
            handleChange={handleChange}
            maxLength={40}
            minLength={8} />
          <InputError error={errors.password} />
        </Label>
        <FormSubmitButton title='Войти' disabled={!isFormValid} />
        <p className='login__text page__title'>
          В <span className='page__span'>первый раз</span> здесь?
        </p>
        <Link to='/register' className='login__link sections__link'>Зарегистрироваться</Link>
      </Form>
    </section>
  )
};

export default LoginForm;