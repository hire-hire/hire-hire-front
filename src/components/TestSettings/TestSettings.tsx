import { FormEvent, useEffect } from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { createInterview } from '../../store/reducers/interview/interviewActionCreator';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import testSettingsImage from '../../images/testSettingsImage.png';

const TestSettings = () => {

  const { values, resetForm, errors, isFormValid, handleChange } = useFormWithValidation();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { categoryTitle, languageTitle } = useParams();

  const currentCategoryFromLS = JSON.parse(localStorage.getItem('currentCategory')!);

  useEffect(() => {
    if (!currentCategoryFromLS.languages.find((language: any) => language.title.toLowerCase() === languageTitle)) {
      navigate('/404');
      return
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('token')!);
    if (!token) {
      return
    } else {
      dispatch(createInterview(values.questionsCount, token));
      resetForm(undefined, undefined, true);
      navigate(`/${categoryTitle}/${languageTitle}/interview`);
    }
  };

  return (
    <>
      <section className='test-settings sections'>
        <h1 className='test-settings__title page__title'>
          Пройти <span className='page__span'>собеседование</span>
        </h1>
        <div className='test-settings__content'>
          <form onSubmit={handleSubmit} className='test-settings-form'>
            <h3 className='test-settings-form__subtitle page__text'>
              Направление: <span className='test-settings-form__span'>{`${languageTitle!.charAt(0).toUpperCase()}${languageTitle?.slice(1)}`}</span>
            </h3>
            <p className='test-settings-form__hint page__text'>
              Выбери количество вопросов для собеседования и приступай к испытанию.
            </p>
            <label className='test-settings-form__label page__text'>
              Уровень сложности
              <select onChange={handleChange} value={values.level} disabled name='level' className='test-settings-form__select page__text'>
                <option value='Junior'>Junior</option>
                <option value='Middle'>Middle</option>
                <option value='Senior'>Senior</option>
              </select>
            </label>
            <label className='test-settings-form__label page__text'>
              Количество вопросов
              <select onChange={handleChange} value={values.questionsCount} name='questionsCount' className='test-settings-form__select page__text' defaultValue={'DEFAULT'}>
                <option disabled value='DEFAULT'>Выберите кол-во вопросов</option>
                <option value='10'>10 вопросов</option>
                <option value='20'>20 вопросов</option>
                <option value='30'>30 вопросов</option>
              </select>
            </label>
            <button disabled={!isFormValid} type='submit' className={`test-settings__button ${isFormValid ? '' : 'test-settings__button_type_disabled'} sections__link`}>Далее</button>
          </form>
          <img src={testSettingsImage} alt='Картиночка' className='test-settings__image' />
        </div>
      </section>
    </>
  )
};

export default TestSettings;