import './index.css';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import {
  cardsList,
  validationConfig,
  popupProfileForm,
  profileButton,
  inputProfileName,
  inputProfession,
  popupCardForm,
  cardAddButton,
} from '../scripts/utils/constants.js';

// Форма редактирования профиля
const userInfo = new UserInfo('#profile__name', '#profile__profession');
const popupUserProfile = new PopupWithForm('#popup-profile',
  (dataInput) => {
    userInfo.setUserInfo(dataInput)
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

function createCard(cardData) {
  const card = new Card(
    cardData.name,
    cardData.link,
    handleCardClick,
    '.element-template');
  return card.generateCard();
}

const itemsList = new Section({
  items: cardsList,
  renderer: (cardData) => {
    itemsList.addItem(createCard(cardData));
  }
},
  '.elements'
)
itemsList.renderItems();

const openCardForm = new PopupWithForm('#popup-card', (cardData) => {
  itemsList.addItem(createCard(cardData));
})
openCardForm.setEventListeners();

cardAddButton.addEventListener('click', function () {
  openCardForm.open();
  formPopupCardValid.resetValidation();
});

function handleCardClick(link, name) {
  openPicture.open(link, name);
}

//Валидация

const formPopupProfileValid = new FormValidator(validationConfig, popupProfileForm);
formPopupProfileValid.enableValidation();

const formPopupCardValid = new FormValidator(validationConfig, popupCardForm);
formPopupCardValid.enableValidation();



