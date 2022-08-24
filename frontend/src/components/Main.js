import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  
  return (
    <main>
      <section className='profile'>
        <button className='profile__avatar-btn' onClick={onEditAvatar}>
          <img
            className='profile__avatar profile__avatar_opacity'
            src={currentUser.avatar}
            alt='Аватар пользователя'
          />
        </button>
        <div className='profile__info'>
          <div className='profile__container'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button
              className='profile__edit-btn btn-opacity'
              type='button'
              onClick={onEditProfile}
            />
          </div>
          <p className='profile__job'>{currentUser.about}</p>
        </div>
        <button
          className='profile__add-btn btn-opacity'
          type='button'
          onClick={onAddPlace}
        />
      </section>
      <section className='gallery'>
        <ul className='gallery__cards'>
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
