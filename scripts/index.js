let popup = document.querySelector('.popup');
let editButton =  document.querySelector('.profile__edit-button');
let closePopup = document.querySelector('.popup__close-button');
let profileName = document.querySelector('#profile__name');
let inputName = document.querySelector('#popup__input_name');
let profileProfession = document.querySelector('#profile__profession');
let inputProfession = document.querySelector('#popup__input_profession');

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

let formElement = document.querySelector('#popup__content');

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  removePopup();
};

formElement.addEventListener('submit', handleFormSubmit);
