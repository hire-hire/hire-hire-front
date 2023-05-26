import {
    ChangeEvent,
    SyntheticEvent,
    useEffect,
    useRef,
    useState
} from 'react';

import {useNavigate, useParams} from 'react-router-dom';

import interviewImage from '../../images/interviewImage.png';
import {QAType} from "./interfaces";
import {useFormWithValidation} from '../../hooks/useFormWithValidation';
import {
    fetchAnswer,
    fetchInterview,
    InterviewType,
} from '../../store/reducers/interview/interviewActionCreator';

const Interview = () => {
    const [answer, setAnswer] = useState(null);
    const [interview, setInterview] = useState<InterviewType>();
    const [questionCount, setQuestionCount] = useState(0);
    const [userAnswer, setUserAnswer] = useState('')

    const {values} = useFormWithValidation();

    const {languageTitle, interviewId} = useParams();

    const navigate = useNavigate();

    const answerRef: any = useRef();

    const token = JSON.parse(localStorage.getItem('token')!);

    useEffect(() => {
        if (interviewId) {
            fetchInterview(interviewId, token)
                .then((interview) => {
                    setInterview(interview)
                })
                .catch((err) => {
                    navigate('/404');
                    return
                });
        }
    }, []);

    const changeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setUserAnswer(e.target.value);
    }
    const handleShowAnswer = (e: SyntheticEvent) => {
        e.preventDefault();
        const userInterviewArr = JSON.parse(localStorage.getItem('userInterview')!);

        let qa = {} as QAType;

        if (interview) {
            qa = {
                question: interview.questions[questionCount].text,
                userAnswer: values.interview || '',
            }
        }


        if (!userInterviewArr) {
            const qaArr: QAType[] = [];
            qaArr.push(qa);
            localStorage.setItem('userInterview', JSON.stringify(qaArr));
        } else {
            const newUserInterviewArr: QAType[] = userInterviewArr.map((item: QAType) => item);
            newUserInterviewArr.push(qa);
            localStorage.setItem('userInterview', JSON.stringify(newUserInterviewArr));
        }


        if (interview) {
            fetchAnswer(interview.questions[questionCount].id, token)
                .then(res => setAnswer(res.answer))
                .catch(err => console.log(err));
        }

        if (answerRef.current) {
            answerRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        }

    };

    const handleGoToNextQuestion = (e: SyntheticEvent) => {
        e.preventDefault();
        if (interview?.questions.length !== questionCount + 1) {
            setAnswer(null);
            setUserAnswer('')
            setQuestionCount(questionCount + 1);
        }
    };

    const handleInterviewFinished = (e: SyntheticEvent) => {
        e.preventDefault();
        localStorage.removeItem('userInterview');
        navigate(`interview-result`);
    };

    return (
        <section className='interview sections'>
            <h1 className='interview__title page__title'>Испытание <span
                className='page__span'>{`${languageTitle![0].toUpperCase()}${languageTitle?.slice(1)}`}</span>
            </h1>
            <div className='interview__content'>
                <div className='interview__qa-container interview__question'>
                    <h2 className='interview__subtitle page__text'>
                        Вопрос {questionCount + 1} <span
                        className='interview__subtitle-span'>/ {interview?.questions.length}</span>
                    </h2>
                    <p className='interview__question-text page__text'>
                        {interview?.questions[questionCount].text}
                    </p>
                </div>
                <div
                    className={`interview__qa-container interview__answer ${answer ? 'interview__answer_type_visible'
                        : ''} page__text`}>
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
                    <textarea placeholder='Ввести ответ'
                              className='interview__user-answer page__text'
                              name='interview'
                              value={userAnswer}
                              onChange={changeInput}
                    >

                    </textarea>
                    <button
                        onClick={answer ? interview?.questions.length === questionCount + 1 ? handleInterviewFinished : handleGoToNextQuestion : handleShowAnswer}
                        type='button'
                        className='interview__button sections__link interview__button_type_desktop'>{answer ? interview?.questions.length === questionCount + 1 ? 'Завершить испытание' : 'Следующий вопрос' : 'Показать правильный ответ'}
                    </button>
                </form>
                <img src={interviewImage} alt='Квадратики'
                     className='interview__image'/>
                <button
                    onClick={answer ? interview?.questions.length === questionCount + 1 ? handleInterviewFinished : handleGoToNextQuestion : handleShowAnswer}
                    type='button'
                    className='interview__button interview__button_type_mobile sections__link'>{answer ? interview?.questions.length === questionCount + 1 ? 'Завершить испытание' : 'Следующий вопрос' : 'Показать правильный ответ'}</button>
            </div>
        </section>
    )
};

export default Interview;