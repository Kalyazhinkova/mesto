import './index.css';
import {
  buttonAdd,
  buttonEdit,
  profileForm,
  addForm,
  formConfig
} from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/Popup/PopupWithImage.js';
import PopupWithForm from '../components/Popup/PopupWithForm.js';
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';
import HeaderLogo from '../images/header-logo.svg';
import Avatar from '../images/avatar.png';

const formEditProfile = new FormValidator(formConfig, profileForm);
const formAddContent = new FormValidator(formConfig, addForm);

formEditProfile.enableValidation();
formAddContent.enableValidation();

const api = new Api(
  //   {
  //   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-48/users/me',
  //   headers: {
  //     authorization: '65de8f77-f8b8-413c-888a-b451adbbaac0',
  //     'Content-Type': 'application/json'
  //   }
  // }
);

api.getUserInfo()
  .then((res) => {
    document.querySelector('.profile__name').textContent = res.name;
    document.querySelector('.profile__description').textContent = res.about;
    document.querySelector('.profile__avatar').src = res.avatar;
  })
  .catch(err => console.log(err));

const initialCards = api.getInitialCards();

api.getInitialCards()
  .then((res) => {
    const cardList = new Section({
      data: res,
      renderer: (cardItem) => {
        cardList.addItem(createCard(cardItem));
      },
    }, '.elements');
    cardList.renderItems();
  })
  .catch(err => console.log(err));

//добавление начальных карточек из массива
const cardList = new Section({
  data: initialCards,
  renderer: (cardItem) => {
    cardList.addItem(createCard(cardItem));
  },
}, '.elements');
console.log(cardList);
//cardList.renderItems();


//константа с данными профиля
const profile = new UserInfo('.profile__name', '.profile__description');

//попап редактирования профиля
const profilePopup = new PopupWithForm('.popup_profile', {
  handleFormSubmit: (formData) => {
    profile.setUserInfo(formData); ы
    api.setNewUserInfo(formData.name, formData.description)
      .catch(err => console.log(err));
    profilePopup.close();
  }
});

//попап добавления карточки
const addPopup = new PopupWithForm('.popup_add', {
  handleFormSubmit: (formData) => {
    //cardList.addItem(createCard(formData));
    console.log(formData);
    api.addNewCard(formData.image__name, formData.image__link);
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

buttonEdit.addEventListener('click', () => {
  formEditProfile.checkValidity();

  profilePopup.setInputValues(profile.getUserInfo());
  profilePopup.open();
});

buttonAdd.addEventListener('click', () => {
  formAddContent.checkValidity();
  addPopup.open();
});






