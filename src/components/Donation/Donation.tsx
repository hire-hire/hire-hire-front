import Input from 'components/Input/Input';
import Label from 'components/Label/Label';
import LabelContainer from 'components/LabelContainer/LabelContainer';
import { useFormWithValidation } from 'hooks/useFormWithValidation';
import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';

const Donation = () => {

  const [isFinished, setIsFinished] = useState(false);

  const {
    values,
    resetForm,
    handleChange } = useFormWithValidation();

  const handleFocus = () => {
    resetForm({ ...values, radio: '' }, {}, false);
  };

  const handleChangeRadio = (e: any) => {
    resetForm({ ...values, cash: '' }, {}, false);
    handleChange(e);
  };

  const handleGoToResult = () => {
    setIsFinished(!isFinished);
  };

  const handleChangeWithValidation = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
    if(Number(e.target.value) === 0) {
      resetForm();
    } else {
      let {value} = e.target;
      value = String(Math.ceil(Number(value.slice(0, 6))));
      resetForm({cash: value}, {}, true);
    }
  };

  return (
    <section className='donation sections'>
      <h1 className='donation__title page__title'>
        За<span className='page__span'>Донатить</span>
      </h1>
      {
        isFinished
          ?
          <>
            <p className='page__text donation__text donation__text_type_thanks'>
              <span className='page__span'>Спасибо</span>, что ты с нами!
            </p>
            <p className='page__text donation__text donation__text_type_thanks'>
              Мы <span className='page__span'>очень рады</span>, что <span className='donation__span'>НаймиНайми</span> находит <span className='page__span'>отклик в сердцах</span> людей. <span className='page__span'>Твоя поддержка</span> и донаты помогают нам <span className='page__span'>развиваться и двигаться</span> вперед. <span className='page__span'>Спасибо</span>, что <span className='page__span'>веришь</span> в нас и <span className='page__span'>поддерживаешь наш труд</span>. Мы ценим <span className='page__span'>твое участие</span> и будем продолжать работать над тем, чтобы сделать наш проект <span className='page__span'>еще лучше</span> и полезнее для всех.
            </p>
            <Link to='/' className='donation__link page__link page__button'>На главную страницу</Link>
          </>
          :
          <>
            <p className='donation__text page__text'>
              <span className='page__span'>Спасибо,</span> что интересуешься нашим проектом!
            </p>
            <p className='donation__text page__text'>
              <span className='page__span'>Мы очень рады, </span>
              что наша работа находит <span className='page__span'>отклик в сердцах</span> людей. Если хочешь <span className='page__span'>поддержать</span> наш проект, будем <span className='page__span'>очень благодарны</span> за любую помощь.
            </p>
            <p className='donation__text page__text'>
              Ты можешь<span className='page__span'> сделать пожертвование</span> на <span className='page__span'>развитие проекта.</span> Твоя поддержка позволит нам оплачивать сервер, продолжать развиваться и <span className='page__span'>мотивировать ребят,</span> участвующих в проекте, <span className='page__span'>делать наш мир лучше.</span>
            </p>
            <p className='donation__text page__text'>
              Спасибо еще раз за <span className='page__span'>твоё участие!</span>
            </p>
            <form className='donation__form'>
              <h2 className='page__title donation__form-title'>
                Выбери <span className='page__span'>сумму доната</span>
              </h2>
              <div className='donation__form-labels'>
                <label className={`donation__form-label page__button page__button_type_white ${values.radio === '100' ? 'donation__form-label_type_checked' : ''}`}>
                  100 ₽
                  <input
                    checked={values.radio === '100'}
                    onChange={handleChangeRadio}
                    value={'100'}
                    name='radio'
                    type='radio'
                    className='donation__form-radio' />
                </label>
                <label className={`donation__form-label page__button page__button_type_white ${values.radio === '300' ? 'donation__form-label_type_checked' : ''}`}>
                  300 ₽
                  <input
                    checked={values.radio === '300'}
                    onChange={handleChangeRadio}
                    value={'300'}
                    name='radio'
                    type='radio'
                    className='donation__form-radio' />
                </label>
                <label className={`donation__form-label page__button page__button_type_white ${values.radio === '500' ? 'donation__form-label_type_checked' : ''}`}>
                  500 ₽
                  <input
                    checked={values.radio === '500'}
                    onChange={handleChangeRadio}
                    value={'500'}
                    name='radio'
                    type='radio'
                    className='donation__form-radio' />
                </label>
              </div>
              <Label position='donation'>
                <LabelContainer hint='Для ввода суммы можно использовать только цифры. Сумма вводится без копеек'>
                  <Input
                    value={values.cash || ''}
                    handleChange={handleChangeWithValidation}
                    handleFocus={handleFocus}
                    type='number'
                    name='cash'
                    maxLength={6}
                    minLength={1}
                    step='1'
                    placeholder='Другая сумма'
                  />
                </LabelContainer>
              </Label>
              <button
                onClick={handleGoToResult}
                disabled={values.radio ? false : values.cash ? false : true}
                className={`donation__button page__button ${!values.radio ? !values.cash ? 'page__button_type_disabled' : '' : ''}`}
                type='button'>
                ЗаДонатить
              </button>
            </form>
          </>
      }
    </section>
  )
};

export default Donation;