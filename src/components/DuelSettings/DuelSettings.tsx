import { ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Label from '../Label/Label';
import LabelContainer from '../LabelContainer/LabelContainer';
import Input from '../Input/Input';
import InputError from '../InputError/InputError';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { fetchCategories, fetchCategory } from '../../store/reducers/categories/categoriesActionCreator';
import { DuelReqType, createDuel } from '../../store/reducers/duel/duelActionCreator';
import Preloader from '../Preloader/Preloader';
import { duelReset } from '../../store/reducers/duel/duelSlice';
import { Navigate, useNavigate } from 'react-router-dom';

const DuelSettings = () => {

  const categories = useAppSelector(state => state.categories.categories);
  const category = useAppSelector(state => state.categories.category);
  const duel = useAppSelector(state => state.duel);
  const user = useAppSelector(state => state.user);

  const token = JSON.parse(localStorage.getItem('token')!);
  const isModerator = localStorage.getItem('key') ? true : false;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { 
    values, 
    handleChange, 
    isFormValid, 
    errors } = useFormWithValidation();

  const handleSelectCategory = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    handleChange(e);
    if (e.target.value) {
      const selectedCategory = categories.find(category => category.title === e.target.value);
      dispatch(fetchCategory(selectedCategory?.id));
    } else {
      return
    }
  };

  const playersNamesRegExp = '^[а-яА-ЯёЁa-zA-Z0-9\\s\\-]*$';

  const handleSubmit = (e: any) => {
    e.preventDefault();

    let settings: DuelReqType = {
      question_count: values.questionsCount,
      players: [
        {
          name: values.player1
        },
        {
          name: values.player2
        }
      ],
    }

    if (values.subcategory !== 'all') {
      settings.language = values.subcategory;
    };

    dispatch(createDuel(settings, token));
    localStorage.setItem('duelCategory', JSON.stringify(category));
    localStorage.setItem('duelSubCategory', JSON.stringify(values.subcategory));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchCategories());
    if (duel.duel) {
      navigate(`/games/${duel.duel?.id}`)
    }
    return () => {
      dispatch(duelReset());
    }
  }, [duel.duel]);

  return (
    (!user.user && isModerator) || user.isLoading
      ?
      <Preloader />
      :
      user.user?.is_duel_moderator
        ?
        <section className='duel-settings sections'>
          <h1 className='duel-settings__title page__title'>
            Голодные <span className='page__span'>игры</span>
          </h1>
          {
            duel.isLoading
              ?
              <Preloader />
              :
              <form onSubmit={handleSubmit} className='duel-settings__form' noValidate>
                <h2 className='duel-settings__top-title page__title'>
                  Категория <span className='page__span'>и</span> направление
                </h2>
                <div className='duel-settings__container duel-settings__header'>
                  <label className='duel-settings__label page__text'>
                    Категория
                    <select
                      onChange={handleSelectCategory}
                      value={values.category || undefined}
                      name='category'
                      id='category'
                      className={`duel-settings__select duel-settings__category ${errors.category ? 'duel-settings__select_type_error' : ''}`}
                      required>
                      <option value=''>Выберите категорию</option>
                      {
                        categories.map((category) => {
                          return <option key={category.id} value={category.title}>{category.title}</option>
                        })
                      }
                    </select>
                    <span className={`duel-settings__error ${errors.category ? 'duel__error_type_visible' : ''}`}>{errors.category}</span>
                  </label>
                  <label className='duel-settings__label duel-settings__item_justify_right page__text'>
                    Направление
                    <select
                      onChange={handleChange}
                      name='subcategory'
                      id='subcategory'
                      className={`duel-settings__select duel-settings__subcategory ${errors.subcategory ? 'duel-settings__select_type_error' : ''}`}
                      value={values.subcategory || undefined}
                      disabled={!values.category}
                      required>
                      <option value=''>Выберите подкатегорию</option>
                      {
                        category
                          ?
                          category.languages.map((language) => {
                            return <option key={language.id} value={language.id}>{language.title}</option>
                          })
                          :
                          null
                      }
                      <option value='all'>Все направления</option>
                    </select>
                    <span className={`duel-settings__error ${errors.subcategory ? 'duel__error_type_visible' : ''}`}>{errors.subcategory}</span>
                  </label>
                  <label className='duel-settings__label page__text'>
                    Количество вопросов
                    <select
                      onChange={handleChange}
                      name='questionsCount'
                      id='questionsCount'
                      className={`duel-settings__select duel-settings__questions ${errors.questionsCount ? 'duel-settings__select_type_error' : ''}`}
                      required
                      value={values.questionsCount || undefined}>
                      <option value=''>Выберите кол-во вопросов</option>
                      <option value={10}>10 вопросов</option>
                      <option value={20}>20 вопросов</option>
                      <option value={30}>30 вопросов</option>
                    </select>
                    <span className={`duel-settings__error ${errors.questionsCount ? 'duel__error_type_visible' : ''}`}>{errors.questionsCount}</span>
                  </label>
                </div>
                <h2 className='duel-settings__bottom-title page__title'>
                  <span className='page__span'>Введи</span> имена <span className='page__span'>игрокам</span>
                </h2>
                <div className='duel-settings__container duel-settings__footer'>

                  <Label position='games' title='Игрок 1'>
                    <LabelContainer position='games' hint='от 2 до 15 символов, Ru/En, прописные и строчные буквы, Цифры, Пробел, -'>
                      <Input
                        type='text'
                        name='player1'
                        error={errors.player1}
                        value={values.player1 || ''}
                        handleChange={handleChange}
                        maxLength={15}
                        minLength={2}
                        pattern={playersNamesRegExp} />
                    </LabelContainer>
                    <InputError error={errors.player1} />
                  </Label>
                  <Label position='games' title='Игрок 2'>
                    <LabelContainer position='games' hint={`от 2 до 15 символов, Ru/En, прописные и строчные буквы, Цифры, Пробел, -`}>
                      <Input
                        type='text'
                        name='player2'
                        error={errors.player2}
                        value={values.player2 || ''}
                        handleChange={handleChange}
                        maxLength={15}
                        minLength={2}
                        pattern={playersNamesRegExp} />
                    </LabelContainer>
                    <InputError error={errors.player2} />
                  </Label>
                </div>
                <button
                  type='button'
                  onClick={handleSubmit}
                  className={`duel-settings__button page__button ${isFormValid ? '' : 'page__button_type_disabled'}`}
                  disabled={!isFormValid}
                >Далее</button>
              </form>
          }

        </section>
        :
        <Navigate to='/' />
  )
};

export default DuelSettings;