const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = document.querySelector(".modal__close-btn");
const editprofileForm = document.querySelector(".modal__form");
const editProfileNameInput = document.querySelector("#profile-name-input");

const editprofileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newpostmodal.querySelector(".modal__close-btn");
const newPostForm = newpostmodal.querySelector(".modal__form");
const newPostCaption = newPostForm.querySelector("#card-description-input");
const newPostLink = newPostForm.querySelector("#card-image-input");
const ProfileNameEl = document.querySelector(".profile__name");
const ProfileDescriptionEl = document.querySelector(".profile__description");

editProfileBtn.addEventListener("click", function () {
  editprofilenameInput.value = profilenameEl.textContent;
  editprofileDescriptionInput.value = profiledescriptionEl.textContent;
  editProfileModal.classList.add("modal_is-opened");
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

function handleeditProfileSubmit(evt) {
  evt.preventDefault();
  profilenameEl.textContent = editprofilenameInput.value;
  profiledescriptionEl.textContent = editprofileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}
editprofileForm.addEventListener("submit", handleeditprofilesubmit);
newPostForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  console.log(newPostCaption.value);
  console.log(newPostLink.value);
  newpostmodal.classList.remove("modal_is-opened");
});
