import SuggestForm from 'components/SuggestForm/SuggestForm';
import SuggestQuestionThanks from 'components/SuggestQuestionThanks/SuggestQuestionThanks';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useEffect, useState, useCallback } from 'react';
import { fetchCategories } from 'store/reducers/categories/categoriesActionCreator';
import {
  checkQuestionsLimit,
  postQuestion,
} from 'store/reducers/suggestQuestion/suggestQuestionActionCreator';
import { ReactComponent as SuggestIconsGroup } from '../../images/suggestQuestionGroup.svg';

export type FormDataType = {
  text: string;
  answer: string;
  language: number;
};

const SuggestQuestion = () => {
  const dispatch = useAppDispatch();

  const [formsData, setFormsData] = useState<Record<string, any>[] | []>([]);
  const [isThanksOpen, setIsThanksOpen] = useState<boolean>(false);

  const suggestQuestionsResult = useAppSelector(
    (state) => state.suggestQuestion.questionStatus
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchCategories());
    dispatch(checkQuestionsLimit());
  }, []);

  const handleSaveFormsValues = (values: Record<string, any>) => {
    if (
      suggestQuestionsResult &&
      !(
        formsData.length ===
        suggestQuestionsResult?.limit_add_questions_per_day -
          suggestQuestionsResult?.add_questions_for24_count
      )
    ) {
      const newDataArr = [...formsData, values];
      setFormsData(newDataArr);
    }
  };

  const handleCloseThanks = () => {
    setIsThanksOpen(false);
  };

  const handleSaveQuestions = (values: Record<string, any>) => {
    const updatedFormsData = [...formsData, values];
    const formsDataForSave = updatedFormsData.map((formData) => {
      const { text, answer, language } = formData;
      return { text, answer, language };
    });
    dispatch(postQuestion(formsDataForSave));
    setFormsData([]);
    setIsThanksOpen(true);
    dispatch(checkQuestionsLimit());
  };

  let limit = 10;

  if (suggestQuestionsResult) {
    limit =
      suggestQuestionsResult?.limit_add_questions_per_day -
      suggestQuestionsResult?.add_questions_for24_count;
  }

  const suggestCardsContent = [
    {
      id: 1,
      content:
        'Вопрос должен быть понятным и конкретным. Представь, что такой вопрос задают тебе и ты понимаешь, что на него можно ответить. Всего ты можешь добавлять до 10 вопросов в день.',
    },
    {
      id: 2,
      content:
        'В поле «Ответ» введи ответ на тот вопрос, который ты задал ранее. Ответ также должен быть понятным, конкретным и исчерпывающим.',
    },
    {
      id: 3,
      content:
        'Мы тщательно проверяем информацию, которую получаем. После модерации твои вопросы и ответы на них попадут в нашу базу данных и помогут пользователям учиться и проверять свои знания.',
    },
  ];

  const suggestSubtitle = useCallback(() => (
    <>
      <p className='suggest__subtitle page__text'>
        Здесь у тебя есть возможность предложить нам свои <br className='suggest__subtitle-rule'/> варианты
        вопросов и ответов для наших пользователей.
      </p>
      <p className='suggest__subtitle page__text'>
        Для взаимного удобства просим соблюдать наши <br className='suggest__subtitle-rule'/> простые правила:{' '}
      </p>
    </>
  ), []);

  return (
    <section className='suggest sections'>
      <SuggestIconsGroup className='suggest__icons' />
      {isThanksOpen ||
      suggestQuestionsResult?.add_questions_for24_count ===
        suggestQuestionsResult?.limit_add_questions_per_day ? (
        <article className='suggest__article'>
          <h1 className='suggest__title page__title'>
            Предложи <span className='page__span'>свой вопрос</span>
          </h1>
          <SuggestQuestionThanks
            key={suggestQuestionsResult?.add_questions_for24_count}
            handleCloseThanks={handleCloseThanks}
          />
        </article>
      ) : (
        <article className='suggest__article'>
          <h1 className='suggest__title page__title'>
            Предложи <br className='suggest__title-rule'/> <span className='page__span'> свой вопрос</span>
          </h1>
         {suggestSubtitle()}
        </article>
      )}
      <ul className='page__list suggest__cards'>
        {suggestCardsContent.map((card) => (
          <li key={card.id} className='suggest__card'>
            <h2 className='suggest_card-title page__title'>{card.id}</h2>
            <p className='suggest__card-text page__text'>{card.content}</p>
          </li>
        ))}
      </ul>
      {formsData.map((formData, index) => {
        return (
          <SuggestForm
            key={
              formData.text.slice(0, 10).replace(/ /g, '') +
              formData.answer.slice(0, 10).replace(/ /g, '') +
              index
            }
            handleSaveFormsValues={handleSaveFormsValues}
            formData={formData}
            formNumber={index + 1}
          />
        );
      })}
      <SuggestForm
        key={formsData.length + 1}
        handleSaveFormsValues={handleSaveFormsValues}
        formNumber={formsData ? formsData.length + 1 : 1}
        handlePostFormsValues={handleSaveQuestions}
        limit={limit}
      />
    </section>
  );
};

export default SuggestQuestion;
