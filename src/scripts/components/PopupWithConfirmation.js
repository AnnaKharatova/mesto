import { Popup } from "./Popup.js"

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, confirmationCallback) {
    super(popupSelector)
    this._buttonSubmit = this._popup.querySelector('#popup-confirmation__form-button');
    this._confirmation = confirmationCallback;
    this._popup = document.querySelector(popupSelector)
    this._form = this._popup.querySelector('#popup-confirmation__content');
  };

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSubmit.textContent = 'Удаление...';
    } else {
      this._buttonSubmit.textContent = 'Да';
    }
  }

  _submit() {
    this._confirmation();
    this.renderLoading(true)
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit()
    })
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Enter') {
        this._submit()
      }
    })
  }
}


