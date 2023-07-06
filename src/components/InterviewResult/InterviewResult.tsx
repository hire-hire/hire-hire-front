import { useAppSelector } from 'hooks/redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const InterviewResult = () => {

  const interview = useAppSelector(state => state.interview.interview);

  const [rightAnswersCount, setRightAnswersCount ] = useState(0);

  useEffect(() => {
    const rightAnswersFromLS = JSON.parse(localStorage.getItem('rightAnswers')!);
    setRightAnswersCount(rightAnswersFromLS);
  }, []);

  return (
    <section className='interview-result sections'>
      <h1 className='interview-result__title page__title'>Испытание <span className='page__span'>Python</span></h1>
      <p className='interview-result__subtitle page__text'>
        <span className='page__span'>Поздравляем!</span>
      </p>
      <p className='interview-result__subtitle page__text'>
        Испытание <span className='page__span'>закончено!</span>
      </p>
      <p className='interview-result__subtitle page__text'>
        Вы ответили <span className='page__span'></span> правильно на "<span className='page__span'>{rightAnswersCount}</span>" вопросов из "<span className='page__span'>{interview?.questions.length}</span>"
      </p>
      <p className='interview-result__text page__text'>
        Вы можете <span className='page__span'>добавить свой вопрос</span>, который вам задали на собеседовании
      </p>
      <div className='interview-result__links'>
        <Link to='/' className='interview-result__link page__button page__button_type_white'>На главную</Link>
        <Link to='/suggest-question' className='interview-result__link page__button'>Предложить свой вопрос</Link>
        <Link to='/' className='interview-result__link page__button page__button_type_white'>Новое испытание</Link>
      </div>
    </section>
  )
};

export default InterviewResult;