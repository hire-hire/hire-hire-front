import Select from 'components/Select/Select';
import { FormDataType } from 'components/SuggestQuestion/SuggestQuestion';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useFormWithValidation } from 'hooks/useFormWithValidation';
import { ChangeEvent, FC } from 'react';
import { fetchCategory } from 'store/reducers/categories/categoriesActionCreator';

type PropsType = {
  formNumber: number
  formData?: FormDataType
  handleSaveFormsValues: (values: FormDataType) => void
}

const SuggestForm: FC<PropsType> = ({ formNumber, formData, handleSaveFormsValues }) => {

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
        {formNumber}
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
        <div className='suggest-form__area-label page__title'>
          <div className='suggest-form__label-container'>
            <span>Вопрос</span>
            <span className={`suggest-form__label-error page__text ${errors.text ? 'suggest-form__label-error_type_visible' : ''}`}>
              {`(${errors.text})`}
            </span>
          </div>
          <textarea
            onChange={handleChange}
            name='text'
            placeholder='Ввести вопрос'
            className={`suggest-form__area page__text ${errors.text ? 'suggest-form__area_type_error' : ''}`}
            minLength={10}
            maxLength={500}
          >
          </textarea>
          <p className='suggest-form__area-hint page__text'>
            {values.text ? values.text.length : 0}/500
          </p>
        </div>
        <div className='suggest-form__area-label page__title'>
          <div className='suggest-form__label-container'>
            <span>Ответ</span>
            <span className={`suggest-form__label-error page__text ${errors.answer ? 'suggest-form__label-error_type_visible' : ''}`}>
              {`(${errors.answer})`}
            </span>
          </div>
          <textarea
            onChange={handleChange}
            name='answer'
            placeholder='Ввести ответ'
            className={`suggest-form__area page__text ${errors.answer ? 'suggest-form__area_type_error' : ''}`}
            minLength={10}
            maxLength={500}
          >
          </textarea>
          <p className='suggest-form__area-hint page__text'>
            {values.answer ? values.answer.length : 0}/500
          </p>
        </div>
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