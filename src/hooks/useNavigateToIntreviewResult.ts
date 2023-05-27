import {useNavigate} from 'react-router-dom';

const useDeleteInterviewAndNavigateToNotFound = (): (() => void) => {
    const navigate = useNavigate();
    return (): void => {
        localStorage.removeItem('userInterview');
        navigate(`interview-result`);
    };
};

export default useDeleteInterviewAndNavigateToNotFound;
