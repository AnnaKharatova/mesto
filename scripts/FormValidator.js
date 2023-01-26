export const validationConfig = {
  formSelector: '.popup__content',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
};

export class FormValidator {
  constructor(validationConfig, targetValidForm) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._targetValidForm = targetValidForm;
    this._inputList = Array.from(this._targetValidForm.querySelectorAll(this._inputSelector));
    this._formList = Array.from(this._targetValidForm.querySelectorAll(this._formSelector));
    this._buttonElement = this._targetValidForm.querySelector(this._submitButtonSelector);
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  };

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners(formElement) {
    this._toggleButtonState(this._inputList, this._buttonElement);
    formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState(this._inputList, this._buttonElement);
      }, 0);
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  };

  enableValidation(formElement) {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._setEventListeners(formElement);
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  }
}






