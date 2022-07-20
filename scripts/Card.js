export {Card};

const popupCard = document.querySelector('.popup_big');
const popupImage = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__image-name');
const popupCloseButtonCard = document.querySelector('.popup__close-button_big');

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this.isLiked = false;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;

    return this._element;
  }

  _like() {
    this.isLiked = !this.isLiked;
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _deleteElement() {
    this._element.remove();
  }

  _handleOpenPopup() {
    popupCard.classList.add('popup_open');
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupImageName.textContent = this._name;
  }

  _handleClosePopup() {
    popupCard.classList.remove('popup_open');
    popupImage.src = '';
    popupImage.alt = '';
    popupImageName.textContent = '';
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._like();
    });
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._deleteElement();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenPopup();
    });
    popupCloseButtonCard.addEventListener('click', () => {
      this._handleClosePopup();
    });

  }
}