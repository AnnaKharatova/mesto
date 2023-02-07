import { Popup } from "./Popup.js"

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector)
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__content');

  }

  _getInputValues() {
    this._inputValues = {}
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  close() {
    super.close()
    this._form.reset()
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close()
    })
  }
}




