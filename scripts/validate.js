//Показываем ошибку
function showInputError (formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__item_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__item-error_active');
}

//Скрытие ошибки
function hideInputError (formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__item_type_error');
  errorElement.classList.remove('form__item-error_active');
  errorElement.textContent ='';
}

//Проверка валидности поля и показ или скрытие ошибки
function isValid (formElement, inputElement) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

//вызываем слушатели
function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement)=>{
    formElement.addEventListener('submit', (evt) =>{
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

//Проверка валидности полей
function hasInvalidInput(inputList) {
  return inputList.some((inputElement)=>{
    return !inputElement.validity.valid;
  })
}

//Проверка валидности попапа при открытии
function checkValidityPopup (popup) {
  const buttonElement=popup.querySelector('.popup__button');
  const inputList = Array.from(popup.querySelectorAll('.form__item'));
  inputList.forEach((inputElement)=>{
      isValid(popup, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
}



// Устанавливаем состояние кнопки
function toggleButtonState (inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_inactive');
    buttonElement.setAttribute('disabled', 'true');
  } else {
    buttonElement.classList.remove('popup__button_inactive');
    buttonElement.removeAttribute('disabled');
  }
}

//Устанавливаем слушатели
function setEventListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__item'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement)=>{
    inputElement.addEventListener('input', ()=>{
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__item-error_active'
}); 
