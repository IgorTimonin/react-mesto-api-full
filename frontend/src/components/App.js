import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '../index.css';
import userPic from '../images/user.png';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api.js';
import { apiAuth } from '../utils/ApiAuth.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute';
import InfoToolTip from './InfoTooltip';

function App() {
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isRegStatus, setIsRegStatus] = useState('');
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({
    name: 'пользователь',
    about: 'профессия',
    avatar: userPic,
    email: '',
  });
  const [headerEmail, setHeaderEmail] = useState();
  const [currentCard, setCurrentCard] = useState({});
  const userDataTargetUrl =
    'https://api.itmesto.students.nomoredomains.sbs/users/me';
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggenIn] = useState(false);
  const nav = useNavigate();
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isInfoToolTipOpen ||
    selectedCard;

  function onSignUp(email, password) {
    apiAuth
      .signInSignUp('/signup', email, password)
      .then((res) => {
        if (res.statusCode !== 400) {
          setIsRegStatus('ok');
          setIsInfoToolTipOpen(true);
        }
      })
      .catch((err) => {
        setIsRegStatus('error');
        setIsInfoToolTipOpen(true);
      });
  }

  function onSignIn(password, email) {
    apiAuth
      .signInSignUp('/signin', password, email)
      .then((res) => {
        if (res) {
          localStorage.setItem('sessionToken', '1');
          checkSessionToken();
        }
        if (res.cookie === undefined) {
          console.log('Для авторизации необходимо использовать HTTPS протокол')
        }
      })
      .catch((err) => console.log(err));
  }

  function checkSessionToken() {
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken === '1') {
      tokenCheck();
    } else {
      console.log('Неверный токен сессии');
    }
  }

  function logUot() {
    localStorage.removeItem('sessionToken');
    setLoggenIn(false);
  }

  function onRegisterRedirect() {
    closeAllPopups();
    nav('/sign-in');
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
  }, [isOpen]);

  function tokenCheck() {
    apiAuth
      .userValidation('/users/me')
      .then((res) => {
        if (res.email) {
          setHeaderEmail(res.email);
          setCurrentUser(res);
          initCards();
          setLoggenIn(true);
        }
      })
      .catch((err) => console.log(err));
  }

  const initCards = () => {
    api
      .getInitialCards()
      .then((cardsList) => {
        setCards(cardsList);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    nav('/');
  }, [loggedIn]);

  useEffect(() => {
    checkSessionToken();
  }, []);

  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточек
    api
      .likeSwitcher(card._id, isLiked)
      .then((newCards) => {
        setCards((data) =>
          data.map((c) => (c._id === card._id ? newCards : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDeleteConfirm() {
    //Отправляем запрос на удаление в API, получаем обновлённые данные карточек, фильтром создаём новый объект карточек, без карточки с удалённым id
    api
      .deleteCard(currentCard._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== currentCard._id);
        setCards(newCards);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleDeleteClick = (cardId) => {
    setCurrentCard(cardId);
    setIsConfirmDeletePopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsInfoToolTipOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    handleCardClick('');
  };

  const handleCardClick = (data) => {
    setSelectedCard(data);
  };

  const handleUpdateUser = (userData) => {
    api
      .setUserData(userDataTargetUrl, userData)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (avatarLink) => {
    api
      .setUserAvatar(userDataTargetUrl, avatarLink.avatar)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleAddPlaceSubmit = (cardData) => {
    api
      .setNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path='/sign-in' element={<Login onSignIn={onSignIn} />}></Route>
        <Route
          path='/sign-up'
          element={<Register onSignUp={onSignUp} />}
        ></Route>
        <Route
          path='/'
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <div>
                <Header
                  userEmail={headerEmail}
                  loggedIn={loggedIn}
                  headerBtnText='Выйти'
                  headerBtnAction={logUot}
                />
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteClick}
                />
                <Footer />

                <ConfirmDeletePopup
                  isOpen={isConfirmDeletePopupOpen}
                  onClose={closeAllPopups}
                  onConfirmCardDelete={handleCardDeleteConfirm}
                />

                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                />

                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlace={handleAddPlaceSubmit}
                />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
              </div>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
      <InfoToolTip
        isOpen={isInfoToolTipOpen}
        onClose={onRegisterRedirect}
        regStatus={isRegStatus}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
