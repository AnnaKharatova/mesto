// Форма редактирования профиля

const popup = document.querySelector('#popup');
const editButton =  document.querySelector('.profile__edit-button');
const closePopup = document.querySelector('#popup__close-button');
const profileName = document.querySelector('#profile__name');
const inputName = document.querySelector('#popup__input_name');
const profileProfession = document.querySelector('#profile__profession');
const inputProfession = document.querySelector('#popup__input_profession');

function addPopup () {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
}
editButton.addEventListener('click', addPopup);

function removePopup() {
  popup.classList.remove('popup_opened');
}
closePopup.addEventListener('click', removePopup);

const formElement = document.querySelector('#popup__content');

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  removePopup();
};

formElement.addEventListener('submit', handleFormSubmit);

// Добавление массива карточек:

const elementsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element-template').content;

const cards = [
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

const popupPicture = document.querySelector('#popup-picture');

function createCard(cardItem){
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.element__image').src = cardItem.link;
  cardElement.querySelector('.element__title').textContent = cardItem.name;
  cardElement.querySelector('.element__image').alt = cardItem.name;

  cardElement.querySelector('.element__button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button_active');
  });

  const delButton = cardElement.querySelector('.element__delete-button');
  delButton.addEventListener('click', function (){
    const delCard = delButton.closest('.element');
    delCard.remove();
  });

  cardElement.querySelector('.element__image').addEventListener('click', function (evt) {
    popupPicture.classList.add('popup_opened');
    document.querySelector('.popup-picture__image').src = cardItem.link;
    document.querySelector('.popup-picture__image').alt = cardItem.name;
    document.querySelector('.popup-picture__title').textContent = cardItem.name;
  })

  return cardElement;
};


function renderCard(cardItem) {
  elementsContainer.prepend(createCard(cardItem));
}

cards.forEach((item) => {
  renderCard(item);
})

// Добавление карточки:

const closeCard = document.querySelector('#popup-card__close-button');
const popupCard = document.querySelector('#popup-card');
const addCardButton = document.querySelector('#profile__add-button');
const cardForm = document.querySelector('#popup-card__content');

function addPopupCard () {
  popupCard.classList.add('popup_opened');
}
addCardButton.addEventListener('click', addPopupCard);

function removePopupCard () {
  popupCard.classList.remove('popup_opened');
}
closeCard.addEventListener('click', removePopupCard);

function addCard(evt){
  evt.preventDefault();
  const cardInputName = document.querySelector('#popup-card__input_place').value;
  const cardInputLink = document.querySelector('#popup-card__input_url').value;
  renderCard({name: cardInputName, link: cardInputLink});
  removePopupCard();
}
cardForm.addEventListener('submit', addCard);

// Попап с картинкой:

const popupImageCloseButton = document.querySelector('#popup-picture__close-button');

function removePopupImage() {
  popupPicture.classList.remove('popup_opened');
}
popupImageCloseButton.addEventListener('click', removePopupImage);



