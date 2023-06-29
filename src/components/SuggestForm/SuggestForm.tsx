import Select from 'components/Select/Select';
import {
  useAppDispatch,
  useAppSelector
} from 'hooks/redux';
import { useFormWithValidation } from 'hooks/useFormWithValidation';
import {
  ChangeEvent,
  FC,
  useEffect
} from 'react';
import { fetchCategory } from 'store/reducers/categories/categoriesActionCreator';
import { QuestionReqType } from 'store/reducers/suggestQuestion/suggestQuestionActionCreator';

type PropsType = {
  formNumber?: number
  formData?: Record<string, any>
  handleSaveFormsValues: (values: Record<string, any>) => void
  handlePostFormsValues?: (values: QuestionReqType) => void
}

const SuggestForm: FC<PropsType> = ({
  formNumber,
  formData,
  handleSaveFormsValues,
  handlePostFormsValues }) => {

  const dispatch = useAppDispatch();

  const categories = useAppSelector(state => state.categories.categories);
  const category = useAppSelector(state => state.categories.category);

  const {
    values,
    errors,
    handleChange,
    resetForm,
    isFormValid } = useFormWithValidation();

  const handleSelectCategory = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      handleChange(e);
      const selectedCategory = categories.find(category => category.title === e.target.value);
      dispatch(fetchCategory(selectedCategory?.id));
    } else {
      return
    }
  };

  useEffect(() => {
    if (formData) {
      resetForm(formData, {}, false);
    }
  }, []);

  const handleSaveValues = () => {
    const subcategoryId = category?.languages.find((language) => language.title.toLowerCase() === values.subcategory.toLowerCase())?.id;
    handleSaveFormsValues({...values, language: Number(subcategoryId)});
  };

  const handlePostFormValues = () => {
    const subcategoryId = category?.languages.find((language) => language.title.toLowerCase() === values.subcategory.toLowerCase())?.id;
    if(handlePostFormsValues) {
      const {text, answer} = values;
      handlePostFormsValues({text, answer, language: Number(subcategoryId)});
    }
  }

  return (
    <form className='suggest-form'>
      <h3 className='suggest-form__title page__text'>
        {formNumber}
      </h3>
      <div className='suggest-form__selects'>
        <Select
          disabled={!!formData}
          onChange={handleSelectCategory}
          title='category'
          label='Выберите категорию'
          arr={categories}
          value={values.category}
        />
        <Select
          disabled={!!formData}
          onChange={handleChange}
          title='subcategory'
          label='Выберите направление'
          arr={category?.languages}
          value={values.subcategory}
        />
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
            required
            disabled={!!formData}
            value={values.text}
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
            required
            disabled={!!formData}
            value={values.answer}
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
      <div className={`suggest-form__buttons ${formData ? 'suggest-form__buttons_type_hidden' : ''}`}>
        <button
          onClick={handleSaveValues}
          disabled={!isFormValid || formNumber === 10}
          type='button'
          className={`suggest-form__button page__button page__button_type_white ${isFormValid || formNumber === 10 ? '' : 'page__button_type_disabled'}`}>
          Добавить ещё вопрос
        </button>
        <button
          onClick={handlePostFormValues}
          disabled={!isFormValid}
          type='button'
          className={`suggest-form__button page__button ${isFormValid ? '' : 'page__button_type_disabled'}`}>
          Отправить вопрос
        </button>
      </div>
    </form>
  )
};

export default SuggestForm;