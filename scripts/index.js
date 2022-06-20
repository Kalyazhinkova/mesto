const profilePopup = document.querySelector('.popup_profile');
const addPopup = document.querySelector('.popup_add');
const bigPopup = document.querySelector('.popup_big');

const buttonAdd = document.querySelector('.profile__add-button');
const buttonEdit = document.querySelector('.profile__edit-button');

const closeButtons = document.querySelectorAll('.popup__close-button');
const profleCloseBtn = document.querySelector('.popup__close-button_profile');
const bigCloseBtn = document.querySelector('.popup__close-button_big');
const addCloseBtn = document.querySelector('.popup__close-button_add');

const buttonLike = document.querySelector('.element__like');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');
const namePicture = document.querySelector('#image_name');
const linkImage = document.querySelector('#image_link');

const formElement = document.querySelector('#profile-form');
const formElementAdd = document.querySelector('#add-form');

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
  if (popup === profilePopup) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_open');
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profilePopup);
}

function addFormSubmit(evt) {
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
    bigPopup.classList.add('popup_open');
    popupImageName.textContent = name;
    popupImage.src = link;
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

buttonEdit.addEventListener('click', () => openPopup(profilePopup));
buttonAdd.addEventListener('click', () => openPopup(addPopup));

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

formElement.addEventListener('submit', handleProfileFormSubmit);
formElementAdd.addEventListener('submit', addFormSubmit);


