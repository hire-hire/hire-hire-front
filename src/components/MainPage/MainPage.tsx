import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCategories } from '../../store/reducers/categories/categoriesActionCreator';
import { useEffect } from 'react';
import CategoryCard from '../CategoryCard/CategoryCard';
import Preloader from '../Preloader/Preloader';
import topSquare from '../../images/TopSquare.png';
import middleSquare from '../../images/MiddleSquare.png';
import bottomSquare from '../../images/BottomSquare.png';
import questionTopSquare from '../../images/questionTopSquare.png';
import questionMiddleSquare from '../../images/questionMiddleSquare.png';
import questionLeftSquare from '../../images/questionLeftSquare.png';
import questionBottomSquare from '../../images/questionBottomSquare.png'

const MainPage = () => {

  const { categories, isLoading, error } = useAppSelector(state => state.categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <>
      <section className='about sections'>
        <div className='about__content'>
          <h1 className='page__title about__title'>
            Подготовка к <span className='page__span'>собеседованию</span>
          </h1>
          <p className='about__describtion sections__text'>
            Ты хочешь успешно пройти собеседование по Python и показать свои навыки программирования на практике?
          </p>
          <p className='about__describtion sections__text'>
            Мы предоставляем реальные примеры и задачи, которые предлагают на собеседовании кандидатам на Python-позиции. Они помогут тебе проверить и закрепить свои знания.
          </p>
          <p className='about__describtion sections__text'>
            Не откладывай свой успех на завтра, начни готовиться к собеседованию по Python уже сегодня!
          </p>
        </div>
        <div className='about__squares'>
          <img src={topSquare} alt='Анимация' className='about__square about__top-square' />
          <img src={middleSquare} alt='Анимация' className='about__square about__middle-square' />
          <img src={bottomSquare} alt='Анимация' className='about__square about__bottom-square' />
        </div>
      </section>
      <section className='categories sections'>
        <h2 className='categories__title sections__title'>
          Пройти собеседование
        </h2>
        <div className='categories__content'>
          <ul className='cards page__list'>
            {
              error ? error :
                isLoading ? <Preloader /> :
                  categories.map((category) => {
                    return <CategoryCard key={category.id} category={category} />
                  })
            }
          </ul>
          {
            categories.length === 1
              ?
              <p className='categories__hint sections__text'>
                На данный момент доступна только подготовка к собеседованию по Python.
                <span>
                  Не расстраивайся, если это не то, что тебе нужно. Мы работаем над этим и в будущем добавим новые разделы.
                </span>
              </p>
              :
              null
          }
        </div>
      </section>
      <section className='suggest-question sections'>
        <div className='suggest-question__content'>
          <h1 className='suggest-question__title sections__title'>
            Предложи свой вопрос
          </h1>
          <p className='suggest-question__text sections__text'>
            Есть интересный кейс? Поделитесь с нами! Так ты сможешь помочь многим молодым специалистам, которые хотят подготовиться к собеседованиям разного уровня.
          </p>
          <Link to='/suggest-question' className='suggest-question__link sections__link'>
            Предложить вопрос
          </Link>
        </div>
        <div className='suggest-question__squares'>
          <img src={questionTopSquare} alt='' className='suggest-question__questionTopSquare suggest-question__square' />
          <img src={questionMiddleSquare} alt='' className='suggest-question__questionMiddleSquare suggest-question__square' />
          <img src={questionLeftSquare} alt='' className='suggest-question__questionLeftSquare suggest-question__square' />
          <img src={questionBottomSquare} alt='' className='suggest-question__questionBottomSquare suggest-question__square' />
        </div>
      </section>
    </>
  )
};

export default MainPage;