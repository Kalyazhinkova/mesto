import './index.css';
import { 
  initialCards,
  buttonAdd,
  buttonEdit,
  profileForm,
  addForm,
  formConfig
} from '../utils/constants.js';
import Card from '../components/Card.js';
import Section  from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/Popup/PopupWithImage.js';
import PopupWithForm from '../components/Popup/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const nameInput = document.querySelector('#name'); //поле ввода имя
const jobInput = document.querySelector('#description'); //поле ввода описание

const formEditProfile = new FormValidator(formConfig, profileForm);
const formAddContent = new FormValidator(formConfig, addForm);

formEditProfile.enableValidation();
formAddContent.enableValidation();


//константа с данными профиля
const profile = new UserInfo('.profile__name', '.profile__description');

//попап редактирования профиля
const profilePopup = new PopupWithForm('.popup_profile', {
  handleFormSubmit: (formData) => {
    profile.setUserInfo(formData);
    profilePopup.close();
  }
});

//попап добавления карточки
const addPopup = new PopupWithForm('.popup_add', {
  handleFormSubmit: (formData) => {
    cardList.addItem(createCard(formData));
    addPopup.close();
  }
});

//попап с изображением
const imagePopup = new PopupWithImage('.popup_big');

//добавляем слушатели
profilePopup.setEventListeners();
addPopup.setEventListeners();

function createCard(data) {
  const card = new Card(data, '#element-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

//открытие попапа с картинкой
function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

//заполняем инпуты при редактировании попапа
function setUserInfoProfile() {
  const userInfo = profile.getUserInfo();
  nameInput.value = userInfo.userName;
  jobInput.value = userInfo.userDescription;
}

buttonEdit.addEventListener('click', () => {
  formEditProfile.checkValidity();
  profilePopup.setInputValues(formData);
  setUserInfoProfile();
  profilePopup.open();
});

buttonAdd.addEventListener('click', () => {
  formAddContent.checkValidity();
  addPopup.open();
});

//добавление начальных карточек из массива
const cardList = new Section ({
  data: initialCards,
  renderer: (cardItem) => {
    cardList.addItem(createCard(cardItem));
  },
}, '.elements');
cardList.renderItems();




