import { resultHandler } from './Api';

class ApiAuth {
  constructor() {
    this.baseAuthUrl = 'https://api.itmesto.students.nomoredomains.sbs';
  }

  signInSignUp(endpoint, password, email) {
    return fetch(this.baseAuthUrl + `${endpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(password, email),
    }).then(resultHandler);
  }

  userValidation(endpoint, jwt) {
    return fetch(this.baseAuthUrl + `${endpoint}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }).then(resultHandler);
  }
}

export const apiAuth = new ApiAuth();
