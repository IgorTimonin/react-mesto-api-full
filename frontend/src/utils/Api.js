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
    this.baseAuthUrl = 'https://api.itmesto.students.nomoredomains.sbs';
  }

  getInitialCards() {
    return fetch(this._baseUrl, {
      credentials: 'include',
      headers: this._headers,
    }).then(resultHandler);
  }

  getUserData(targetApiUrl) {
    return fetch(targetApiUrl, {
      credentials: 'include',
      headers: this._headers,
    }).then(resultHandler);
  }

  setUserData(targetApiUrl, userData) {
    return fetch(targetApiUrl, {
      method: 'PATCH',
      credentials: 'include',
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
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(resultHandler);
  }

  setNewCard(cardData) {
    return fetch(this._baseUrl, {
      method: 'POST',
      credentials: 'include',
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
      credentials: 'include',
      headers: this._headers,
    }).then(resultHandler);
  }

  likeSwitcher(cardId, isLiked) {
    if (isLiked) {
      return fetch(this._baseUrl + `/${cardId}/likes`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers,
      }).then(resultHandler);
    } else {
      return fetch(this._baseUrl + `/${cardId}/likes`, {
        method: 'PUT',
        credentials: 'include',
        headers: this._headers,
      }).then(resultHandler);
    }
  }
}

  export const api = new Api(
    'https://api.itmesto.students.nomoredomains.sbs/cards',
    {
      'Content-Type': 'application/json',
    }
  );