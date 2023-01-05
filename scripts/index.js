const popupProfile = document.querySelector('#popup-profile');
const profileButton =  document.querySelector('.profile__edit-button');
const profileName = document.querySelector('#profile__name');
const inputName = document.querySelector('#popup-profile-name');
const profileProfession = document.querySelector('#profile__profession');
const inputProfession = document.querySelector('#popup-profile-profession');
const formPopupElement = document.querySelector('#popup-profile__content');
const elementsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element-template').content;
const popupPicture = document.querySelector('#popup-picture');
const popupPictureTitle = document.querySelector('.popup-picture__title');
const popupImage = document.querySelector('.popup-picture__image');
const popupCard = document.querySelector('#popup-card');
const cardAddButton = document.querySelector('#profile__add-button');
const cardForm = document.querySelector('#popup-card__content');
const cardInputName = document.querySelector('#popup-card-place');
const cardInputLink = document.querySelector('#popup-card-url');
const popups = Array.from(document.querySelectorAll('.popup'));
const formElement = validationConfig.formSelector;
const formInput = validationConfig.inputSelector;
const formError = document.querySelector(`.${formInput.id}-error`);
const buttonElement = validationConfig.submitButtonSelector;

//закрытие попапа кликом на темном фоне
popups.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__container') || evt.target.classList.contains('popup__close-button')) {
      closePopup(item)
    }
  })
})

function closePopupEsc(evt) {
  const popupOpened = document.querySelector('.popup_opened')
  if (evt.key === 'Escape') {
    closePopup(popupOpened)
   }
}

function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener ('keydown', closePopupEsc)
};

// Форма редактирования профиля
function openProfilePopup() {
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  openPopup(popupProfile);
};
profileButton.addEventListener('click', openProfilePopup);

function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
 };

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup(popupProfile);
};

formPopupElement.addEventListener('submit', handleFormSubmit);

// Добавление массива карточек:

function createCard(cardItem){
  const cardElement = cardTemplate.cloneNode(true);
  const elementImage = cardElement.querySelector('.element__image');
  elementImage.src = cardItem.link;
  elementImage.alt = cardItem.name;
  cardElement.querySelector('.element__title').textContent = cardItem.name;
  cardElement.querySelector('.element__button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button_active');
  });

  const elementDelButton = cardElement.querySelector('.element__delete-button');
  elementDelButton.addEventListener('click', function (){
    const elementDelCard = elementDelButton.closest('.element');
    elementDelCard.remove();
  });

  cardElement.querySelector('.element__image').addEventListener('click', function () {
    openPopup (popupPicture);
    popupImage.src = cardItem.link;
    popupImage.alt = cardItem.name;
    popupPictureTitle.textContent = cardItem.name;
  });
  return cardElement;
};

function renderCard(cardItem) {
  elementsContainer.prepend(createCard(cardItem));
};

cards.forEach((item) => {
  renderCard(item);
});

// Добавление карточки:

cardAddButton.addEventListener('click', function() {
openPopup(popupCard);
});

function addCard(evt){
  evt.preventDefault();
  renderCard({name: cardInputName.value, link: cardInputLink.value});
  closePopup(popupCard);
  cardForm.reset()
};
cardForm.addEventListener('submit', addCard);

