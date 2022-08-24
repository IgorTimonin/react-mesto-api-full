import React from 'react';
import PageWithForm from './PageWithForm';

export default function Login({ onSignIn}) {
  return (
    <PageWithForm
      title='Вход'
      btnText='Войти'
      name='login'
      headerBtnText='Регистрация'
      headerLinkPath='/sign-up'
      inputId='current-password'
      onSubmit={onSignIn}
    ></PageWithForm>
  );
}