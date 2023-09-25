import Select from 'components/Select/Select';
import PrimaryButton from 'components/PrimaryButton/PrimaryButton';
import SuggestFormTextArea from 'components/SuggestFormTextArea/SuggestFormTextArea';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useFormWithValidation } from 'hooks/useFormWithValidation';
import { ChangeEvent, FC, useEffect } from 'react';
import { fetchCategory } from 'store/reducers/categories/categoriesActionCreator';
import { QuestionReqType } from 'store/reducers/suggestQuestion/suggestQuestionActionCreator';

type PropsType = {
  limit?: number;
  formNumber?: number;
  formData?: Record<string, any>;
  handleSaveFormsValues: (values: Record<string, any>) => void;
  handlePostFormsValues?: (values: QuestionReqType) => void;
};

const SuggestForm: FC<PropsType> = ({
  formNumber,
  formData,
  handleSaveFormsValues,
  handlePostFormsValues,
  limit,
}) => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector((state) => state.categories.categories);
  const category = useAppSelector((state) => state.categories.category);

  const { values, errors, handleChange, resetForm, isFormValid } =
    useFormWithValidation();

  const handleSelectCategory = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.value) {
      handleChange(e);
      const selectedCategory = categories.find(
        (category) => category.title === e.target.value
      );
      dispatch(fetchCategory(selectedCategory?.id));
    } else {
      return;
    }
  };

  useEffect(() => {
    if (formData) {
      resetForm(formData, {}, false);
    }
  }, []);

  const validateTextAreas = (question: string, answer: string) => {
    if (
      question.trim() &&
      question.trim().length > 10 &&
      answer.trim() &&
      answer.trim().length > 10
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSaveValues = () => {
    const subcategoryId = category?.languages.find(
      (language) =>
        language.title.toLowerCase() === values.subcategory.toLowerCase()
    )?.id;
    const { text, answer } = values;
    if (validateTextAreas(text, answer)) {
      handleSaveFormsValues({ ...values, language: Number(subcategoryId) });
    } else {
      resetForm(
        { ...values, text: '', answer: '' },
        {
          ...errors,
          text: 'Поле не может быть пустым',
          answer: 'Поле не может быть пустым',
        },
        false
      );
    }
  };

  const handlePostFormValues = () => {
    const subcategoryId = category?.languages.find(
      (language) =>
        language.title.toLowerCase() === values.subcategory.toLowerCase()
    )?.id;
    if (handlePostFormsValues) {
      const { text, answer } = values;
      if (validateTextAreas(text, answer)) {
        handlePostFormsValues({
          text,
          answer,
          language: Number(subcategoryId),
        });
      } else {
        resetForm(
          { ...values, text: '', answer: '' },
          {
            ...errors,
            text: 'Поле не может быть пустым',
            answer: 'Поле не может быть пустым',
          },
          false
        );
      }
    }
  };

  return (
    <form className='suggest-form'>
      <h3 className='suggest-form__title page__text'>{formNumber}</h3>
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
        <SuggestFormTextArea
          id='text'
          title='Вопрос'
          name='text'
          placeholder='Ввести вопрос'
          value={values.text}
          errors={errors.text}
          minLen={10}
          maxLen={5500}
          onChange={handleChange}
          disabled={!!formData}
        />
        <SuggestFormTextArea
          id='answer'
          title='Ответ'
          name='answer'
          placeholder='Ввести ответ'
          value={values.answer}
          errors={errors.answer}
          minLen={10}
          maxLen={2500}
          onChange={handleChange}
          disabled={!!formData}
        />
      </div>
      <div
        className={`suggest-form__buttons ${
          formData ? 'suggest-form__buttons_type_hidden' : ''
        }`}
      >
        <PrimaryButton
          title='Добавить еще вопрос'
          variant='white'
          onClick={handleSaveValues}
          disabled={!isFormValid || formNumber === limit}
        />
        <PrimaryButton
          title='Отправить вопрос'
          variant='violet'
          onClick={handlePostFormValues}
          disabled={!isFormValid}
        />
      </div>
    </form>
  );
};

export default SuggestForm;

{
  /* <div className='suggest-form__area-label page__title'>
            <div className='suggest-form__label-container'>
              <span>Вопрос</span>
              <span
                className={`suggest-form__label-error page__text ${
                  errors.text ? 'suggest-form__label-error_type_visible' : ''
                }`}
              >
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
              className={`suggest-form__area page__text ${
                errors.text ? 'suggest-form__area_type_error' : ''
              }`}
              minLength={10}
              maxLength={5500}
            />
            <p className='suggest-form__area-hint page__text'>
              {values.text ? values.text.length : 0}/5-500
            </p>
          </div> */
}
{
  /* <div className='suggest-form__area-label page__title'>
          <div className='suggest-form__label-container'>
            <span>Ответ</span>
            <span
              className={`suggest-form__label-error page__text ${
                errors.answer ? 'suggest-form__label-error_type_visible' : ''
              }`}
            >
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
            className={`suggest-form__area page__text ${
              errors.answer ? 'suggest-form__area_type_error' : ''
            }`}
            minLength={10}
            maxLength={2500}
          />
          <p className='suggest-form__area-hint page__text'>
            {values.answer ? values.answer.length : 0}/2-500
          </p>
        </div> */
}

{
  /* <button
          onClick={handleSaveValues}
          disabled={!isFormValid || formNumber === limit}
          type='button'
          className={`suggest-form__button page__button page__button_type_white ${
            isFormValid || formNumber === limit
              ? ''
              : 'page__button_type_disabled'
          }`}
        >
          Добавить ещё вопрос
        </button> 
        <button
          onClick={handlePostFormValues}
          disabled={!isFormValid}
          type='button'
          className={`suggest-form__button page__button ${
            isFormValid ? '' : 'page__button_type_disabled'
          }`}
        >
          Отправить вопрос
        </button> */
}
