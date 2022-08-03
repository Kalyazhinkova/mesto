export {Popup, PopupWithImage, PopupWithForm};

class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClosePopup = this._handleEscClose.bind(this);
    this._handleOverlayClosePopup = this._handleOverlayClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_open');
    document.addEventListener('keyup', this._handleEscClosePopup);
    this._popup.addEventListener('click', this._handleOverlayClosePopup);
  }

  close() {
    this._popup.classList.remove('popup_open');
    document.removeEventListener('keyup', this._handleEscClosePopup);
    this._popup.removeEventListener('click', this._handleOverlayClosePopup);
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
    this._popup.querySelector('.popup__close-button').addEventListener('click',()=>this.close());
  }
}

class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector); //наследуем родительский конструктор + расширяем его
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageName = this._popup.querySelector('.popup__image-name');
    super.setEventListeners();
  }

  open(name, link) {
    //дополняем новой функциональностью
    this._popupImageName.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = name + `. Фотография`;
    super.open(); //вызываем родительский метод
  }  
  
}

class PopupWithForm extends Popup {
  constructor (popup, submitCallBack) {
    super(popup);
    this._submitCallBack = submitCallBack;
  }
  
  _getInputValues() {

  }

  setEventListeners () {

  }

  closePopup(){
    super.closePopup(); //вызываем родительский метод

  }
  
}

