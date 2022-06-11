const popup = document.querySelector('.popup');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#description');
let formElement = document.querySelector('.form');

function openPopup(){
  popup.classList.remove('popup_hidden');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

function closePopup(){
  popup.classList.add('popup_hidden');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

buttonEdit.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

const a = [1, 9, 2, 2, 3, 4, 1, 7, 8, 0, 9, 0, 1, 5, 3];

const b = a.filter(function (item, position, array) {
  console.log (array.lastIndexOf(item));
  return array.lastIndexOf(item) === position; // вернём уникальные элементы
});

console.log(a); // [1, 9, 2, 2, 3, 4, 1, 7, 8, 0, 9, 0, 1, 5, 3]
console.log(b); // [2, 4, 7, 8, 9, 0, 1, 5, 3] 
