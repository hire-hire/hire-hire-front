import { FormEvent } from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import Form from '../Form/Form';
import FormLink from '../FormLink/FormLink';
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton';
import Input from '../Input/Input';
import InputError from '../InputError/InputError';
import Label from '../Label/Label';
import LabelContainer from '../LabelContainer/LabelContainer';
import { postUser } from '../../store/reducers/user/userActionCreator';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';

const RegisterForm = () => {

  const { values, handleChange, isFormValid, resetForm, errors } = useFormWithValidation();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const emailPattern = '\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*\\.\\w{2,4}';
  const usernamePattern = '^[\\w.@+-]+$';
  const passwordPattern = '\(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}';

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
      navigate('/login');
    }
  };

  return (
    <Form onSubmit={handleSubmit} title='Регистрация'>
      <Label title='Юзернейм'>
        <LabelContainer hint='Придумайте юзернейм'>
          <Input
            type='text'
            name='username'
            error={errors.username}
            value={values.username || ''}
            handleChange={handleChange}
            maxLength={150}
            minLength={1}
            pattern={usernamePattern} />
        </LabelContainer>
        <InputError error={errors.username} />
      </Label>
      <Label title='Придумайте пароль'>
        <LabelContainer hint='Пароль должен содержать 8 символов и иметь хотя бы 1 цифру и 1 заглавную букву'>
          <Input
            type='password'
            name='password'
            error={errors.password}
            value={values.password || ''}
            handleChange={handleChange}
            pattern={passwordPattern}
            maxLength={128}
            minLength={8} />
        </LabelContainer>
        <InputError error={errors.password} />
      </Label>
      <Label title='Повторите пароль'>
        <LabelContainer hint='Повторите пароль введеный выше'>
          <Input
            type='password'
            name='repeatPassword'
            error={errors.repeatPassword}
            value={values.repeatPassword || ''}
            handleChange={handleChange}
            pattern={passwordPattern}
            maxLength={128}
            minLength={8} />
        </LabelContainer>
        <InputError error={errors.repeatPassword} />
      </Label>
      <FormSubmitButton title='Зарегистрироваться' disabled={!isFormValid} />
      <p className='login-form__hint page__text'>Уже есть аккаунт?</p>
      <FormLink path='/login' title='Войти' />
    </Form>
  )
};

export default RegisterForm;