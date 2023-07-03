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
import Duel from '../Duel/Duel';
import DuelResult from '../DuelResult/DuelResult';
import Donation from 'components/Donation/Donation';
import Layout from 'components/Layout/Layout';
import Agreement from 'components/Agreement/Agreement';

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
      <Modal
        isModalOpen={isMobileMenuOpen}
        handleCloseModal={handleCloseMobileMenu}>
        <MobileMenu
          handleCloseMobileMenu={handleCloseMobileMenu}
          handleOpenExitConfirm={handleOpenExitConfirm}
        >
          <Logo />
        </MobileMenu>
      </Modal>
      <Modal
        isModalOpen={isExitConfirmOpen}
        handleCloseModal={handleCloseExitConfirm}>
        <ExitConfirm handleCloseExitConfirm={handleCloseExitConfirm} />
      </Modal>
      <div className={`page ${isMobileMenuOpen ? 'page_disabled' : ''}`}>

        <Routes>
          <Route path='/' element={
            <Layout
              handleOpenMobileMenu={handleOpenMobileMenu}
              handleOpenExitConfirm={handleOpenExitConfirm}>
              <MainPage />
            </Layout>
          } />
          <Route path='/login' element={
            <Layout
              handleOpenMobileMenu={handleOpenMobileMenu}
              handleOpenExitConfirm={handleOpenExitConfirm}>
              <LoginForm />
            </Layout>
          } />
          <Route path='/register' element={
            <Layout
              handleOpenMobileMenu={handleOpenMobileMenu}
              handleOpenExitConfirm={handleOpenExitConfirm}>
              <RegisterForm />
            </Layout>
          } />
          <Route path='/suggest-question' element={
            <Layout
              handleOpenMobileMenu={handleOpenMobileMenu}
              handleOpenExitConfirm={handleOpenExitConfirm}>
              <SuggestQuestion />
            </Layout>
          } />
          <Route path='/:categoryTitle' element={
            <Layout
              handleOpenMobileMenu={handleOpenMobileMenu}
              handleOpenExitConfirm={handleOpenExitConfirm}>
              <Category />
            </Layout>
          } />
          <Route path='/:categoryTitle/:languageTitle' element={
            <ProtectedRoute isLoggedIn={!!user}>
              <Layout
                handleOpenMobileMenu={handleOpenMobileMenu}
                handleOpenExitConfirm={handleOpenExitConfirm}>
                <TestSettings />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path='/:categoryTitle/:languageTitle/interview' element={
            <ProtectedRoute isLoggedIn={!!user}>
              <Layout
                handleOpenMobileMenu={handleOpenMobileMenu}
                handleOpenExitConfirm={handleOpenExitConfirm}>
                <InterviewRedirect />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path='/:categoryTitle/:languageTitle/interview/:interviewId' element={
            <ProtectedRoute isLoggedIn={!!user}>
              <Layout
                handleOpenMobileMenu={handleOpenMobileMenu}
                handleOpenExitConfirm={handleOpenExitConfirm}>
                <Interview />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path='/:categoryTitle/:languageTitle/interview/:interviewId/interview-result' element={
            <ProtectedRoute isLoggedIn={!!user}>
              <Layout
                handleOpenMobileMenu={handleOpenMobileMenu}
                handleOpenExitConfirm={handleOpenExitConfirm}>
                <InterviewResult />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path='/team' element={
            <Layout
              handleOpenMobileMenu={handleOpenMobileMenu}
              handleOpenExitConfirm={handleOpenExitConfirm}>
              <Team />
            </Layout>
          } />
          <Route path='/profile/:userName' element={
            <ProtectedRoute isLoggedIn={!!user}>
              <Layout
                handleOpenMobileMenu={handleOpenMobileMenu}
                handleOpenExitConfirm={handleOpenExitConfirm}>
                <Profile />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path='/games' element={
            <Layout
              handleOpenMobileMenu={handleOpenMobileMenu}
              handleOpenExitConfirm={handleOpenExitConfirm}>
              <DuelSettings />
            </Layout>
          } />
          <Route path='/games/:duelId' element={
            <Layout
              handleOpenMobileMenu={handleOpenMobileMenu}
              handleOpenExitConfirm={handleOpenExitConfirm}>
              <Duel />
            </Layout>
          } />
          <Route path='/games/:duelId/result' element={
            <Layout
              handleOpenMobileMenu={handleOpenMobileMenu}
              handleOpenExitConfirm={handleOpenExitConfirm}>
              <DuelResult />
            </Layout>
          } />
          <Route path='/donation' element={
            <Layout
              handleOpenMobileMenu={handleOpenMobileMenu}
              handleOpenExitConfirm={handleOpenExitConfirm}>
              <Donation />
            </Layout>
          } />
          <Route path='/agreement' element={
            <Agreement />
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
