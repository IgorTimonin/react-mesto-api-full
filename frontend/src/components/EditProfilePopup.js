import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen]);

  function prevInputName() {
    if (!name) {
      setName(currentUser.name);
    } 
  }

    function prevInputDescription() {
      if (!description) {
        setDescription(currentUser.about);
      }
    }

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      btnText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id='name-input'
        className='popup__field popup__field_type_name popup__form-input'
        type='text'
        value={name}
        onChange={handleChangeName}
        onBlur={prevInputName}
        name='name'
        placeholder='Введите имя'
        minLength='2'
        maxLength='40'
        required
        autoComplete='off'
      />
      <span className='name-input-error input-error'>
        Вы пропустили это поле.
      </span>
      <input
        id='job-input'
        className='popup__field popup__field_type_job popup__form-input'
        type='text'
        value={description}
        onChange={handleChangeDescription}
        onBlur={prevInputDescription}
        name='description'
        placeholder='О себе'
        minLength='2'
        maxLength='200'
        required
        autoComplete='off'
      />
      <span className='job-input-error input-error'>
        Вы пропустили это поле.
      </span>
    </PopupWithForm>
  );
}
