const popup = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup_add');
const popupBig = document.querySelector('.popup_big');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonClose = document.querySelector('.popup__close-button');
const buttonBigClose = document.querySelector('.popup__close-button_big');
const buttonAddClose = document.querySelector('.popup__close-button_add');
const buttonLike = document.querySelector('.element__like');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const elements = document.querySelector('.elements');
const initialCards = [
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

let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#description');
let namePicture = document.querySelector('#image_name');
let linkImage = document.querySelector('#image_link');
let formElement = document.querySelector('#form');
let formElementAdd = document.querySelector('#form_add');

function openPopup() {
  popup.classList.add('popup_open');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

function openPopupAdd() {
  popupAdd.classList.add('popup_open');
}

function closePopup() {
  popup.classList.remove('popup_open');
  popupAdd.classList.remove('popup_open');
  popupBig.classList.remove('popup_open');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

function AddElement() {
  initialCards.push({ name: namePicture.value, link: linkImage.value });
  const name = initialCards.map(el => el.name).slice(-1);
  const link = initialCards.map(el => el.link).slice(-1);
  const elementTemplate = document.querySelector('#element-template').content;
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  newElement.querySelector('.element__title').textContent = name;
  newElement.querySelector('.element__image').src = link;
  newElement.querySelector('.element__like').addEventListener('click', Like);
  newElement.querySelector('.element__image').addEventListener('click', function(){
    popupBig.classList.add('popup_open');
    document.querySelector('.popup__image-name').textContent = name;
    document.querySelector('.popup__image').src = link;
  });
  const deleteButton = newElement.querySelector('.element__trash');
  deleteButton.addEventListener('click', function () {
    console.log(deleteButton);
    const removeElement = deleteButton.closest('.element');
    console.log(removeElement);
    removeElement.remove();
  });
  elements.prepend(newElement);
}

function formSubmitAdd(evt) {
  evt.preventDefault();
  AddElement();
  closePopup();
  namePicture.value = "";
  linkImage.value = "";
}

function Like(evt) {
  evt.target.classList.toggle('element__like_active');
}

initialCards.forEach(function (el) {
  const elementTemplate = document.querySelector('#element-template').content;
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  newElement.querySelector('.element__title').textContent = el.name;
  newElement.querySelector('.element__image').src = el.link;
  newElement.querySelector('.element__image').addEventListener('click', function(){
    popupBig.classList.add('popup_open');
    document.querySelector('.popup__image-name').textContent = el.name;
    document.querySelector('.popup__image').src = el.link;
  });
  newElement.querySelector('.element__like').addEventListener('click', Like);
  const deleteButton = newElement.querySelector('.element__trash');
  deleteButton.addEventListener('click', function () {
    const removeElement = deleteButton.closest('.element');
    removeElement.remove();
  });
  elements.prepend(newElement);
})



buttonEdit.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);
buttonAdd.addEventListener('click', openPopupAdd);
buttonAddClose.addEventListener('click', closePopup);
buttonBigClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
formElementAdd.addEventListener('submit', formSubmitAdd);


