const SuggestQuestion = () => {
  return (
    <section className="offer">
      <h1 className="offer__title sections__secondary-title">
        Предложи свой вопрос
      </h1>
      <p className="offer__description sections__description">
        Здесь у вас есть возможность предложить нам свои варианты вопросов и ответов для наших пользователей. Всего вы
        можете добавить <strong>до 10 вопросов в день</strong>.
        <br />
          В поле «Ваш вопрос» введите вопрос, он должен быть понятным и конкретным, представьте, что такой вопрос задают
          вам и вы понимаете, что на него можно ответить. В поле «Ваш ответ» введите ответ на тот вопрос, который
          вы задали ранее. Ответ также должен быть понятным, конкретным и исчерпывающим. Мы тщательно проверяем
          информацию, которую получаем. После модерации ваши вопросы-ответы попадут в нашу базу данных и помогут
          пользователям учиться и проверять свои знания.
      </p>
      <form className="offer__form sections" name="offer-form">
        <div className="offer__qa-container">
          <h2 className="offer__form-title sections__subtitle">
            Ваш вопрос
          </h2>
          <h2 className="offer__form-title sections__subtitle">
            Ваш ответ
          </h2>
          <div className="offer__textarea-container">
            <textarea id="question" className="offer__textarea page__text" minLength={10} maxLength={500}
              placeholder="Введите вопрос" required></textarea>
            <span id="questionError" className="offer__error page__text">Privet</span>
          </div>
          <div className="offer__textarea-container">
            <textarea id="answer" className="offer__textarea page__text" minLength={10} maxLength={500}
              placeholder="Введите ответ" required></textarea>
            <span id="answerError" className="offer__error page__text">Privet</span>
          </div>
          <p id="questionHint" className="offer__hints page__text">
            0 / 10-500
          </p>
          <p id="answerHint" className="offer__hints page__text">
            0 / 10-500
          </p>
        </div>
        <div className="offer__button-container">
          <button className="offer__button offer__button_type_disabled page__text" disabled>
            Отправить вопрос
          </button>
          <p className="offer__button-hint page__text">
            Вы отправили 0 вопросов из 10 доступных сегодня.
          </p>
        </div>
      </form>
    </section>
  )
};

export default SuggestQuestion;