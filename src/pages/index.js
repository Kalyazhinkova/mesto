import './index.css';
import {
  avatar,
  buttonAdd,
  buttonEdit,
  avatarEdit,
  profileForm,
  avatarForm,
  addForm,
  formConfig,
  apiConfig
} from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/Popup/PopupWithImage.js';
import PopupWithForm from '../components/Popup/PopupWithForm.js';
import PopupWithConfirm from '../components/Popup/PopupWithConfirm.js';
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';
import HeaderLogo from '../images/header-logo.svg';
import Avatar from '../images/avatar.png';


const formEditProfile = new FormValidator(formConfig, profileForm);
const formAddContent = new FormValidator(formConfig, addForm);
const formAvatar = new FormValidator(formConfig, avatarForm);

formEditProfile.enableValidation();
formAddContent.enableValidation();
formAvatar.enableValidation();

const api = new Api(apiConfig);

//константа с данными профиля
const profile = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');


api.getUserInfo()
  .then((res) => {
    profile.setUserInfo(res);
    profile.setAvatar(res);
  })
  .catch(err => console.log(err));

  const cardList = new Section({
    renderer: (cardItem) => {
      cardList.addItem(createCard(cardItem));
    },
  }, '.elements');

api.getInitialCards()
  .then((cards) => {
    cardList.renderItems(cards);
  })
  .catch(err => console.log("Произошла ошибка: ", err));

//попап редактирования профиля
const profilePopup = new PopupWithForm('.popup_profile', {
  handleFormSubmit: (formData) => {
    api.setNewUserInfo(formData.name, formData.about)
    .then((res) => {
      profile.setUserInfo(res);
      profilePopup.close();
    })  
    .catch(err => console.log(err));
    
  }
});

//попап редактирования аватара
const avatarPopup = new PopupWithForm('.popup_avatar', {
  handleFormSubmit: (formData) => {
    api.setNewAvatar(formData.avatar__link)
    .then((res) => {
      profile.setAvatar(res);
      avatarPopup.close();
    })
  }
});

//попап добавления карточки
const addPopup = new PopupWithForm('.popup_add', {
  handleFormSubmit: (formData) => {
    api.createCard(formData.image__name, formData.image__link)
    .then(data => {
      cardList.addItem(createCard(data));
      addPopup.close();
    })
    .catch(err => console.log(err));
  }
});

//попап удаления картинки
const deletePopup = new PopupWithConfirm('.popup_delete', {
  handleFormSubmit: () => {
    deletePopup.close();
  }
});

//попап с изображением
const imagePopup = new PopupWithImage('.popup_big');

//добавляем слушатели
profilePopup.setEventListeners();
addPopup.setEventListeners();
avatarPopup.setEventListeners();

function createCard(data) {
  data.profile = profile.getUserInfo();
  const card = new Card(data, '#element-template', {
    onLike: (currentCardData, likeCallback) => {
      api.likeCard({
        id: currentCardData._id,
        haveNotLiked: !card.isLiked()})
      .then((updatedCard) => {
        likeCallback(updatedCard.likes);
      })
      .catch(err => console.log(err));
    },
    onClick: (name, link) => {
      imagePopup.open(name, link);
    },
    onRemove: (currentCardData, removeCallback) => {
      deletePopup.open();
      deletePopup.setAction(() => {
        api.deleteCardById(currentCardData._id)
        .then(data => {
          removeCallback(data);
          deletePopup.close();
        })
        .catch(err => console.log(err));
    })
      
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
}

avatarEdit.addEventListener('click', () => {
  formAvatar.checkValidity();
  avatarPopup.open();
})

buttonEdit.addEventListener('click', () => {
  formEditProfile.checkValidity();
  profilePopup.setInputValues(profile.getUserInfo());
  profilePopup.open();
});

buttonAdd.addEventListener('click', () => {
  formAddContent.checkValidity();
  addPopup.open();
});






