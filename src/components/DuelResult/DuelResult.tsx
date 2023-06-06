import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getDuel } from '../../store/reducers/duel/duelActionCreator';
import { ExtendedCategory } from '../../store/reducers/categories/categoriesActionCreator';
import { duelReset } from '../../store/reducers/duel/duelSlice';

const DuelResult = () => {

  const { duelId } = useParams();
  const dispatch = useAppDispatch();
  const token = JSON.parse(localStorage.getItem('token')!);
  const duel = useAppSelector(state => state.duel);

  useEffect(() => {
    dispatch(getDuel(duelId!, token));
    return () => {
      dispatch(duelReset());
    }
  }, []);

  const currentCategory: ExtendedCategory = JSON.parse(localStorage.getItem('duelCategory')!);
  const currentSubcategoryId = JSON.parse(localStorage.getItem('duelSubCategory')!);
  const currentLanguage = currentCategory.languages.find(language => language.id === Number(currentSubcategoryId));

  console.log(currentLanguage)

  const handleLinkClick = () => {
    localStorage.removeItem('duelCategory');
    localStorage.removeItem('duelSubCategory');
    dispatch(duelReset());
  };

  return (
    <section className={`duel-result ${!currentLanguage ? 'duel-result_type_general' : currentLanguage?.id === 1 ? 'duel-result_type_phyton' :  'duel-result_type_docker'} sections`}>
      <h1 className='duel-result__title page__title'>
        <span className='page__span'>Результаты</span>
      </h1>
      <div className='duel__counter'>
        <p className='duel__subtitle page__title'>
          Счёт
        </p>
        <div className='duel__players'>
          <div className='duel__player duel__player_type_left'>
            <p className='duel__player-name duel__player-name_type_left page__title'>
              {duel.duel?.players[0].name}
            </p>
            <p className='duel__player-score page__title duel__player-score_type_left'>
              {duel.duel?.players[0].good_answers_count}
            </p>
          </div>
          <div className='duel__player duel__player_type_right'>
            <p className='duel__player-name duel__player-name_type_right page__title'>
              {duel.duel?.players[1].name}
            </p>
            <p className='duel__player-score page__title duel__player-score_type_right'>
              {duel.duel?.players[1].good_answers_count}
            </p>
          </div>
        </div>
      </div>
      <p className='duel__subtitle page__title'>
        Неправильных ответов
      </p>
      <p className='duel__player-score duel__player-score_type_result page__title'>
        {duel.duel?.wrong_answers_count}
      </p>
      <div className='duel-result__links'>
        <Link onClick={handleLinkClick} to={'/'} className='duel-result__link page__button page__button_type_white page__text'>На главную</Link>
        <Link onClick={handleLinkClick} to={'/games'} className='duel-result__link page__button page__text'>Новое соревнование</Link>
      </div>
    </section>
  )
};

export default DuelResult;
