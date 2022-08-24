import { update } from "lodash";

export default class Card {
  constructor(data, cardSelector, handlers) {
    this._data = data;

    this._name = data.name;
    this._link = data.link;
    this._cardID = data._id;

    this._cardSelector = cardSelector;
    //this.isLiked = false;
    //this._handleCardClick = handleCardClick;
    this._onClickHandler = handlers.onClick;
    this._onRemoveHandler = handlers.onRemove;
    this._onLikeHandler = handlers.onLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  isMine() {
    const isMine = (this._data.owner._id === this._data.profile._id);
    return isMine;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like');
    this._trashButton = this._element.querySelector('.element__trash');
    if (!this.isMine()) {
      this._trashButton.remove();
    }

    this._counterLike = this._element.querySelector('.element__counter');
    this._setEventListeners();

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name + `. Фотография`;
    this._counterLike.textContent = this._data.likes.length;
    if (this.isLiked()) {
      this._likeButton.classList.add('element__like_active');
    }
    return this._element;
  }

  isLiked() {
    const isLiked = this._data.likes.some(item => item._id === this._data.profile._id);
    return isLiked;
  }

  _handleLike() {
    // вызов колбека, который пришёл снаружи
    this._onLikeHandler(
      // колбек внутри колбека, этот код вызовется в index.js
      this._data, (updatedLikes) => {
        this._data.likes = updatedLikes;
        if (this.isLiked()) {
          this._likeButton.classList.add('element__like_active');
        } else {
          this._likeButton.classList.remove('element__like_active');
        }
        this._counterLike.textContent = this._data.likes.length;
      });
  }

  // _handleRemove() {
  // //  this._onRemoveHandler(this._data);
  //   this._deleteElement();
  // }

  _deleteElement() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });
    this._trashButton.addEventListener('click', () => {
      this._onRemoveHandler(this._data, () => {
        this._deleteElement();
      });
    });
    this._cardImage.addEventListener('click', () => {
      this._onClickHandler(this._name, this._link);
    });
  }
}