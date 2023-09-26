// import YTimg from '../../images/YouTube.png';
// import TGimg from '../../images/Telegram.png';
import TelegramIcon from '../../images/telegram_icon.svg';
import YoutubeIcon from '../../images/youtube_icon.svg';

const Footer = () => {

  const footerLinks = [
    {
      link: 'https://t.me/YoutubePronin',
      icon: TelegramIcon,
      alt: 'Социальная сеть, Telegram'
    },
    {
      link: 'https://www.youtube.com/channel/UCI6JEMLSqgbBKgEZR2zrJNw',
      icon: YoutubeIcon,
      alt: 'Youtube'
    }
  ]

  return (
    <footer className='footer'>
      <div className='footer__content'>
        <ul className='footer__links'>
          {footerLinks.map((item, index) => (
            <li key={index}>
              <a href={item.link} target='_blank' rel='noreferrer' className='footer__link page__link'>
                <img src={item.icon} alt={item.alt} className='footer__image'/>
              </a>
            </li>
          ))}
          {/* <a href='https://t.me/YoutubePronin'
            target='_blank' rel='noreferrer' className='footer__link page__link'>
            <img src={TGimg} alt='YouTube' className='footer__image' />
          </a>
          <a href='https://www.youtube.com/channel/UCI6JEMLSqgbBKgEZR2zrJNw' target='_blank' rel='noreferrer' className='footer__link page__link'>
            <img src={YTimg} alt='Telegram' className='footer__image' />
          </a> */}
        </ul>
        <p className='footer__copyright page__text'>
          © НаймиНайми
        </p>
      </div>
    </footer>
  )
};

export default Footer;