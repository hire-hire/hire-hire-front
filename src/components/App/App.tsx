import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getUser } from '../../store/reducers/user/userActionCreator';
import Category from '../Category/Category';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import LoginForm from '../LoginForm/LoginForm';
import Main from '../Main/Main';
import MainPage from '../MainPage/MainPage';
import RegisterForm from '../RegisterForm/RegisterForm';
import SuggestQuestion from '../SuggestQuestion/SuggestQuestion';
import TestSettings from '../TestSettings/TestSettings';
import Modal from '../Modal/Modal';
import MobileMenu from '../MobileMenu/MobileMenu';
import Logo from '../Logo/Logo';
import InterviewResult from '../InterviewResult/InterviewResult';
import InterviewRedirect from '../InterviewRedirect/InterviewRedirect';
import Interview from '../Interview/Interview';
import Team from '../Team/Team';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Profile from '../Profile/Profile';
import ExitConfirm from '../ExitConfirm/ExitConfirm';
import DuelSettings from '../DuelSettings/DuelSettings';

function App() {

  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.user.user);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token')!);
    const refreshToken = JSON.parse(localStorage.getItem('refreshToken')!);
    if (!token) {
      return
    } else {
      dispatch(getUser(token, refreshToken));
    };
  }, []);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExitConfirmOpen, setIsExitConfirmOpen] = useState(false);

  const handleOpenMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleOpenExitConfirm = () => {
    setIsExitConfirmOpen(true);
  };

  const handleCloseExitConfirm = () => {
    setIsExitConfirmOpen(false);
  };

  return (
    <>
      <Modal isModalOpen={isMobileMenuOpen} handleCloseModal={handleCloseMobileMenu}>
        <MobileMenu handleCloseMobileMenu={handleCloseMobileMenu}>
          <Logo />
        </MobileMenu>
      </Modal>
      <Modal isModalOpen={isExitConfirmOpen} handleCloseModal={handleCloseExitConfirm}>
        <ExitConfirm handleCloseExitConfirm={handleCloseExitConfirm} />
      </Modal>
      <div className={`page ${isMobileMenuOpen ? 'page_disabled' : ''}`}>

        <Routes>
          <Route path='/' element={
            <>
              <Header
                key={'header'}
                handleOpenMobileMenu={handleOpenMobileMenu}
                handleOpenExitConfirm={handleOpenExitConfirm}
              />
              <Main key={'main'}>
                <MainPage />
              </Main>
              <Footer key={'footer'} />
            </>
          } />
          <Route path='/login' element={
            <>
              <Header
                key={'header'}
                handleOpenMobileMenu={handleOpenMobileMenu}
                handleOpenExitConfirm={handleOpenExitConfirm}
              />
              <Main key={'main'}>
                <LoginForm />
              </Main>
              <Footer key={'footer'} />
            </>

          } />
          <Route path='/register' element={
            <>
              <Header
                key={'header'}
                handleOpenMobileMenu={handleOpenMobileMenu}
                handleOpenExitConfirm={handleOpenExitConfirm}
              />
              <Main key={'main'}>
                <RegisterForm />
              </Main>
              <Footer key={'footer'} />
            </>
          } />
          <Route path='/suggest-question' element={
            <>
              <Header
                key={'header'}
                handleOpenMobileMenu={handleOpenMobileMenu}
                handleOpenExitConfirm={handleOpenExitConfirm}
              />
              <Main key={'main'}>
                <SuggestQuestion />
              </Main>
              <Footer key={'footer'} />
            </>
          } />
          <Route path='/:categoryTitle' element={
            <>
              <Header
                key={'header'}
                handleOpenMobileMenu={handleOpenMobileMenu}
                handleOpenExitConfirm={handleOpenExitConfirm}
              />
              <Main key={'main'}>
                <Category />
              </Main>
              <Footer key={'footer'} />
            </>
          } />
          <Route path='/:categoryTitle/:languageTitle' element={
            <ProtectedRoute isLoggedIn={!!user}>
              <>
                <Header
                  key={'header'}
                  handleOpenMobileMenu={handleOpenMobileMenu}
                  handleOpenExitConfirm={handleOpenExitConfirm}
                />
                <Main key={'main'}>
                  <TestSettings />
                </Main>
                <Footer key={'footer'} />
              </>
            </ProtectedRoute>
          } />
          <Route path='/:categoryTitle/:languageTitle/interview' element={
            <ProtectedRoute isLoggedIn={!!user}>
              <>
                <Header
                  key={'header'}
                  handleOpenMobileMenu={handleOpenMobileMenu}
                  handleOpenExitConfirm={handleOpenExitConfirm}
                />
                <Main key={'main'}>
                  <InterviewRedirect />
                </Main>
                <Footer key={'footer'} />
              </>
            </ProtectedRoute>
          } />
          <Route path='/:categoryTitle/:languageTitle/interview/:interviewId' element={
            <ProtectedRoute isLoggedIn={!!user}>
              <>
                <Header
                  key={'header'}
                  handleOpenMobileMenu={handleOpenMobileMenu}
                  handleOpenExitConfirm={handleOpenExitConfirm}
                />
                <Main key={'main'}>
                  <Interview />
                </Main>
                <Footer key={'footer'} />
              </>
            </ProtectedRoute>
          } />
          <Route path='/:categoryTitle/:languageTitle/interview/:interviewId/interview-result' element={
            <ProtectedRoute isLoggedIn={!!user}>
              <>
                <Header
                  key={'header'}
                  handleOpenMobileMenu={handleOpenMobileMenu}
                  handleOpenExitConfirm={handleOpenExitConfirm}
                />
                <Main key={'main'}>
                  <InterviewResult />
                </Main>
                <Footer key={'footer'} />
              </>
            </ProtectedRoute>
          } />
          <Route path='/team' element={
            <>
              <Header
                key={'header'}
                handleOpenMobileMenu={handleOpenMobileMenu}
                handleOpenExitConfirm={handleOpenExitConfirm}
              />
              <Main key={'main'}>
                <Team />
              </Main>
              <Footer key={'footer'} />
            </>
          } />
          <Route path='/profile/:userName' element={
            <ProtectedRoute isLoggedIn={!!user}>
              <>
                <Header
                  key={'header'}
                  handleOpenMobileMenu={handleOpenMobileMenu}
                  handleOpenExitConfirm={handleOpenExitConfirm}
                />
                <Main key={'main'}>
                  <Profile />
                </Main>
                <Footer key={'footer'} />
              </>
            </ProtectedRoute>
          } />
          <Route path='/games' element={
            <ProtectedRoute isLoggedIn={!!user}>
              <>
                <Header
                  key={'header'}
                  handleOpenMobileMenu={handleOpenMobileMenu}
                  handleOpenExitConfirm={handleOpenExitConfirm}
                />
                <Main key={'main'}>
                  <DuelSettings />
                </Main>
                <Footer key={'footer'} />
              </>
            </ProtectedRoute>
          } />
          <Route path='*' element={
            <NotFound />
          } />
          <Route path='/404' element={
            <NotFound />
          } />
        </Routes>
      </div >
    </>
  );
}

export default App;
