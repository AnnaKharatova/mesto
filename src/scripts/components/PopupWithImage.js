import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector)
    this._popupPictureImage = document.querySelector('.popup-picture__image')
    this._popupPictureTitle = document.querySelector('.popup-picture__title')
  }

  open(link, name) {
    this._popupPictureImage.src = link;
    this._popupPictureImage.alt = name;
    this._popupPictureTitle.textContent = name;
    super.open()
  }
}


