import SuggestForm from 'components/SuggestForm/SuggestForm';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useCallback, useEffect, useState } from 'react';
import { fetchCategories } from 'store/reducers/categories/categoriesActionCreator';

export type FormDataType = {
  text: string
  answer: string
  language: number
}

const SuggestQuestion = () => {

  const dispatch = useAppDispatch();

  const [formsData, setFormsData] = useState<Record<string, any>[] | []>([]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleSaveFormsValues = useCallback((values: Record<string, any>) => {
    const newDataArr = [...formsData, values];
    setFormsData(newDataArr);
    console.log(formsData)
  }, []);

  return (
    <section className='suggest sections'>
      <h1 className='suggest__title page__title'>
        Предложи<span className='page__span'> свой вопрос</span>
      </h1>
      <p className='suggest__subtitle page__text'>
        Здесь у тебя есть возможность предложить нам свои варианты вопросов и ответов для наших пользователей.
        <br />
        <br />
        Для взаимного удобства просим соблюдать наши простые правила:
      </p>
      <ul className='page__list suggest__cards'>
        <li className='suggest__card'>
          <h2 className='suggest_card-title page__title'>
            1
          </h2>
          <p className='suggest__card-text page__text'>
            Вопрос должен быть понятным и конкретным. Представь, что такой вопрос задают тебе и ты понимаешь, что на него можно ответить. Всего ты можешь добавлять до 10 вопросов в день.
          </p>
        </li>
        <li className='suggest__card'>
          <h2 className='suggest_card-title page__title'>
            2
          </h2>
          <p className='suggest__card-text page__text'>
            В поле «Ответ» введи ответ на тот вопрос, который ты задал ранее. Ответ также должен быть понятным, конкретным и исчерпывающим.
          </p>
        </li>
        <li className='suggest__card'>
          <h2 className='suggest_card-title page__title'>
            3
          </h2>
          <p className='suggest__card-text page__text'>
            Мы тщательно проверяем информацию, которую получаем. После модерации твои вопросы и ответы на них попадут в нашу базу данных и помогут пользователям учиться и проверять свои знания.
          </p>
        </li>
      </ul>
      {
        formsData.map((formData, index) => {
          return <SuggestForm
            key={formData.text.slice(0, 10).replace(/ /g, '') + formData.answer.slice(0, 10).replace(/ /g, '') + index}
            handleSaveFormsValues={handleSaveFormsValues}
            formData={formData}
            formNumber={index + 1}
          />
        })
      }
      <SuggestForm
        key={formsData.length + 1}
        handleSaveFormsValues={handleSaveFormsValues}
        formNumber={formsData.length + 1}
      />
    </section>
  )
};

export default SuggestQuestion;