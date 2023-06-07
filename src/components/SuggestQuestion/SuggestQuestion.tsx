import SuggestForm from 'components/SuggestForm/SuggestForm';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useEffect } from 'react';
import { fetchCategories } from 'store/reducers/categories/categoriesActionCreator';

const SuggestQuestion = () => {

  const categories = useAppSelector(state => state.categories.categories);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
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
      <SuggestForm title={'1'}/>
    </section>
  )
};

export default SuggestQuestion;