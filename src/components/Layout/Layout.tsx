import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Main from 'components/Main/Main';
import { FC, ReactElement } from 'react';

type PropsType = {
  children: ReactElement
  handleOpenMobileMenu: () => void
  handleOpenExitConfirm: () => void
}

const Layout: FC<PropsType> = ({

  children, 
  handleOpenMobileMenu, 
  handleOpenExitConfirm}) => {

  return (
    <>
      <Header
        key={'header'}
        handleOpenMobileMenu={handleOpenMobileMenu}
        handleOpenExitConfirm={handleOpenExitConfirm}
      />
      <Main key={'main'}>
        {children}
      </Main>
      <Footer key={'footer'} />
    </>
  )
};

export default Layout;