import {NavigateFunction} from 'react-router-dom';

export const deleteInterviewAndNavigateToNotFound = (navigate: NavigateFunction) => {
    localStorage.removeItem('userInterview');
    navigate('interview-result');
}
