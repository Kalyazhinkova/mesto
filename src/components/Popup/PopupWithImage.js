import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector); //наследуем родительский конструктор + расширяем его
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageName = this._popup.querySelector('.popup__image-name');
    super.setEventListeners();
  }

  open(name, link) {
    super.open(); //вызываем родительский метод
    //дополняем новой функциональностью
    this._popupImageName.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = name + `. Фотография`;
  }  
  
}