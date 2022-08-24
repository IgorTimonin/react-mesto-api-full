export default function PopupWithForm(props) {
  return (
    <div
      className={`popup popup-${props.name} ${
        props.isOpen && 'popup_opened' ? 'popup_opened' : ''
      }`}
    >
      <div className='popup__container'>
        <button
          className='popup__btn-close btn-opacity'
          type='button'
          onClick={props.onClose}
        />
        <h2 className={`popup__title ${!props.title && 'popup__btn-hide'}`}>
          {props.title}
        </h2>
        <form
          onSubmit={props.onSubmit}
          className={`popup__form popup__${props.name}_form`}
          name={`${props.name}_form`}
          action='#'
          noValidate
        >
          {props.children}
          <button
            className={`popup__btn-save popup__form-submit ${
              !props.btnText && 'popup__btn_hide'
            }`}
            type='submit'
          >
            {props.btnText}
          </button>
        </form>
      </div>
    </div>
  );
}
