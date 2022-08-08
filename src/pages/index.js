import './index.css';
import { initialCards } from '../scripts/data.js';
import Card from '../components/Card.js';
import Section  from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/Popup/PopupWithImage.js';
import PopupWithForm from '../components/Popup/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';



const buttonAdd = document.querySelector('.profile__add-button');
const buttonEdit = document.querySelector('.profile__edit-button');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const profileForm = document.querySelector('#profile-form');
const nameInput = document.querySelector('#name'); //поле ввода имя
const jobInput = document.querySelector('#description'); //поле ввода описание

const addForm = document.querySelector('#add-form');
const namePicture = document.querySelector('#image-name'); //поле ввода названия картинки
const linkImage = document.querySelector('#image-link'); //поле ввода ссылки 


const formConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__item-error_active'
};

const formEditProfile = new FormValidator(formConfig, profileForm);
const formAddContent = new FormValidator(formConfig, addForm);

formEditProfile.enableValidation();
formAddContent.enableValidation();


//константа с данными профиля
const profile = new UserInfo('.profile__name', '.profile__description');

//попап редактирования профиля
const profilePopup = new PopupWithForm('.popup_profile', handleProfileFormSubmit);

//попап добавления карточки
const addPopup = new PopupWithForm('.popup_add', handleAddFormSubmit);

function createCard(item) {
  const card = new Card(item, '#element-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleCardClick(name, link) {
  const popup = new PopupWithImage('.popup_big');
  popup.open(name, link);
}

function handleAddFormSubmit(formData) {
  formData = {name: namePicture.value, link: linkImage.value};
  cardList.addItem(createCard(formData));
  addPopup.close();
}

function handleProfileFormSubmit(formData) {
  profile.setUserInfo({
    userName: formData.name,
    userDescription: formData.description});
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  profilePopup.close();
}

function setUserInfoProfile() {
  const userInfo = profile.getUserInfo();
  nameInput.value = userInfo.userName;
  jobInput.value = userInfo.userDescription;
}

profilePopup.setEventListeners();
addPopup.setEventListeners();

buttonEdit.addEventListener('click', () => {
  formEditProfile.checkValidityPopup();
  setUserInfoProfile();
  profilePopup.open();
});

buttonAdd.addEventListener('click', () => {
  formAddContent.checkValidityPopup();
  addPopup.open();
});

const cardList = new Section ({
  data: initialCards,
  renderer: (cardItem) => {
    console.log(cardItem);
    cardList.addItem(createCard(cardItem));
  },
}, '.elements');
cardList.render();




