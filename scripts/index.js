const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = document.querySelector(".modal__close-btn");
const editprofileForm = document.querySelector(".modal__form");
const editprofilenameInput = document.querySelector("#profile-name-input");

const editprofileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const NewPostBtn = document.querySelector(".profile__add-btn");
const newpostmodal = document.querySelector("#new-post-modal");
const NewPostCloseBtn = newpostmodal.querySelector(".modal__close-btn");

const profilenameEl = document.querySelector(".profile__name");
const profiledescriptionEl = document.querySelector(".profile__description");

editProfileBtn.addEventListener("click", function () {
  editprofilenameInput.value = profilenameEl.textcontent;

  editProfileModal.classList.add("modal_is-opened");
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

NewPostBtn.addEventListener("click", function () {
  newpostmodal.classList.add("modal_is-opened");
});

NewPostCloseBtn.addEventListener("click", function () {
  newpostmodal.classList.remove("modal_is-opened");
});

function handleeditprofilesubmit(evt) {
  evt.preventdefault();
  profilenameEl.textcontent = editprofilenameinput.value;
}
editprofileform.addEventListener("submit", handleeditprofilesubmit);
