const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = document.querySelector(".modal__close-btn");

const NewPostBtn = document.querySelector(".profile__add-btn");
const newpostmodal = document.querySelector("#new-post-modal");
const NewPostCloseBtn = newpostmodal.querySelector(".modal__close-btn");

editProfileBtn.addEventListener("click", function () {
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
