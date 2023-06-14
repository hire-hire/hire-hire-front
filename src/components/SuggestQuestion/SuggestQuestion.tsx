import SuggestForm from 'components/SuggestForm/SuggestForm';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from 'store/reducers/categories/categoriesActionCreator';
import { QuestionReqType, QuestionResType, postQuestion } from 'store/reducers/suggestQuestion/suggestQuestionActionCreator';
import { suggestQuestionLoaded, suggestQuestionReset } from 'store/reducers/suggestQuestion/suggestQuestionSlice';

export type FormDataType = {
  text: string
  answer: string
  language: number
}

const SuggestQuestion = () => {

  const dispatch = useAppDispatch();

  // const [formsData, setFormsData] = useState<Record<string, any>[] | []>([]);

  const suggestQuestionsResult = useAppSelector(state => state.suggestQuestion.questionStatus);

  useEffect(() => {
    dispatch(fetchCategories());
    // if (suggestQuestionsResult) {
    //   document.cookie = `user_cookie_id=${suggestQuestionsResult.user_cookie_id}`
    // }
  }, []);

  // const handleSaveFormsValues = useCallback((values: Record<string, any>) => {
  //   const newDataArr = [...formsData, values];
  //   setFormsData(newDataArr);
  // }, []);

  const handleResetSuggestResult = () => {
    dispatch(suggestQuestionReset());
  };

  const handleSaveQuestions = (values: QuestionReqType) => {
    dispatch(postQuestion(values));
  };

  return (
    <section className='suggest sections'>
      <h1 className='suggest__title page__title'>
        Предложи<span className='page__span'> свой вопрос</span>
      </h1>
      {
        suggestQuestionsResult
          ?
          <>
            <p className='page__text suggest__thanks'>
              <span className='page__span'>Спасибо за</span> твой вклад<span className='page__span'>, сегодня ты отправил (а)</span> {suggestQuestionsResult.extra_data.add_questions_for24_count} вопрос из {suggestQuestionsResult.extra_data.limit_add_questions_per_day}!<span className='page__span'> Мы проверим вопросы и</span> добавим их<span className='page__span'> в свою базу</span>
            </p>
            <div className='suggest__links'>
              <button onClick={handleResetSuggestResult}
                type='button'
                className='suggest__link page__button page__button_type_white'>
                Предложить новый вопрос
              </button>
              <Link to='/' className='suggest__link page__button page__link'>На главную</Link>
            </div>
          </>
          :
          <>
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
            {/* {
              formsData.map((formData, index) => {
                return <SuggestForm
                  key={formData.text.slice(0, 10).replace(/ /g, '') + formData.answer.slice(0, 10).replace(/ /g, '') + index}
                  handleSaveFormsValues={handleSaveFormsValues}
                  formData={formData}
                  formNumber={index + 1}
                />
              })
            } */}
            <SuggestForm
              key={1}
              // handleSaveFormsValues={handleSaveFormsValues}
              formNumber={1}
              handlePostFormsValues={handleSaveQuestions}
            />
          </>
      }

    </section>
  )
};

export default SuggestQuestion;