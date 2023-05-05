import { Link } from 'react-router-dom';

const InterviewResult = () => {
  return (
    <section className='interview-result sections'>
      <h1 className='interview-result__title page__title'>Испытание <span className='page__span'>Python</span></h1>
      <h2 className='interview-result__subtitle page__text'>
        Поздравляем! Испытание завершено.
      </h2>
      <div className='interview-result__links'>
        <Link to='/' className='interview-result__link interview-result__link_type_white sections__link'>На главную</Link>
        <Link to='/' className='interview-result__link sections__link'>Новое испытание</Link>
      </div>
    </section>
  )
};

export default InterviewResult;