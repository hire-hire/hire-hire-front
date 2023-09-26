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

  const { values, setValues, errors, handleChange, resetForm, isFormValid } =
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

  // INITIAL SELECTS & VALUES (?)
  const initialSelectValues = () => {
    if (categories.length > 0) {
      // Подгрузить список подкатегорий
      const firstElId = categories[0].id;
      dispatch(fetchCategory(firstElId));
      // Установить начальные значения
      setValues({
        ...values,
        category: categories[0].title, // Программирование
        subcategory: category?.languages[0]?.title, // Python
      });
    }
  };

  useEffect(() => {
    if (categories.length > 0) {
      initialSelectValues();
    }
  }, [categories]);

  useEffect(() => {
    if (formData) {
      resetForm(formData, {}, false);
    }
  }, []);

  const validateTextAreas = (question: string, answer: string) => {
    if (
      question.trim() &&
      question.trim().length > 5 &&
      answer.trim() &&
      answer.trim().length > 2
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSaveValues = () => {
    const subcategoryId = category?.languages?.find(
      (language) =>
        language.title.toLowerCase() === values.subcategory.toLowerCase()
    )?.id;
    console.log(subcategoryId);
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
          label='Категория'
          arr={categories}
          value={values.category}
        />
        <Select
          disabled={!!formData}
          onChange={handleChange}
          title='subcategory'
          label='Подкатегория'
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
          minLen={5}
          maxLen={500}
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
          minLen={2}
          maxLen={500}
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
