class Api {
  constructor() {
    this._url = "http://api.trallik-mesto.nomoredomainsmonster.ru";
  }

  _sendRequest(url, options) {
    return fetch(url, options).then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(response.status);
    });
  }

  getCardsList() {
    return this._sendRequest(`${this._url}/cards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
    });
  }

  getUserInfo() {
    return this._sendRequest(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
    });
  }

  updateUserInfo({ name, about }) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({ name, about }),
    });
  }

  createCard({ name, link }) {
    return this._sendRequest(`${this._url}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({ name, link }),
    });
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this._removeLikeFromCard(id);
    } else {
      return this._likeCard(id);
    }
  }

  deleteCard(id) {
    return this._sendRequest(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
    });
  }

  _likeCard(id) {
    return this._sendRequest(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
    });
  }

  _removeLikeFromCard(id) {
    return this._sendRequest(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
    });
  }

  changeAvatar(avatar) {
    return this._sendRequest(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({ avatar }),
    });
  }
}

export const api = new Api();
