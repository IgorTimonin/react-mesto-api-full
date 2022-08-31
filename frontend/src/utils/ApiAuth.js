import { resultHandler } from './Api';

class ApiAuth {
  constructor() { this.baseAuthUrl = 'https://api.itmesto.students.nomoredomains.sbs';
    // this.baseAuthUrl = "TEST_Auth"
    // /https?:\/\/api.itmesto.students.nomoredomains.sbs/;
    // this.baseAuthUrl = 'https://api.itmesto.students.nomoredomains.sbs';
  }

  signInSignUp(endpoint, password, email) {
    return fetch(this.baseAuthUrl + `${endpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(password, email),
    }).then(resultHandler);
  }

  userValidation(endpoint) {
    return fetch(this.baseAuthUrl + `${endpoint}`, {
      method: 'GET',
      credentials: 'include',
    }).then(resultHandler);
  }
}

export const apiAuth = new ApiAuth();
