import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className='notFound sections'>
      <h1 className='notFound__title page__title'>
        404
      </h1>
      <p className='notFound__description page__text'>
        К сожалению, запрашиваемая страница не найдена.
        <br />
        Возможно, вы перешли по ссылке, в которой была допущена ошибка,
        или ресурс был удален. Попробуйте перейти на главную страницу
      </p>
      <Link to='/' className='notFound__link sections__link'>
        На главную
      </Link>
    </section>
  )
};

export default NotFound;