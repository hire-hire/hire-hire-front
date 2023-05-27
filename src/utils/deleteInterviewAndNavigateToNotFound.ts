import {NavigateFunction} from 'react-router-dom';

const deleteInterviewAndNavigateToNotFound = (navigate: NavigateFunction) => {
    localStorage.removeItem('userInterview');
    navigate('interview-result');
}

export default deleteInterviewAndNavigateToNotFound