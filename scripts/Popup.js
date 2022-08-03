export {Popup, PopupWithImage, PopupWithForm};

class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClosePopup = this._handleEscClosePopup.bind(this);
  }

  openPopup() {
    this._popup.classList.add('popup_open');
    document.addEventListener('keyup', this._handleEscClosePopup());
  }

  closePopup() {
    this._popup.classList.remove('popup_open');
    document.removeEventListener('keyup', this._handleEscClosePopup());
  }

  _handleEscClosePopup(evt) {
    if (evt.key === "Escape") {
     //this._popup = document.querySelector('.popup_open');
      this.closePopup();
    }
    console.log(1);
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', function(evt) {
      if (evt.target === evt.currentTarget) {
        closePopup();
      }
    })
  }
}

class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector); //
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageName = this._popup.querySelector('.popup__image-name');
  }

  openPopup(name, link) {
    super.openPopup(); //вызываем родительский метод

    //дополняем новой функциональностью
    this._popupImageName.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = name + `. Фотография`;
  }
}

class PopupWithForm extends Popup {
  constructor (popupSelector, submitCallBack) {
    super(popupSelector);
    this._submitCallBack = submitCallBack;

  }
  
  _getInputValues() {

  }

  setEventListeners () {

  }

  closePopup(){

  }
  
}

