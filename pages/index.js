const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');

buttonEdit.addEventListener('click', function(){
  popup.classList.remove('popup_hidden')
}) 

buttonClose.addEventListener('click', function(){
  popup.classList.add('popup_hidden')
})