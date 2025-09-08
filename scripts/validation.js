const settings = {
  formSelector: ".modal__form",
  inputSelector: ".form__input",
  inputErrorClass: ".modal__error",
  submitButtonSelector: ".modal__submit-btn",
};

const showInputError = (formEl, inputEl, config) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsgEl;
  inputEl.classList.add(config.inputErrorClass);
};

const hideInputError = (formEl, inputEl, config) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  console.log(1111);
  console.log(config);
  inputEl.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (formEl, inputEl, config) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
};

const hasInvalidInput = (InputList) => {
  return InputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl) => {
  if (hasInvalidInput(inputList)) {
    buttonEl.disabled = true;
  } else {
    buttonEl.disabled = false;
  }
};

const disableButton = (buttonEl, config) => {
  debugger;
  buttonEl.disabled = true;
};

// optional
const resetValidation = (formEl, inputList) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input, settings);
  });
};

// TODO - use the settings object in all functions instead of hard-coded strings

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonElement = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);
  console.log(8);
  inputList.forEach((inputElement) => {
    console.log(7);
    console.log(inputElement);
    inputElement.addEventListener("keydown", () => {
      console.log(1312313);
      console.log(config);
      checkInputValidity(formEl, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enablevalidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  console.log(10);
  console.log(formList);
  formList.forEach((formEl) => {
    console.log(9);
    setEventListeners(formEl, config);
  });
};

enablevalidation(settings);
