export {avatar, buttonAdd, buttonEdit, avatarEdit, profileForm, avatarForm, addForm, formConfig, apiConfig};

const buttonAdd = document.querySelector('.profile__add-button');
const buttonEdit = document.querySelector('.profile__edit-button');
const avatarEdit = document.querySelector('.profile__avatar-edit');

const profileForm = document.querySelector('#profile-form');
const addForm = document.querySelector('#add-form');
const avatarForm = document.querySelector('#avatar-form');

const avatar = document.querySelector('.profile__avatar');

const formConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__item-error_active'
};

const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-48',
  headers: {
    authorization: '65de8f77-f8b8-413c-888a-b451adbbaac0',
    'Content-Type': 'application/json'
  }
}; 