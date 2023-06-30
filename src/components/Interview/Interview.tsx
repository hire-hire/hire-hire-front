import {
    SyntheticEvent,
    useEffect,
    useRef,
    useState,
} from 'react';

import {useNavigate, useParams} from 'react-router-dom';

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

    const {languageTitle, interviewId} = useParams();

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

    const handleInterviewFinished = (e: SyntheticEvent) => {
        e.preventDefault();
        deleteInterviewAndNavigateToNotFound(navigate);
    };


    const buttonHandler = answer ? interview?.questions.length === questionNumber ?
        handleInterviewFinished : handleGoToNextQuestion : handleShowAnswer
    const buttonText = answer ? interview?.questions.length === questionNumber ?
        'Завершить испытание' : 'Следующий вопрос' : 'Показать правильный ответ'

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
                <form className='interview__form'>
                    <h2 className='interview__subtitle page__text'>
                        Ответ <span className='interview__span page__text'>(Не обязательно для заполнения)</span>
                    </h2>
                    <InterviewUserAnswer questionNumber={questionNumber}/>

                    <button
                        onClick={buttonHandler}
                        type='button'
                        className='interview__button sections__link interview__button_type_desktop'>{buttonText}
                    </button>
                </form>
                <img src={interviewImage} alt='Квадратики'
                     className='interview__image'/>
                <button
                    onClick={buttonHandler}
                    type='button'
                    className='interview__button interview__button_type_mobile sections__link'>{buttonText}
                </button>
            </div>
        </section>
    )
};

export default Interview;
