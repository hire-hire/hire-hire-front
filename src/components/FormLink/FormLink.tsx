import { Link } from 'react-router-dom';
import { FC } from 'react';

type PropsType = {
  path: string
  title: string
}

const FormLink: FC<PropsType> = ({ path, title }) => {
  return (
    <Link to={path} className='page__link page__text form-link'  aria-label={`ссылка перехода на страницу ${title.toLowerCase()}`}>
      {title}
    </Link>
  )
};

export default FormLink;