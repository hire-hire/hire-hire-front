import Select from 'components/Select/Select';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useFormWithValidation } from 'hooks/useFormWithValidation';
import { ChangeEvent, FC } from 'react';
import { fetchCategory } from 'store/reducers/categories/categoriesActionCreator';

type PropsType = {
  title: string
}

const SuggestForm: FC<PropsType> = ({ title }) => {

  const dispatch = useAppDispatch();

  const categories = useAppSelector(state => state.categories.categories);
  const category = useAppSelector(state => state.categories.category);

  const {
    values,
    errors,
    handleChange,
    resetForm } = useFormWithValidation();

  const handleSelectCategory = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      const selectedCategory = categories.find(category => category.title === e.target.value);
      dispatch(fetchCategory(selectedCategory?.id));
    } else {
      return
    }
  };

  return (
    <form className='suggest-form'>
      <h3 className='suggest-form__title page__text'>
        {title}
      </h3>
      <div className='suggest-form__selects'>
        <Select
          onChange={handleSelectCategory}
          title='category'
          label='Выберите категорию'
          arr={categories} />
        <Select
          onChange={handleChange}
          title='subcategory'
          label='Выберите направление'
          arr={category?.languages} />
      </div>
      <div className='suggest-form__areas'>
        <label className='suggest-form__area-label page__title'>
          Вопрос
          <textarea
            name='text'
            placeholder='Ввести вопрос'
            className='suggest-form__area page__text'>
          </textarea>
          <p className='suggest-form__area-hint page__text'>
            10/500
          </p>
        </label>
        <label className='suggest-form__area-label page__title'>
          Ответ
          <textarea
            name='answer'
            placeholder='Ввести ответ'
            className='suggest-form__area page__text'>
          </textarea>
          <p className='suggest-form__area-hint page__text'>
            10/500
          </p>
        </label>
      </div>
      <div className='suggest-form__buttons'>
        <button
          type='button'
          className='suggest-form__button page__button page__button_type_white'>
          Добавить ещё вопрос
        </button>
        <button
          type='button'
          className='suggest-form__button page__button'>
          Отправить вопрос
        </button>
      </div>
    </form>
  )
};

export default SuggestForm;