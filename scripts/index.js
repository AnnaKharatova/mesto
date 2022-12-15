// Форма редактирования профиля

const popupProfile = document.querySelector('#popup-profile');
const profileButton =  document.querySelector('.profile__edit-button');
const popupPofileClose = document.querySelector('#popup-profile__close-button');
const profileName = document.querySelector('#profile__name');
const inputName = document.querySelector('#popup-profile__input_name');
const profileProfession = document.querySelector('#profile__profession');
const inputProfession = document.querySelector('#popup-profile__input_profession');
const formElement = document.querySelector('#popup-profile__content');
const elementsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element-template').content;
const popupPicture = document.querySelector('#popup-picture');
const popupPictureTitle = document.querySelector('.popup-picture__title');
const PopupImage = document.querySelector('.popup-picture__image');
const popupCloseCard = document.querySelector('#popup-card__close-button');
const popupCard = document.querySelector('#popup-card');
const cardAddButton = document.querySelector('#profile__add-button');
const cardForm = document.querySelector('#popup-card__content');
const cardInputName = document.querySelector('#popup-card__input_place');
const cardInputLink = document.querySelector('#popup-card__input_url');
const popupImageCloseButton = document.querySelector('#popup-picture__close-button');


function openPopup(item) {
  item.classList.add('popup_opened');
};

function openProfilePopup() {
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  openPopup(popupProfile);
};
profileButton.addEventListener('click', openProfilePopup);

function closePopup(item) {
  item.classList.remove('popup_opened');
};
popupPofileClose.addEventListener('click', function(){
  closePopup(popupProfile)
});

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup(popupProfile);
};

formElement.addEventListener('submit', handleFormSubmit);

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
    PopupImage.src = cardItem.link;
    PopupImage.alt = cardItem.name;
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

popupCloseCard.addEventListener('click', function() {
closePopup(popupCard);
});

function addCard(evt){
  evt.preventDefault();
  renderCard({name: cardInputName.value, link: cardInputLink.value});
  closePopup(popupCard);
  cardInputName.value = '';
  cardInputLink.value = '';
};
cardForm.addEventListener('submit', addCard);

// Попап с картинкой:

popupImageCloseButton.addEventListener('click', function() {
  closePopup(popupPicture);
});





