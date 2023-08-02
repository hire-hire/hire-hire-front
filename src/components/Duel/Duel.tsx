import {
  FormEvent,
  useEffect,
  useState
} from 'react';
import {
  Navigate,
  useNavigate,
  useParams
} from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector
} from '../../hooks/redux';
import {
  getDuel,
  patchDuel
} from '../../store/reducers/duel/duelActionCreator';
import { ExtendedCategory } from '../../store/reducers/categories/categoriesActionCreator';
import arrowToRight from '../../images/rightArrow.png';
import { fetchAnswer } from '../../store/reducers/interview/interviewActionCreator';
import { duelReset } from '../../store/reducers/duel/duelSlice';
import Preloader from '../Preloader/Preloader';


const Duel = () => {

  const { duelId } = useParams();
  const dispatch = useAppDispatch();
  const token = JSON.parse(localStorage.getItem('token')!);
  const duel = useAppSelector(state => state.duel);
  const navigate = useNavigate();
  const user = useAppSelector(state => state.user);

  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 110);
    setWinner(0);
    // dispatch(getDuel(duelId!, token));
    // const currentDuelQuestion = localStorage.getItem('currentDuelQuestion');
    // if (currentDuelQuestion) {
    //   setQuestionCount(JSON.parse(currentDuelQuestion))
    // };
    if (!duel.duel) {
      dispatch(getDuel(duelId!, token));
    } else {
      const currentDuelFinishedQuestions =
        duel.duel.players[0].good_answers_count +
        duel.duel.players[1].good_answers_count +
        duel.duel.wrong_answers_count;
      setQuestionCount(currentDuelFinishedQuestions);
    }

  }, [duel.duel]);

  const isModerator = localStorage.getItem('key') ? true : false;

  const currentCategory: ExtendedCategory = JSON.parse(localStorage.getItem('duelCategory')!);
  const currentSubcategoryId = JSON.parse(localStorage.getItem('duelSubCategory')!);
  const currentLanguage = currentCategory.languages.find(language => language.id === Number(currentSubcategoryId));

  const languageImage = currentLanguage?.icon ? currentLanguage?.icon : currentCategory.icon;

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
    dispatch(patchDuel(duelId!, token, result));
    localStorage.setItem('currentDuelQuestion', JSON.stringify(questionCount));
  };

  const handleGoToResultPage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = {
      winner_id: winner,
      question_id: questions![questionCount].id,
    };
    dispatch(patchDuel(duelId!, token, result));
    localStorage.removeItem('currentDuelQuestion');
    navigate(`/games/${duelId}/result`);
    dispatch(duelReset());
  };

  const handleGoBack = () => {
    dispatch(duelReset());
    navigate('/games');
  };

  const handleDuelComplete = () => {
    localStorage.removeItem('currentDuelQuestion');
    dispatch(duelReset());
    navigate('/games');
  };

  const handleDecrementScore = (e: any) => {
    setWinner(0);
  };

  const submitButtonHandler = questionNumber === questions?.length ? handleGoToResultPage : handleGoToNextQuestion;

  const finishedButtonHandler = questionNumber === 1 ? handleGoBack : handleDuelComplete;

  return (
    (!user.user && isModerator) || user.isLoading
      ?
      <Preloader />
      :
      user.user?.is_duel_moderator
        ?
        <section className='duel sections'>
          <h1 className='duel__title page__title'>
            Соревнования
          </h1>

          <form onSubmit={submitButtonHandler} className='duel__form'>
            <div className='duel__counter'>
              <p className='duel__subtitle page__title'>
                <span className='page__span'>Счёт</span>
              </p>
              <div className='duel__players'>
                <div className='duel__player-container'>
                  <button
                    disabled={!winner || winner !== duel.duel?.players[0].id}
                    onClick={handleDecrementScore}
                    type='button'
                    className={`${winner === duel.duel?.players[0].id ? 'duel__player-decrement_type_active' : ''} duel__player-decrement duel__player-decrement_type_left`}
                  >
                    -
                  </button>
                  <div className='duel__player duel__player_type_left'>
                    <p className='duel__player-name duel__player-name_type_left page__title'>
                      {duel.duel?.players[0].name}
                    </p>
                    <p className={`${((questionCount % 2 === 0) || (questionCount === 0)) ? 'duel__player-score_type_active' : ''} duel__player-score page__title duel__player-score_type_left`}>
                      {
                        !winner ?
                          duel.duel?.players[0].good_answers_count ?
                            duel.duel?.players[0].good_answers_count :
                            0 :
                          winner === duel.duel?.players[0].id && duel.duel ?
                            duel.duel?.players[0].good_answers_count + 1 :
                            duel.duel?.players[0].good_answers_count
                      }
                      {/* {duel.duel?.players[0].good_answers_count} */}
                    </p>
                    <label className={`duel__label duel__player1 page__text ${answer && !winner ? 'duel__label_type_active' : ''}`}>
                      +
                      <input
                        checked={duel.duel?.players![0].id === winner}
                        onChange={handleSelectWinner}
                        disabled={!answer || winner}
                        value={duel.duel?.players[0].id}
                        name='duel'
                        type='radio'
                        className='duel__input' />
                    </label>
                  </div>
                </div>

                <div className='duel__player-container'>
                  <div className='duel__player duel__player_type_right'>
                    <p className='duel__player-name duel__player-name_type_right page__title'>
                      {duel.duel?.players[1].name}
                    </p>
                    <p className={`${questionCount % 2 !== 0 ? 'duel__player-score_type_active' : ''} duel__player-score page__title duel__player-score_type_right`}>
                      {
                        !winner ?
                          duel.duel?.players[1].good_answers_count ?
                            duel.duel?.players[1].good_answers_count :
                            0 :
                          winner === duel.duel?.players[1].id && duel.duel ?
                            duel.duel?.players[1].good_answers_count + 1 :
                            duel.duel?.players[1].good_answers_count
                      }
                      {/* {duel.duel?.players[1].good_answers_count} */}
                    </p>
                    <label className={`duel__label duel__player2 page__text ${answer && !winner ? 'duel__label_type_active' : ''}`}>
                      +
                      <input
                        checked={duel.duel?.players![1].id === winner}
                        onChange={handleSelectWinner}
                        disabled={!answer || winner}
                        value={duel.duel?.players[1].id}
                        name='duel'
                        type='radio'
                        className='duel__input' />
                    </label>
                  </div>
                  <button
                    disabled={!winner || winner !== duel.duel?.players[1].id}
                    onClick={handleDecrementScore}
                    type='button'
                    className={`${winner === duel.duel?.players[1].id ? 'duel__player-decrement_type_active' : ''} duel__player-decrement duel__player-decrement_type_right`}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
            <div className='duel__labels'>
              {
                winner !== -1 ?
                  <>
                    <label
                      className={`duel__label duel__no-one page__text ${winner === -1 ? 'duel__label_type_checked' : ''} ${!answer || (winner && winner !== -1) ? 'duel__no-one_type_disabled' : ''}`}
                    >
                      Нет правильного ответа
                      <input
                        checked={winner === -1}
                        onChange={handleSelectWinner}
                        disabled={!answer || (winner && winner !== -1)}
                        value={-1}
                        name='duel'
                        type='radio'
                        className='duel__input' />
                    </label>
                  </>
                  :
                  <button
                    onClick={handleDecrementScore}
                    className={`duel__label duel__no-one page__text ${winner === -1 ? 'duel__label_type_checked' : ''} ${answer ? '' : 'duel__no-one_type_disabled'}`}
                  >
                    Отменить
                  </button>
              }

            </div>
            <div className='duel__footer'>
              <div className='duel__question-container'>
                <p className='duel__subtitle page__title'>
                  Вопрос {questionNumber} <span className='page__span'>/ {questions?.length}</span>
                </p>
                <p className='duel__question page__text'>
                  {duel.duel?.questions[questionCount].question.text}
                </p>
              </div>

              <div className='duel__answer-container'>
                <p className='duel__subtitle page__title'>
                  Правильный ответ
                </p>
                <p className={`duel__answer page__text ${answer ? 'duel__answer_type_visible' : ''}`}>
                  {answer}
                </p>
              </div>
            </div>
            <div className='duel__buttons'>
              <button
                disabled={!!answer}
                onClick={handleShowAnswer}
                type='button'
                className={`page__button page__button_type_white ${answer ? 'duel__answer-button_type_disabled' : ''} page__text`}
              >
                Показать правильный ответ
              </button>
              <button
                disabled={!winner}
                type='submit'
                className={`page__button duel__button_type_submit ${winner ? '' : 'page__button_type_disabled'} page__text`}
              >
                {questions?.length === questionNumber ? 'Завершить соревнование' : 'Следующий вопрос'}
                <img src={arrowToRight} alt='->' className='duel__button-image' />
              </button>
              <button
                onClick={finishedButtonHandler}
                type='button'
                className='duel__link page__button page__button_type_white page__text'
              >
                {questionNumber === 1 ? 'Назад' : 'Завершить соревнование'}
              </button>
            </div>
          </form>
          <img
            className='duel__lang'
            src={languageImage}
            alt={currentLanguage?.title} />
        </section>
        : <Navigate to='/' />
  )
};

export default Duel;