import { FormEvent, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getDuel, patchDuel } from '../../store/reducers/duel/duelActionCreator';
import { ExtendedCategory } from '../../store/reducers/categories/categoriesActionCreator';
import arrowToBottom from '../../images/arrowToBottom.png';
import arrowToRight from '../../images/rightArrow.png';
import { fetchAnswer } from '../../store/reducers/interview/interviewActionCreator';
import { duelReset } from '../../store/reducers/duel/duelSlice';
import { getUser } from '../../store/reducers/user/userActionCreator';
import Preloader from '../Preloader/Preloader';


const Duel = () => {

  const { duelId } = useParams();
  const dispatch = useAppDispatch();
  const token = JSON.parse(localStorage.getItem('token')!);
  const refreshToken = JSON.parse(localStorage.getItem('refreshToken')!);
  const duel = useAppSelector(state => state.duel);
  const navigate = useNavigate();
  const user = useAppSelector(state => state.user.user);

  useEffect(() => {
    dispatch(getUser(token, refreshToken));
    dispatch(getDuel(duelId!, token));
    const currentDuelQuestion = localStorage.getItem('currentDuelQuestion');
    if (currentDuelQuestion) {
      setQuestionCount(JSON.parse(currentDuelQuestion))
    };
  }, []);

  const currentCategory: ExtendedCategory = JSON.parse(localStorage.getItem('duelCategory')!);
  const currentSubcategoryId = JSON.parse(localStorage.getItem('duelSubCategory')!);
  const currentLanguage = currentCategory.languages.find(language => language.id === Number(currentSubcategoryId));

  const languageImage = currentLanguage?.icon ? currentLanguage?.icon : currentCategory.icon;

  const [questionCount, setQuestionCount] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [winner, setWinner] = useState(0);

  const questionNumber = questionCount + 1;

  const questions = duel.duel?.questions;

  const handleShowAnswer = () => {
    fetchAnswer(questions![questionCount].question.id, token)
      .then(res => setAnswer(res.answer))
      .catch(err => setAnswer(err));
  };

  const handleSelectWinner = (e: any) => {
    setWinner(Number(e.currentTarget.value));
  };

  const handleGoToNextQuestion = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = {
      winner_id: winner,
      question_id: questions![questionCount].id,
    };
    setQuestionCount(questionNumber);
    setAnswer(null);
    setWinner(0);
    dispatch(patchDuel(duelId!, token, result));
    localStorage.setItem('currentDuelQuestion', JSON.stringify(questionCount));
  };

  const handleGoToResultPage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.removeItem('currentDuelQuestion');
    navigate(`/games/${duelId}/result`);
    dispatch(duelReset());
  };

  const handleGoBack = () => {
    dispatch(duelReset());
    navigate('/games');
  };

  const submitButtonHandler = questionNumber === questions?.length ? handleGoToResultPage : handleGoToNextQuestion;

  return (
    !user
      ?
      <Preloader />
      :
      user.is_duel_moderator
        ?
        <section className='duel sections'>
          <h1 className='duel__title page__title'>
            Соревнования
          </h1>
          <div className='duel__content'>

            <div className='duel__question-container'>
              <p className='duel__subtitle page__title'>
                Вопрос {questionNumber} <span className='page__span'>/ {questions?.length}</span>
              </p>
              <p className='duel__question page__text'>
                {duel.duel?.questions[questionCount].question.text}
              </p>
              <button onClick={handleShowAnswer} type='button' className='page__button page__button_type_white page__text'>Показать правильный ответ <img src={arrowToBottom} alt='Стрелочка' className='duel__question-image' /></button>
            </div>

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

            <div className={`duel__answer-container ${answer ? 'duel__answer-container_type_visible' : ''}`}>
              <p className='duel__subtitle page__title'>
                Правильный ответ
              </p>
              <p className='duel__answer page__text'>
                {answer}
              </p>
            </div>
            <div className='duel__lang'>
              <img src={languageImage} alt={currentLanguage?.title} className='duel__lang-image' />
            </div>
          </div>
          <form onSubmit={submitButtonHandler} className='duel__form'>
            <h2 className='duel__form-title page__title'>
              <span className='page__span'>Кто ответил</span> правильно?
            </h2>
            <div className='duel__labels'>
              <label className={`duel__label duel__player1 page__text ${winner === duel.duel?.players[0].id ? 'duel__label_type_checked' : ''} ${answer ? '' : 'duel__player1_type_disabled'}`}>
                {duel.duel?.players[0].name}
                <input
                  checked={duel.duel?.players![0].id === winner}
                  onChange={handleSelectWinner}
                  disabled={!answer} value={duel.duel?.players[0].id}
                  name='duel'
                  type='radio'
                  className='duel__input' />
              </label>
              <label className={`duel__label duel__player2 page__text ${winner === duel.duel?.players[1].id ? 'duel__label_type_checked' : ''} ${answer ? '' : 'duel__player2_type_disabled'}`}>
                {duel.duel?.players[1].name}
                <input
                  checked={duel.duel?.players![1].id === winner}
                  onChange={handleSelectWinner}
                  disabled={!answer}
                  value={duel.duel?.players[1].id}
                  name='duel' type='radio'
                  className='duel__input' />
              </label>
              <label className={`duel__label duel__no-one page__text ${winner === -1 ? 'duel__label_type_checked' : ''} ${answer ? '' : 'duel__label_type_disabled'}`}>
                Нет правильного ответа
                <input
                  checked={winner === -1}
                  onChange={handleSelectWinner}
                  disabled={!answer}
                  value={-1}
                  name='duel'
                  type='radio'
                  className='duel__input' />
              </label>
            </div>
            <div className='duel__buttons'>
              {
                questionNumber === 1
                ?
                <button onClick={handleGoBack} type='button' className='duel__link page__button page__button_type_white page__text'>Назад</button>
                :null
              }
              <button disabled={!winner} type='submit' className={`page__button duel__button_type_submit ${winner ? '' : 'page__button_type_disabled'} page__text`}>{questions?.length === questionNumber ? 'Завершить соревнование' : 'Следующий вопрос'} <img src={arrowToRight} alt='->' className='duel__button-image' /></button>
            </div>
          </form>
        </section>
        : <Navigate to='/' />
  )
};

export default Duel;