import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

const cardsList = [
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
const validationConfig = {
  formSelector: '.popup__content',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
};
const popupProfile = document.querySelector('#popup-profile');
const profileButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('#profile__name');
const inputProfileName = document.querySelector('#popup-profile-name');
const profileProfession = document.querySelector('#profile__profession');
const inputProfession = document.querySelector('#popup-profile-profession');
const formPopupProfile = document.querySelector('#popup-profile__content');
const popupCard = document.querySelector('#popup-card');
const cardAddButton = document.querySelector('#profile__add-button');
const cardForm = document.querySelector('#popup-card__content');
const cardInputName = document.querySelector('#popup-card-place');
const cardInputLink = document.querySelector('#popup-card-url');
const popups = Array.from(document.querySelectorAll('.popup'));
const popupPicture = document.querySelector('#popup-picture')


//закрытие попапа кликом на темном фоне
popups.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__container') || evt.target.classList.contains('popup__close-button')) {
      closePopups(item)
    }
  })
})

function closePopupsEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopups(popupOpened)
  }
}

function openPopups(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupsEsc);
};

function openPopupPicture() {
  popupPicture.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupsEsc)
}
// Форма редактирования профиля
function openProfilePopup() {
  inputProfileName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  openPopups(popupProfile);
};
profileButton.addEventListener('click', function () {
  openProfilePopup();
  formPopupProfileValid.resetValidation()
});

function closePopups(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupsEsc);
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileProfession.textContent = inputProfession.value;
  closePopups(popupProfile);
};

formPopupProfile.addEventListener('submit', handleProfileFormSubmit);

// Добавление карточки:
cardAddButton.addEventListener('click', function () {
  openPopups(popupCard);
  formPopupCardValid.resetValidation()
  cardForm.reset()
});

function createCard() {
  const card = new Card(cardInputName.value, cardInputLink.value, openPopupPicture, '.element-template');
  return card.generateCard();
}

cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  document.querySelector('.elements').prepend(createCard())
  closePopups(popupCard);
});

cardsList.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item.name, item.link, openPopupPicture, '.element-template');
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // Добавляем в DOM
  document.querySelector('.elements').append(cardElement);
});


const formPopupProfileValid = new FormValidator(validationConfig, popupProfile)
formPopupProfileValid.enableValidation(popupProfile)

const formPopupCardValid = new FormValidator(validationConfig, popupCard)
formPopupCardValid.enableValidation(popupCard)
