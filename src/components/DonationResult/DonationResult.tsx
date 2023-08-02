import { Link } from 'react-router-dom';

const DonationResult = () => {
  return (
    <section className='donation sections'>
      <h1 className='donation__title page__title'>
        За<span className='page__span'>Донатить</span>
      </h1>
      <p className='page__text donation__text donation__text_type_thanks'>
        <span className='page__span'>Спасибо</span>, что ты с нами!
      </p>
      <p className='page__text donation__text donation__text_type_thanks'>
        Мы <span className='page__span'>очень рады</span>, что <span className='donation__span'>НаймиНайми</span> находит <span className='page__span'>отклик в сердцах</span> людей. <span className='page__span'>Твоя поддержка</span> и донаты помогают нам <span className='page__span'>развиваться и двигаться</span> вперед. <span className='page__span'>Спасибо</span>, что <span className='page__span'>веришь</span> в нас и <span className='page__span'>поддерживаешь наш труд</span>. Мы ценим <span className='page__span'>твое участие</span> и будем продолжать работать над тем, чтобы сделать наш проект <span className='page__span'>еще лучше</span> и полезнее для всех.
      </p>
      <Link to='/' className='donation__link page__link page__button'>На главную страницу</Link>
    </section>
  )
};

export default DonationResult;