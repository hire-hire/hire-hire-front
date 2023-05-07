import { useEffect } from 'react';
import { fetchCategory } from '../../store/reducers/categories/categoriesActionCreator';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import CategoryCard from '../CategoryCard/CategoryCard';
import infoImage from '../../images/MainBackground.png';
import directionsImage from '../../images/directionsBackground.png';
import { useNavigate, useParams } from 'react-router-dom';


const Category = () => {

  const dispatch = useAppDispatch();
  const category = useAppSelector(state => state.categories.category);
  const categories = useAppSelector(state => state.categories.categories);
  const { categoryTitle } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if(categories && categories.length > 0) {

      if(!categories.find(category => category.title.toLowerCase() === categoryTitle)) {
        navigate('/404');
        return
      }
      
      const currentCategoryId = categories.find((category) => category.title.toLowerCase() === categoryTitle)?.id;
      dispatch(fetchCategory(currentCategoryId));
    } else {
      const categoriesFromLS = JSON.parse(localStorage.getItem('categories')!);

      if(!categoriesFromLS.find((category: any) => category.title.toLowerCase() === categoryTitle)) {
        navigate('/404');
        return
      }

      const currentCategoryId = categoriesFromLS.find((category: any) => category.title.toLowerCase() === categoryTitle)!.id;
      dispatch(fetchCategory(currentCategoryId));
    }
    
    return () => localStorage.setItem('currentCategory', JSON.stringify(category));
  }, []);

  return (
    <>
      <section className='info sections'>
        <div className="info__content">
          <h1 className='info__title page__title'>
            Пройти <span className='page__span'>собеседование</span>
          </h1>
          <p className='info__description sections__text'>
            Покажи насколько мощно ты разбираешься в коде и готов к решению реальных задач! Пройди собеседование по Python!
          </p>
        </div>
        <img src={infoImage} alt="" className="info__image" />
      </section>
      <section className='directions sections'>
        <div className='directions__header'>
          <img src={directionsImage} alt='' className="directions__image" />
          <h2 className='directions__title page__title'>
            Выбери <span className='page__span'>направление</span>
          </h2>
        </div>
        <ul className='directions__cards page__list'>
          {
            category?.languages?.map((subCategory) => {
              return (
              <CategoryCard 
              key={subCategory.id} 
              category={subCategory} 
              path={`/${categoryTitle}`}
              />
              )
            })
          }
          {
            category?.languages?.length === 1
              ?
              <p className='categories__hint sections__text'>
                На данный момент доступна только подготовка к собеседованию по Python.
                <span>
                  Не расстраивайся, если это не то, что тебе нужно. Мы работаем над этим и в будущем добавим новые разделы.
                </span>
              </p>
              : null
          }
        </ul>
      </section >
    </>
  )
};

export default Category;