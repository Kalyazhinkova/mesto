export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClosePopup = this._handleEscClose.bind(this);
    this._handleOverlayClosePopup = this._handleOverlayClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_open');
    document.addEventListener('keyup', this._handleEscClosePopup);
    this._popup.addEventListener('mousedown', this._handleOverlayClosePopup);
  }

  close() {
    this._popup.classList.remove('popup_open');
    document.removeEventListener('keyup', this._handleEscClosePopup);
    this._popup.removeEventListener('mousedown', this._handleOverlayClosePopup);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if(evt.target === evt.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-button').addEventListener('click',()=> this.close());
  }
}


