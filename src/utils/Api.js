class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._header = headers;
  }

  // TODO - create another method, getUserInfo (different base URL)

  getappInfo() {
    return Promise.all([this.getInitialCards()]);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._header,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Error: ${res.status}");
    });
  }
  // TODO - implement Post /cards

  editUserInfo({ name, about }) {
    const res = fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      // Send the data in the body as a JSON string.
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject("Error: ${res.status}");
    });

    return Promise.reject("Not authorized to access this page");
  }

  editAvatarInfo({ avatar }) {
    const res = fetch(`${this._baseUrl}/users/avatar`, {
      method: "PATCH",
      headers: this._headers,
      // Send the data in the body as a JSON string.
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject("Error: ${res.status}");
    });
  }

  deleteCard({ id }) {
    const res = fetch(`${this._baseUrl}/cards/$(id)`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject("Error: ${res.status}");
    });
  }

  changeLikeStatus({ id, isLike }) {
    const res = fetch(`${this._baseUrl}/cards/$(id)/likes`, {
      method: isLike ? "DELETE" : "PUT",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject("Error: ${res.status}");
    });
  }
}
export default Api;
