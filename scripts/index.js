const popupProfile = document.querySelector('#popup-profile');
const profileButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('#profile__name');
const inputProfileName = document.querySelector('#popup-profile-name');
const profileProfession = document.querySelector('#profile__profession');
const inputProfession = document.querySelector('#popup-profile-profession');
const formPopupProfile = document.querySelector('#popup-profile__content');
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
  document.addEventListener('keydown', closePopupsEsc)
};

// Форма редактирования профиля
function openProfilePopup() {
  inputProfileName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  openPopups(popupProfile);
};
profileButton.addEventListener('click', openProfilePopup);

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

// Добавление массива карточек:
function createCard(cardItem) {
  const cardElement = cardTemplate.cloneNode(true);
  const elementCardImage = cardElement.querySelector('.element__image');
  elementCardImage.src = cardItem.link;
  elementCardImage.alt = cardItem.name;
  cardElement.querySelector('.element__title').textContent = cardItem.name;
  cardElement.querySelector('.element__button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button_active');
  });

  const elementDelButton = cardElement.querySelector('.element__delete-button');
  elementDelButton.addEventListener('click', function () {
    const elementDelCard = elementDelButton.closest('.element');
    elementDelCard.remove();
  });

  elementCardImage.addEventListener('click', function () {
    openPopups(popupPicture);
    popupImage.src = cardItem.link;
    popupImage.alt = cardItem.name;
    popupPictureTitle.textContent = cardItem.name;
  });
  return cardElement;
};

function renderCard(cardItem) {
  elementsContainer.prepend(createCard(cardItem));
};

cards.forEach(renderCard);

// Добавление карточки:
cardAddButton.addEventListener('click', function () {
  openPopups(popupCard);
});

function addCard(evt) {
  evt.preventDefault();
  renderCard({ name: cardInputName.value, link: cardInputLink.value });
  closePopups(popupCard);
  cardForm.reset()
};
cardForm.addEventListener('submit', addCard);
