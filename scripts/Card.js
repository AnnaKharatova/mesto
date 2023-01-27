export class Card {
  constructor(name, link, openPopupPicture, templateSelector) {
    this._name = name;
    this._link = link;
    this._openPopupPicture = openPopupPicture
    this._templateSelector = templateSelector
    this._popupPictureElement = document.querySelector('#popup-picture')
    this._popupPictureImage = document.querySelector('.popup-picture__image')
    this._popupPictureTitle = document.querySelector('.popup-picture__title')
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners()
    this._cardImage = this._element.querySelector('.element__image')
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }

  _openImagePopup() {
    this._openPopupPicture(this._popupPictureElement);
    this._popupPictureImage.src = this._link;
    this._popupPictureImage.alt = this._name;
    this._popupPictureTitle.textContent = this._name;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__button')
    this._deleteButton = this._element.querySelector('.element__delete-button')
    this._elementImage = this._element.querySelector('.element__image')

    this._likeButton.addEventListener('click', () => {
      this._isLike()
    });
    this._deleteButton.addEventListener('click', () => {
      this._deleteCard()
    })
    this._elementImage.addEventListener('click', () => {
      this._openImagePopup()
    })
  }

  _isLike() {
    this._likeButton.classList.toggle('element__button_active')
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}


