const popup = document.querySelector('.popup');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close-button');
const buttonSave = document.querySelector('.popup__save-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

let nameInput = document.querySelector('.form__item-name');
let jobInput = document.querySelector('.form__item-description');

function openPopup(){
  popup.classList.remove('popup_hidden');
}

function closePopup(){
  popup.classList.add('popup_hidden');
}


buttonEdit.addEventListener('click', openPopup);

buttonClose.addEventListener('click', closePopup);

let formElement = document.querySelector('.form');

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
