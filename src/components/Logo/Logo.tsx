import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { FC } from 'react';

type PropsType = {
  place?: string
};

const Logo: FC<PropsType> = ({ place }) => {
  return (
    <Link to='/' className='logo page__link'>
      <img src={logo} alt='Логотип НаймиНайми' className='logo__image' />
      <p className={`logo__title ${place ? 'logo__title_place_header'  : ''}`}>НаймиНайми</p>
    </Link>
  )
};

export default Logo;