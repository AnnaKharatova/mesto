
let popup = document.querySelector('.popup');
let editButton =  document.querySelector('.profile__edit-button');
let closePopup = document.querySelector('.popup__close-button')

function addPopup () {
  popup.classList.add('popup__opened');
}

editButton.addEventListener('click', addPopup);

function removePopup() {
  popup.classList.remove('popup__opened');
}

closePopup.addEventListener('click', removePopup);


let profileName = document.querySelector('#profile__name');
let inputName = document.querySelector('#popup__input_name');

inputName.value = profileName.textContent;

let profileProfession = document.querySelector('#profile__profession');
let inputProfession = document.querySelector('#popup__input_profession');

inputProfession.value = profileProfession.textContent;

let saveButton = document.querySelector('#popup__form');

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  removePopup();
}

saveButton.addEventListener('click', formSubmitHandler);
