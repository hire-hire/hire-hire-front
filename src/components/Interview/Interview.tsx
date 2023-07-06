import {
    SyntheticEvent,
    useEffect,
    useRef,
    useState,
} from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import deleteInterviewAndNavigateToNotFound
    from 'utils/deleteInterviewAndNavigateToNotFound';
import interviewImage from 'images/interviewImage.png';
import InterviewUserAnswer from '../InterviewUserAnswer/InterviewUserAnswer';
import useNavigateToNotFound from 'hooks/useNavigateToNotFound';
import {
    fetchAnswer,
    fetchInterview,
    InterviewType,
} from 'store/reducers/interview/interviewActionCreator';


const Interview = () => {
    const [answer, setAnswer] = useState(null);
    const [interview, setInterview] = useState<InterviewType>();
    const [questionCount, setQuestionCount] = useState(0);

    const { languageTitle, interviewId } = useParams();

    const navigate = useNavigate();
    const navigateTo404 = useNavigateToNotFound();

    const answerRef: any = useRef();

    const token = JSON.parse(localStorage.getItem('token')!);

    const questionNumber = questionCount + 1 // cuz many times qC + 1

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchInterview(interviewId!, token)
            .then((interview) => {
                setInterview(interview)
            })
            .catch((err) => {
                console.log(err);
                navigateTo404();
            });

    }, []);

    const handleShowAnswer = (e: SyntheticEvent) => {
        e.preventDefault();

        fetchAnswer(interview!.questions[questionCount].id, token)
            .then(res => setAnswer(res.answer))
            .catch(err => console.log(err));

        answerRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        })
    };

    const handleGoToNextQuestion = (e: SyntheticEvent) => {
        e.preventDefault();
        if (interview?.questions.length !== questionNumber) {
            setAnswer(null);
            setQuestionCount(questionNumber);
        }
        window.scrollTo(0, 0);
    };

    const handleGoToNextQuestionWithRightAnswer = (e: SyntheticEvent) => {
        e.preventDefault();

        if (localStorage.getItem('rightAnswers')) {
            const rightAnswersCount = JSON.parse(localStorage.getItem('rightAnswers')!);
            localStorage.setItem('rightAnswers', JSON.stringify(rightAnswersCount + 1));
        } else {
            localStorage.setItem('rightAnswers', JSON.stringify(1));
        };

        interview?.questions.length === questionNumber ?
            handleInterviewFinished(e) : handleGoToNextQuestion(e);
    };

    const handleGoToNextQuestionWithWrongAnswer = (e: SyntheticEvent) => {
        e.preventDefault();

        if (localStorage.getItem('wrongAnswers')) {
            const wrongAnswersCount = JSON.parse(localStorage.getItem('wrongAnswers')!);
            localStorage.setItem('wrongAnswers', JSON.stringify(wrongAnswersCount + 1));
        } else {
            localStorage.setItem('wrongAnswers', JSON.stringify(1));
        };

        interview?.questions.length === questionNumber ?
            handleInterviewFinished(e) : handleGoToNextQuestion(e);
    };

    const handleInterviewFinished = (e: SyntheticEvent) => {
        e.preventDefault();
        deleteInterviewAndNavigateToNotFound(navigate);
    };

    const buttonText = 'Показать правильный ответ';

    return (
        <section className='interview sections'>
            <h1 className='interview__title page__title'>Испытание <span
                className='page__span'>{`${languageTitle![0].toUpperCase()}${languageTitle?.slice(1)}`}</span>
            </h1>
            <div className='interview__content'>
                <div className='interview__qa-container interview__question'>
                    <h2 className='interview__subtitle page__text'>
                        Вопрос {questionNumber} <span
                            className='interview__subtitle-span'>/ {interview?.questions.length}</span>
                    </h2>
                    <p className='interview__question-text page__text'>
                        {interview?.questions[questionCount].text}
                    </p>
                </div>
                <div
                    className={`interview__qa-container interview__answer 
                    ${answer ? 'interview__answer_type_visible' : ''} page__text`}>
                    <h2 className='interview__subtitle page__text'>
                        Правильный ответ
                    </h2>
                    <p ref={answerRef}
                        className='interview__answer-text page__text'>
                        {answer}
                    </p>
                </div>
                {
                    !answer ?
                        <button
                            onClick={handleShowAnswer}
                            type='button'
                            className='interview__button sections__link interview__button_type_desktop interview__button_type_show-answer'>{buttonText}
                        </button>
                        :
                        <>
                            <button
                                onClick={handleGoToNextQuestionWithRightAnswer}
                                type='button'
                                className='interview__button sections__link interview__button_type_desktop interwiew__button_type_right'>Ответил правильно
                            </button>
                            <button
                                onClick={handleGoToNextQuestionWithWrongAnswer}
                                type='button'
                                className='interview__button sections__link interview__button_type_desktop interwiew__button_type_wrong'>Ответил неправильно
                            </button>
                        </>
                }
                {
                    answer ?
                        <div className='interview__mobile-buttons'>
                            <button
                                onClick={handleGoToNextQuestionWithRightAnswer}
                                type='button'
                                className='interview__button interview__button_type_mobile sections__link interwiew__button_type_right'>Ответил правильно
                            </button>
                            <button
                                onClick={handleGoToNextQuestionWithWrongAnswer}
                                type='button'
                                className='interview__button interview__button_type_mobile sections__link interwiew__button_type_wrong'>Ответил неправильно
                            </button>
                        </div>
                        :
                        <button
                            onClick={handleShowAnswer}
                            type='button'
                            className='interview__button interview__button_type_mobile sections__link'>{buttonText}
                        </button>
                }
            </div>
        </section>
    )
};

export default Interview;
