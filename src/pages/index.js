import "./index.css";
import {
  enableValidation,
  validationConfig,
  resetValidation,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
import { SetButtonText } from "../utils/helpers.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f3ce1a6e-909d-456e-b7ae-34d749e6fbc1",
    "Content-Type": "application/json",
  },
});

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const editProfileCloseBtn = document.querySelector(".modal__close-btn");
const profileForm = document.forms["profile-form"];
const newPostForm = document.querySelector("#card-form");
const editProfileNameInput = document.querySelector("#profile-name-input");

const editProfileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostSubmitBtn = newPostModal.querySelector(".modal__submit-btn");
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const captionInputEl = document.querySelector("#card-description-input");
const linkInputEl = document.querySelector("#card-link-input");
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = document.querySelector(
  ".modal__close-btn_type_preview"
);

// Avatar form element
const avatarModal = document.querySelector("#avatar-modal");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");
const avatarForm = avatarModal.querySelector(".modal__form");

// Delete form elements
const confirmationModal = document.querySelector("#delete-modal");
const deleteBtn = confirmationModal.querySelector(".modal__delete-btn");
const cancelBtn = confirmationModal.querySelector(".modal__cancel-btn");

// preview Image popup elements
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");

const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal.modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function openModal(modal) {
  document.addEventListener("keydown", handleEscapeKey);
  modal.classList.add("modal_is-opened");
}
function closeModal(modal) {
  document.removeEventListener("keydown", handleEscapeKey);
  modal.classList.remove("modal_is-opened");
}
const cardTemplate = document.querySelector("#card-template");
let selectedCard = null;
let selectedCardId = null;
/// content.querySelector(".card");
const cardList = document.querySelector(".cards__list");

function handleLike(evt, id) {
  const isLiked = evt.target.classList.contains("card__liked-btn_active");

  api
    .LikeButton({ id, isLiked })
    .then(() => {
      evt.target.classList.toggle("card__liked-btn_active");
    })
    .catch(console.error);
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  console.log(data?.name, data?.link, data?._id, data?.isLiked);

  // TODO - if the card is liked, set the active on the card
  cardImageEl.src = data?.link;
  cardImageEl.alt = data?.name;
  cardTitle.textContent = data?.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  cardLikeBtnEl.addEventListener("click", (evt) => handleLike(evt, data._id));

  if (data?.isLiked) {
    cardLikeBtnEl.classList.add("card__liked-btn_active");
  }

  const cardDeleteButtonEl = cardElement.querySelector(".card__delete-button");
  cardDeleteButtonEl.addEventListener("click", () =>
    handleDeleteCard(cardElement, data._id)
  );

  // function handleDeleteCard(event){
  //   event.target.closest(".card").remove();
  // }

  cardImageEl.addEventListener("click", () => handleImageClick(data));

  return cardElement;
}

const handleImageClick = (data) => {
  previewCaption.textContent = data?.name;

  previewImageEl.src = data?.link;
  previewImageEl.alt = data?.name;
  previewCaption.textContent = data?.name;
  openModal(previewModal);
};

avatarModalBtn.addEventListener("click", ()=> openModal(avatarModal))
avatarForm.addEventListener("submit", handleAvatarSubmit);

deleteBtn.addEventListener("click", handleDeleteSubmit);

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(
    profileForm,
    [editProfileDescriptionInput, editProfileNameInput],
    validationConfig
  );
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  submitBtn.textContent = "saving";
  SetButtonText(submitBtn, true);

  api
    .editUserInfo({
      name: editNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      profileNameEl.textContent = editProfileNameInput.value;
      profileDescriptionEl.textContent = editProfileDescriptionInput.value;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Save";
    });
}

function handleAvatarSubmit(evt) {
  // prevent  behavior
  console.log(avatarInput.value);
  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      document.querySelector(".profile__avatar").src = data.avatar;
      console.log(data.avatar);
    })
    .catch(console.error);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  api
    .DeleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      selectedCard = null;
      closeModal(confirmationModal);
    })
    .catch(console.error);
}

//ideally this function should be refactored to be more generic
function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(confirmationModal);
}

profileForm.addEventListener("submit", handleEditProfileSubmit);
newPostForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const inputvalue = {
    name: captionInputEl.value,
    link: linkInputEl.value,
  };

  api.CreateCard(inputvalue) .then((newCard) => {const cardElement = getCardElement(newCard);
  cardList.prepend(cardElement);

  newPostForm.reset();

  closeModal(newPostModal);
}) .catch(console.error);
});

//Destructure the second item in the callback of the .then()
api.getappInfo().then(([cards]) => {
  cards.forEach((item) => {
    const cardEl = getCardElement({ ...item })
    cardList.append(cardEl);
  });
});
enableValidation(validationConfig)