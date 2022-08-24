import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [cardTitle, setCardTitle] = useState('');
  const [cardLink, setCardLink] = useState('');

  function handleChangeNameCardTitle(e) {
    setCardTitle(e.target.value);
  }

  function handleChangeNameCardLink(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      cardTitle,
      cardLink,
    });
  }

  useEffect(() => {
    setCardTitle('');
    setCardLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name='add-card'
      title='Новое место'
      btnText='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id='newcard-name-input'
        className='popup__field popup__field_newcard-name popup__form-input'
        type='text'
        value={cardTitle}
        onChange={handleChangeNameCardTitle}
        name='cardName'
        placeholder='Название'
        minLength='2'
        maxLength='30'
        required
        autoComplete='off'
      />
      <span className='newcard-name-input-error input-error'>
        Вы пропустили это поле.
      </span>
      <input
        id='newcard-url-input'
        className='popup__field popup__field_newcard-adress popup__form-input'
        type='url'
        value={cardLink}
        onChange={handleChangeNameCardLink}
        name='cardAdress'
        placeholder='Ссылка на картинку'
        required
        autoComplete='off'
      />
      <span className='newcard-url-input-error input-error'>
        Введите адрес сайта.
      </span>
    </PopupWithForm>
  );
}
