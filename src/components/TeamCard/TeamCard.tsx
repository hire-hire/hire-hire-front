import { FC } from 'react';
import { Contributor } from '../../store/reducers/contributors/contributorsActionCreator';

import Telegram from '../../images/Telegram.png';
import GitHub from '../../images/Github.png';
import LinkedIn from '../../images/LinkedIn.png';
import Email from '../../images/Email.png';

type PropsType = {
  contributor: Contributor
}

const TeamCard: FC<PropsType> = ({ contributor }) => {

  const baseURL = process.env.REACT_APP_BASE_URL;

  return (
    <li className='contributor'>
      <img src={`${baseURL}${contributor.thumbnail_image}`} alt={`${contributor.first_name} ${contributor.last_name}`} className='contributor__image' />
      <div className='contributor__content'>
        <h3 className='contributor__title page__text'>
          {contributor.first_name} {contributor.last_name}
        </h3>
        <ul className='contributor__contacts page__list'>
          {
            contributor.contacts.map((contact) => {
              return (
                <li key={contact.contact} className='contributor__contact'>
                  <a target='_blank' href={`${contact.social_network.toLowerCase() === 'email' ? `mailto:${contact.contact.replace('http://', '')}` : `${contact.contact}`}`} className='contributor__link' rel='noreferrer'>
                    <img 
                    src={
                      contact.social_network.toLowerCase() === 'telegram'
                       ?
                       Telegram
                       :
                       contact.social_network.toLowerCase() === 'github'
                       ?
                       GitHub
                       :
                       contact.social_network.toLowerCase() === 'linkedin'
                       ?
                       LinkedIn
                       :
                       contact.social_network.toLowerCase() === 'email'
                       ?
                       Email
                       :
                       undefined
                  } 
                    alt={contact.social_network} 
                    className='contributor__link-image' />
                  </a>
                </li>
              )
            })
          }
        </ul>
      </div>
    </li>
  )
};

export default TeamCard;