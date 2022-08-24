import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function ConfirmDeletePopup({
  isOpen,
  onClose,
  onConfirmCardDelete,
}) {
  function handlerConfirm(e) {
    e.preventDefault();
    onConfirmCardDelete();
  }

  return (
    <PopupWithForm
      name='submit'
      title='Вы уверены?'
      btnText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handlerConfirm}
    />
  );
}