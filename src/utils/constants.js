export {buttonAdd, buttonEdit, profileForm, addForm, formConfig};

const buttonAdd = document.querySelector('.profile__add-button');
const buttonEdit = document.querySelector('.profile__edit-button');

const profileForm = document.querySelector('#profile-form');
const addForm = document.querySelector('#add-form');

const formConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__item-error_active'
};