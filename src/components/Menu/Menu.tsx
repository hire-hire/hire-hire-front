import { Link } from 'react-router-dom';

const Menu = () => {

  return (
    <nav className='menu'>
      <ul className='menu__items page__list'>
        <li className='menu__item'>
          <Link to='/donation' className='menu__link page__link page__text'>
            ЗаДонать
          </Link>
        </li>
        <li className='menu__item'>
          <Link to='/suggest-question' className='menu__link page__link page__text'>
            Предложить вопрос
          </Link>
        </li>
        <li className='menu__item'>
          <Link to='/team' className='menu__link page__link page__text'>
            Команда
          </Link>
        </li>
      </ul>
    </nav>
  )
};

export default Menu;