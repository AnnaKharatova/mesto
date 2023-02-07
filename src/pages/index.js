import './index.css';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';

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
const inputProfileName = document.querySelector('#popup-profile-name');
const inputProfession = document.querySelector('#popup-profile-profession');
const popupCard = document.querySelector('#popup-card');
const cardAddButton = document.querySelector('#profile__add-button');
const cardInputName = document.querySelector('#popup-card-place');
const cardInputLink = document.querySelector('#popup-card-url');


// Форма редактирования профиля
const userInfo = new UserInfo('#profile__name', '#profile__profession');
const popupUserProfile = new PopupWithForm('#popup-profile',
  (dataInput) => {
    userInfo.setUserInfo({ name: dataInput.name, profession: dataInput.profession })
  });
popupUserProfile.setEventListeners();


profileButton.addEventListener('click', function () {
  const userData = userInfo.getUserInfo()
  inputProfileName.value = userData.name;
  inputProfession.value = userData.profession;
  popupUserProfile.open();
  formPopupProfileValid.resetValidation();
});

// Добавление карточек:
const openPicture = new PopupWithImage('#popup-picture');
openPicture.setEventListeners();

function createCard() {
  const card = new Card(
    cardInputName.value,
    cardInputLink.value,
    handleCardClick,
    '.element-template');
  return card.generateCard();
}

const itemsList = new Section({
  items: cardsList,
  renderer: (item) => {
    const card = new Card(item.name, item.link, handleCardClick, '.element-template');
    const cardElement = card.generateCard();
    itemsList.addItem(cardElement);
  }
},
  '.elements'
)
itemsList.renderItems();


const openCardForm = new PopupWithForm('#popup-card', (cardData) => {
  const card = createCard({name: cardData.name, link: cardData.link});
  itemsList.addItem(card);
})
openCardForm.setEventListeners();


cardAddButton.addEventListener('click', function () {
  openCardForm.open();
  formPopupCardValid.resetValidation();
});

function handleCardClick(link, name) {
  openPicture.open(link, name);
  openPicture.setEventListeners();
}



//Валидация

const formPopupProfileValid = new FormValidator(validationConfig, popupProfile);
formPopupProfileValid.enableValidation(popupProfile);

const formPopupCardValid = new FormValidator(validationConfig, popupCard);
formPopupCardValid.enableValidation(popupCard);



