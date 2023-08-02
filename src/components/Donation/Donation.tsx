import Input from 'components/Input/Input';
import Label from 'components/Label/Label';
import LabelContainer from 'components/LabelContainer/LabelContainer';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useFormWithValidation } from 'hooks/useFormWithValidation';
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { DonationAmountType, getAmounts, makeDonation } from 'store/reducers/donation/donationActionCreator';
import { donationLinkReset } from 'store/reducers/donation/donationSlice';

type PropsType = {
  handleOpenErrorPopup: () => void
}

const Donation:FC<PropsType> = ({ handleOpenErrorPopup }) => {

  const dispatch = useAppDispatch();
  const donationLink = useAppSelector(state => state.donation.donationLink);
  const donationError = useAppSelector(state => state.donation.error);

  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [amounts, setAmounts] = useState<DonationAmountType[]>();

  useEffect(() => {
    
    if(donationLink) {
      window.location.assign(donationLink);
      dispatch(donationLinkReset());
    } else {
      getAmounts()
      .then(res => setAmounts(res))
      .catch(err => console.log(err));
    }

    if(donationError) {
      handleOpenErrorPopup();
    }

  }, [donationLink, donationError]);

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

  const handleKeyPress = (e: any) => ['e', 'E', '+', '-', '.', ',', ' ', 'ArrowUp', 'ArrowDown'].includes(e.key) && e.preventDefault();

  const handleChangeWithValidation = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {

    if (Number(e.target.value) === 0) {
      resetForm();
    } else {
      let { value } = e.target;
      value = String(Math.ceil(parseInt(value.slice(0, 6))))
      resetForm({ cash: value }, {}, true);
    }
  };

  const handlePasteWithValidation = (e: any) => {
    e.preventDefault();
  };

  const handleChangeAgreement = () => {
    setIsAgreementChecked(prev => !prev);
  };

  const handleSubmitDonation = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.radio && !values.cash) {
      dispatch(makeDonation(Number(values.radio), 'RUB'))
    };

    if (values.cash && !values.radio) {
      dispatch(makeDonation(Number(values.cash), 'RUB'))
    };

  };

  return (

    <section className='donation sections'>
      <h1 className='donation__title page__title'>
        За<span className='page__span'>Донатить</span>
      </h1>
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
      <form
        onSubmit={handleSubmitDonation}
        className='donation__form'
        noValidate
      >
        <h2 className='page__title donation__form-title'>
          Выбери <span className='page__span'>сумму доната</span>
        </h2>
        <div className='donation__form-labels'>
          {
            amounts ?
              amounts.map((amount) => {
                return (
                  <label key={amount.id} className={`donation__form-label page__button page__button_type_white ${Number(values.radio) === amount.value ? 'donation__form-label_type_checked' : ''}`}>
                    {amount.value} ₽
                    <input
                      checked={values.radio === amount.value}
                      onChange={handleChangeRadio}
                      value={amount.value}
                      name='radio'
                      type='radio'
                      className='donation__form-radio' />
                  </label>
                )
              })
              : null
          }
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
              min={0}
              handleKeyPress={handleKeyPress}
              handlePaste={handlePasteWithValidation}
            />
          </LabelContainer>
        </Label>
        <div className='donation__agreement'>
          <label className={`donation__agreement-label ${isAgreementChecked ? 'donation__agreement-label_type_checked' : ''}`}>
            <input
              onChange={handleChangeAgreement}
              checked={isAgreementChecked}
              name='agreement'
              type='checkbox'
              className='donation__agreement-checkbox'
              required />
          </label>
          <p className='donation__agreement-text page__text'>
            Ознакомлен с <a rel='noreferrer' target='_blank' href={`${process.env.REACT_APP_BASE_URL}/agreement`} className='donation__agreement-link page__span'>
              Пользовательским соглашением
            </a>
          </p>
        </div>
        <button
          disabled={(values.radio && isAgreementChecked) ? false : (values.cash && isAgreementChecked) ? false : true}
          className={`donation__button page__button ${(values.radio && isAgreementChecked) || (values.cash && isAgreementChecked) ? '' : 'page__button_type_disabled'}`}
          type='submit'
        >
          ЗаДонатить
        </button>
      </form>
    </section>
  )
};

export default Donation;