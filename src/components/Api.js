export default class Api {
  constructor(options) {
    this._options = options;
  }
  getUserInfo() {
    return fetch(
      'https://mesto.nomoreparties.co/v1/cohort-48/users/me', {
      headers: {
        authorization: '65de8f77-f8b8-413c-888a-b451adbbaac0',
        'Content-Type': 'application/json'
      }
    }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      )
  }

  setNewUserInfo(name, about) {
    return fetch(
      'https://mesto.nomoreparties.co/v1/cohort-48/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '65de8f77-f8b8-413c-888a-b451adbbaac0',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      )
  }

  getInitialCards() {
    return fetch(
      'https://mesto.nomoreparties.co/v1/cohort-48/cards', {
        method: 'GET',
      headers: {
        authorization: '65de8f77-f8b8-413c-888a-b451adbbaac0',
        'Content-Type': 'application/json'
      }
    }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => console.log(err))
  }

  addNewCard(name, link) {
    return fetch(
      'https://mesto.nomoreparties.co/v1/cohort-48/cards', {
      method: 'POST',
      headers: {
        authorization: '65de8f77-f8b8-413c-888a-b451adbbaac0',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      )
  }
}



