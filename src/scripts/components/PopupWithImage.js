import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector)
    this._popupPictureImage = this._popup.querySelector('.popup-picture__image')
    this._popupPictureTitle = this._popup.querySelector('.popup-picture__title')
  }

  open(link, name) {
    this._popupPictureImage.src = link;
    this._popupPictureImage.alt = name;
    this._popupPictureTitle.textContent = name;
    super.open()
  }
}


