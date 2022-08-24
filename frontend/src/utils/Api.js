export const resultHandler = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this.baseAuthUrl = 'https://auth.nomoreparties.co';
  }

  signInSignUp(endpoint, password, email) {
    return fetch(this.baseAuthUrl + `${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        password,
        email,
      ),
    }).then(resultHandler);
  }

  getInitialCards() {
    return fetch(this._baseUrl, {
      headers: this._headers,
    }).then(resultHandler);
  }

  getUserData(targetApiUrl) {
    return fetch(targetApiUrl, {
      headers: this._headers,
    }).then(resultHandler);
  }

  setUserData(targetApiUrl, userData) {
    return fetch(targetApiUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    }).then(resultHandler);
  }

  setUserAvatar(targetApiUrl, avatar) {
    return fetch(targetApiUrl + '/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(resultHandler);
  }

  setNewCard(cardData) {
    return fetch(this._baseUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.cardTitle,
        link: cardData.cardLink,
      }),
    }).then(resultHandler);
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + `/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(resultHandler);
  }

  likeSwitcher(cardId, isLiked) {
    if (isLiked) {
      return fetch(this._baseUrl + `/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      }).then(resultHandler);
    } else {
      return fetch(this._baseUrl + `/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
      }).then(resultHandler);
    }
  }
}

export const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-41/cards',
  {
    authorization: '1958a966-a982-4094-8b61-ad54c8ab2b4e',
    'Content-Type': 'application/json',
  }
);
