import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.form');
    this._inputList = Array.from(this._popupForm.querySelectorAll('.form__item'));
  }
  
  //собираем данные всех полей формы
  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((inputElement) => {
      this._inputValues[inputElement.name] = inputElement.value;
    });
    return this._inputValues;
  }

  setEventListeners () {
    super.setEventListeners();
    this._popupForm.addEventListener('submit',(evt)=>{
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues);
      this._popupForm.reset();
    });
  }

  close(){
    super.close(); //вызываем родительский метод
    this._popupForm.reset();
  }
}