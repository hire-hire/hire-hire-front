import { FC, ReactNode } from 'react';

type PropsType = {
  children: ReactNode;
}

const Main: FC<PropsType> = ({ children }) => {

  return (
    <main className='main'>
      { children }
    </main>
  )
};

export default Main;