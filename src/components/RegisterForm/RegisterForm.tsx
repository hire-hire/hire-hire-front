import { ChangeEvent, FormEvent, useRef } from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import Form from '../Form/Form';
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
      navigate('/login');
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
          <LabelContainer hint='прописные и строчные латинские буквы, цифры, нижнее подчеркивание, точка, запятая, +,-, без пробелов и иных символов, min количество символов - 2, max - 25'>
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
          <LabelContainer hint='прописные и строчные латинские буквы, символов min 8, max 40, цифры (но не должен состоять из одних цифр), спецсимволы. Логин и пароль не должны совпадать.'>
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
              maxLength={128}
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