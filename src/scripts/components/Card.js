export class Card {
  constructor(data, handleCardClick, handleDeleteCard, templateSelector, userId, handleLikeCard) {
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard
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
    this._buttonDeleteCard = this._element.querySelector('.element__delete-button')
    if (this._ownerId !== this._userId) {
      this._buttonDeleteCard.classList.add('element__delete-button_hidden');
    }
    if (this.isLike()) {
      this._likeButton.classList.add('element__button_active')
    }
    this._likeCount = this._element.querySelector('.element__count')
    this._likeCount.textContent = this._likes.length;
    return this._element;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__button');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._elementImage = this._element.querySelector('.element__image');
    this._likeButton.addEventListener('click', () => {
      this._handleLikeCard()
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteCard()
    });
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name)
    })
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  updateLikes(data) {
    this._likeCount.textContent = data.length;
    this._likeButton.classList.toggle('element__button_active')
  }

  isLike() {
    return this._likes.some(item => item._id === this._userId)
  }
}




