import {
    ChangeEvent, useEffect,
    useState,
} from 'react';


const InterviewUserAnswer: React.FC<{ questionNumber: number }> = ({questionNumber}) => {
    const [userAnswer, setUserAnswer] = useState('')

    const changeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setUserAnswer(e.target.value);
    }
    useEffect(() => {
        setUserAnswer('');
    }, [questionNumber])


    return (
        <textarea
            placeholder='Ввести ответ'
            className='interview__user-answer page__text'
            name='interview'
            value={userAnswer}
            onChange={changeInput}
        />
    )
};

export default InterviewUserAnswer;
