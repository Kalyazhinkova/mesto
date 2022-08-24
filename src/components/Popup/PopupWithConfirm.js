import Popup  from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._handleConfirm = () => {};
    this.setEventListeners();
  }

  setEventListeners() {
    this._submitButton = this._popup.querySelector('.popup__button');
    this._submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleConfirm();
    })
    super.setEventListeners();
  }

  setAction(action) {
    this._handleConfirm = action;
  }

}