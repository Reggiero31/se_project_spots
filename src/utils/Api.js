class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._header = headers;
  }

  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getappInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
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

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._header,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Error: ${res.status}");
    });
  }

  async editUserInfo({ name, about }) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._header,
      // Send the data in the body as a JSON string.
      body: JSON.stringify({
        name,
        about,
      }),
    });
    return this._handleResponse(res);
  }

  editAvatarInfo(avatar) {
    console.log(avatar);

    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._header,
      // Send the data in the body as a JSON string.
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._handleResponse);
  }

  // 1. create a function with the API request to create the card
  // 2. creation the card API request will return you card data WITH ID
  // 3. this ID you need to add the to likes request, otherwise server don't know what to handle

  CreateCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._header,
      body: JSON.stringify({ name, link }),
    }).then((res) => this._handleResponse(res));
  }

  DeleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._header,
    }).then(this._handleResponse);
  }

  LikeButton({ id, isLiked }) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._header,
    }).then(this._handleResponse);
  }
}

export default Api;
