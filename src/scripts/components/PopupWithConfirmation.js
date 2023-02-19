import { Popup } from "./Popup.js"

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._buttonSubmit = this._popup.querySelector('#popup-confirmation__form-button');
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
  close(){
    super.close()
    this._form.removeEventListener('submit', (evt) => {
      evt.preventDefault();
      this._confirmation();
      this.renderLoading(true)
    })
  }

  setConfirmation(callback) {
    this._confirmation = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._confirmation();
      this.renderLoading(true)
    })
  }

}
