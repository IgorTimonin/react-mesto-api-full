import React from 'react';

export default function InfoToolTip({ isOpen, onClose, regStatus }) {

  return (
    <div
      className={`popup infoToolTip ${isOpen && 'popup_opened'}`}
    >
      <div className='popup__container'>
        <button
          className='popup__btn-close btn-opacity'
          type='button'
          onClick={onClose}
        />
        <div className={`infoToolTip__pic infoToolTip__pic_${regStatus}`}></div>
        <h2 className='infoToolTip_title'>
          {regStatus === 'ok'
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </div>
  );
}
