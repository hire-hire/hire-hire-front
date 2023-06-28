import YTimg from '../../images/YouTube.png';
import TGimg from '../../images/Telegram.png';

const Footer = () => {

  return (
    <footer className='footer'>
      <div className='footer__content'>
        <div className='footer__links'>
          <a href='https://t.me/YoutubePronin'
            target='_blank' rel='noreferrer' className='footer__link page__link'>
            <img src={TGimg} alt='YouTube' className='footer__image' />
          </a>
          <a href='https://www.youtube.com/channel/UCI6JEMLSqgbBKgEZR2zrJNw' target='_blank' rel='noreferrer' className='footer__link page__link'>
            <img src={YTimg} alt='Telegram' className='footer__image' />
          </a>
        </div>
        <p className='footer__copyright page__text'>
          © НаймиНайми
        </p>
      </div>
    </footer>
  )
};

export default Footer;