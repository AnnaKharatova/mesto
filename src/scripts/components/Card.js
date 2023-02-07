export class Card {
  constructor(name, link, handleCardClick, templateSelector) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return this._cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage = this._element.querySelector('.element__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__button');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._elementImage = this._element.querySelector('.element__image');
    this._likeButton.addEventListener('click', () => {
      this._isLike()
    });
    this._deleteButton.addEventListener('click', () => {
      this._deleteCard()
    });
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name)
    })
  }

  _isLike() {
    this._likeButton.classList.toggle('element__button_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}


