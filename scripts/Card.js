export const cardsList = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export class Card {
  constructor(name, link, openPopups, templateSelector) {
    this._name = name;
    this._link = link;
    this._openPopups = openPopups
    this._templateSelector = templateSelector

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
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners()
    // Добавим данные
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    // Вернём элемент наружу
    return this._element;
  }

  _openImagePopup() {
    this._openPopups(document.querySelector('#popup-picture'));
    document.querySelector('.popup-picture__image').src = this._link;
    document.querySelector('.popup-picture__image').alt = this._name;
    document.querySelector('.popup-picture__title').textContent = this._name;
  }

  _setEventListeners() {
    this._element.querySelector('.element__button').addEventListener('click', () => {
      this._isLike()
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._deleteCard()
    })
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openImagePopup()
    })
  }

  _isLike() {
    this._element.querySelector('.element__button').classList.toggle('element__button_active')
  }

  _deleteCard() {
    this._element.querySelector('.element__delete-button').closest('.element').remove();
  }
}


