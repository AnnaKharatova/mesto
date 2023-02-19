import './index.css';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Api } from '../scripts/components/Api.js';
import { PopupWithConfirmation } from '../scripts/components/PopupWithConfirmation';
import {
  validationConfig,
  popupProfileForm,
  profileButton,
  inputProfileName,
  inputProfession,
  popupCardForm,
  cardAddButton,
  avatarButton,
  popupAvatarForm
} from '../scripts/utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: 'b37aac5b-a91b-4b07-955c-e3a590d781e2',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([userData, cardData]) => {
  userInfo.setUserInfo(userData)
  userInfo.editAvatar(userData)
  itemsList.renderItems(cardData.reverse())
})

// Форма редактирования профиля
const userInfo = new UserInfo('#profile__name', '#profile__profession', '.profile__avatar');
const popupUserProfile = new PopupWithForm('#popup-profile',
  (dataInput) => {
    api.editUserInfo({ name: dataInput.name, about: dataInput.profession })
      .then((data) => {
        userInfo.editUserInfo({ name: data.name, profession: data.about }),
          popupUserProfile.renderLoading(false),
          popupUserProfile.close()
      })
      .catch((err) => {
        console.log(err)
        popupUserProfile.renderError(err)
      })
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

function handleCardClick(link, name) {
  openPicture.open(link, name);
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    handleCardClick,
    () => {
      const popupDelete = new PopupWithConfirmation('#popup-confirmation', () => {
        api.deleteCard(cardData._id)
          .then(() => {
            popupDelete.renderLoading(false),
              popupDelete.close(),
              card.removeCard()
          })
          .catch((err) => {
            console.log(err)
          })
      })
      popupDelete.open()
      popupDelete.setEventListeners()
    },
    '.element-template',
    userInfo.getUserId(),
    () => {
      if (!card.isLike()) {
        api.addLike(cardData._id)
          .then((dataReturned) => {
            card.updateLikes(dataReturned.likes)
          })
          .catch((err) => {
            console.log(err)
          });
      } else {
        api.deleteLike(cardData._id)
          .then((dataReturned) => {
            card.updateLikes(dataReturned.likes)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  );
  return card.generateCard();
}

const itemsList = new Section({
  renderer: (cardData) => {
    itemsList.addItem(createCard(cardData));
  }
},
  '.elements'
)

const openCardForm = new PopupWithForm('#popup-card', (cardData) => {
  api.addCard({ name: cardData.name, link: cardData.link })
    .then((data) => {
      itemsList.addItem(createCard(data)),
        openCardForm.renderLoading(false),
        openCardForm.close()
    })
    .catch((err) => {
      console.log(err)
    })
})
openCardForm.setEventListeners();

cardAddButton.addEventListener('click', function () {
  openCardForm.open();
  formPopupCardValid.resetValidation();
});

//Валидация
const formPopupProfileValid = new FormValidator(validationConfig, popupProfileForm);
formPopupProfileValid.enableValidation();
const formPopupCardValid = new FormValidator(validationConfig, popupCardForm);
formPopupCardValid.enableValidation();
const formPopupAvatarValid = new FormValidator(validationConfig, popupAvatarForm);
formPopupAvatarValid.enableValidation();

//Аватар
const popupAvatar = new PopupWithForm('#popup-avatar', (linkData) => {
  api.editAvatar({ link: linkData.link })
    .then((data) => {
      userInfo.editAvatar(data)
      popupAvatar.renderLoading(false),
        popupAvatar.close()
    })
    .catch((err) => {
      console.log(err)
    })
});

avatarButton.addEventListener('click', function () {
  popupAvatar.open()
  formPopupAvatarValid.resetValidation()
})
popupAvatar.setEventListeners();



