import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { checkQuestionsLimit } from 'store/reducers/suggestQuestion/suggestQuestionActionCreator';

type PropsType = {
  handleCloseThanks: () => void
}

const SuggestQuestionThanks: FC<PropsType> = ({handleCloseThanks}) => {

  const dispatch = useAppDispatch();

  const suggestQuestionsResult = useAppSelector(state => state.suggestQuestion.questionStatus);

  useEffect(() => {
    if(suggestQuestionsResult?.add_questions_for24_count === 0) {
      dispatch(checkQuestionsLimit());
    }
  }, [suggestQuestionsResult]);

  return (
    <>
      {
        suggestQuestionsResult
          ?
          suggestQuestionsResult.add_questions_for24_count ===
            suggestQuestionsResult.limit_add_questions_per_day
            ?
            <>
              <p className='page__text suggest__thanks'>
                <span className='page__span'>Спасибо за</span> твой вклад<span className='page__span'>, сегодня ты отправил (а)</span> {suggestQuestionsResult.add_questions_for24_count} вопрос из {suggestQuestionsResult.limit_add_questions_per_day}!<span className='page__span'> Мы проверим вопросы и</span> добавим их<span className='page__span'> в свою базу</span>
              </p>
              <div className='suggest__links'>
                <Link to='/' className='suggest__link page__button page__link'>На главную</Link>
              </div>
            </>

            :
            <>
              <p className='page__text suggest__thanks'>
                <span className='page__span'>Спасибо за</span> твой вклад<span className='page__span'>, сегодня ты отправил (а)</span> {suggestQuestionsResult.add_questions_for24_count} вопрос из {suggestQuestionsResult.limit_add_questions_per_day}!<span className='page__span'> Мы проверим вопросы и</span> добавим их<span className='page__span'> в свою базу</span>
              </p>
              <div className='suggest__links'>
                <button onClick={handleCloseThanks}
                  type='button'
                  className='suggest__link page__button page__button_type_white'>
                  Предложить новый вопрос
                </button>
                <Link to='/' className='suggest__link page__button page__link'>На главную</Link>
              </div>
            </>
          :
          null
      }
    </>
  )
};

export default SuggestQuestionThanks;