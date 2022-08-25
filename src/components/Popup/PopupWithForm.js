import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.form');
    this._submitButton = this._popup.querySelector('.popup__button');
    this._buttonTextSubmit = this._submitButton.textContent;
    this._inputList = Array.from(this._popupForm.querySelectorAll('.form__item'));
  }

  _recoverSubmitButton () {
    this._submitButton.textContent = this._buttonTextSubmit;
  }

  changeSubmitButton () {
    this._submitButton.textContent = "Сохранение...";
  }

  //собираем данные всех полей формы
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((inputElement) => {
      this._formValues[inputElement.name] = inputElement.value;
    });
    return this._formValues;
  }
  
  setEventListeners () {
    super.setEventListeners();
    this._popupForm.addEventListener('submit',(evt)=>{
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close(){
    super.close(); //вызываем родительский метод
    this._popupForm.reset();
  }

  open() {
    this._recoverSubmitButton();
    super.open();
  }

}