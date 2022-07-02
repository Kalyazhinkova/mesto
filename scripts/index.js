const form = document.querySelectorAll('.form');
const profilePopup = document.querySelector('.popup_profile');
const addPopup = document.querySelector('.popup_add');
const bigPopup = document.querySelector('.popup_big');
const allPopup = document.querySelectorAll('.popup');

const buttonAdd = document.querySelector('.profile__add-button');
const buttonEdit = document.querySelector('.profile__edit-button');

const closeButtons = document.querySelectorAll('.popup__close-button');

const buttonLike = document.querySelector('.element__like');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('#name'); //поле ввода имя
const jobInput = document.querySelector('#description'); //поле ввода описание
const namePicture = document.querySelector('#image-name'); //поле ввода названия картинки
const linkImage = document.querySelector('#image-link'); //поле ввода ссылки 

const profileForm = document.querySelector('#profile-form');
const addForm = document.querySelector('#add-form');

const popupImage = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__image-name');

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

function openPopup(popup) {
  popup.classList.add('popup_open');
  if(popup !== bigPopup){
    checkValidityPopup(popup);
  }
  document.addEventListener('keyup', closePopupEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_open');
  // const allSpan = popup.querySelectorAll('.form__item-error');
  // allSpan.forEach(function(el){
  //   el.textContent="";
  // });
  document.removeEventListener('keyup', closePopupEscape);
}

function closePopupEscape (evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector('.popup_open');
    closePopup(popup);
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profilePopup);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  addElement();
  closePopup(addPopup);
  evt.target.reset();
}

function createCard(name, link) {
  const elementTemplate = document.querySelector('#element-template').content;
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  const elementTitle = newElement.querySelector('.element__title');
  const elementImage = newElement.querySelector('.element__image');
  const elementLike = newElement.querySelector('.element__like');
  const deleteButton = newElement.querySelector('.element__trash');
  
  elementTitle.textContent = name;
  elementImage.src = link;
  elementImage.alt = name;
  elementImage.addEventListener('click', function () {
    openPopup(bigPopup);
    popupImageName.textContent = name;
    popupImage.src = link;
    popupImage.alt = name;
    document.addEventListener('keyup', closePopupEscape);
  });
  elementLike.addEventListener('click', toggleLike);
  deleteButton.addEventListener('click', function () {
    const removeElement = deleteButton.closest('.element');
    removeElement.remove();
  });
  return newElement;
}

function addElement() {
  const newElement = createCard(namePicture.value, linkImage.value);
  elements.prepend(newElement);
}

function toggleLike(evt) {
  evt.target.classList.toggle('element__like_active');
}

initialCards.forEach(function (el) {
  const newElement = createCard(el.name, el.link);
  elements.prepend(newElement);
})

buttonEdit.addEventListener('click', () => 
{
  
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(profilePopup);});

buttonAdd.addEventListener('click', () => openPopup(addPopup));

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

allPopup.forEach((popup) => {
  popup.addEventListener('mousedown', function(evt) {
    if(evt.target === evt.currentTarget) {
          closePopup(evt.currentTarget);
        }
  });
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
addForm.addEventListener('submit', handleAddFormSubmit);




