import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../store/reducers/categories/categoriesActionCreator';
import arrow from '../../images/cardArrow.png';

type PropsType = {
  category: Category
  path?: string
};

const CategoryCard: FC<PropsType> = ({ category, path }) => {

  return (
    <li className='card'>
      <div className='card__content'>
        <img src={category.icon} alt={`Картинка категории ${category.title}`} className='card__image' />
        <h3 className='card__title sections__text'>
          {category.title}
        </h3>
      </div>
      <Link to={`${path ? path : ''}/${category.title.toLowerCase()}`} className='card__link sections__link'>
        Перейти
        <img src={arrow} alt='' className='card__arrow' />
      </Link>
    </li>
  )
};

export default CategoryCard;