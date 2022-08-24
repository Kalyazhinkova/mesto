export default class Section {
  constructor({renderer}, сontainerSelector) {
    this._renderer = renderer; //функция колбэк, которая отвечает за создание и отрисовку данных на странице
    this._container = document.querySelector(сontainerSelector);
  }

  clear() {
    this._container.innerHTML = '';
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderCard(item){
    this._renderer(item);
  }

  renderItems(items) {
    this.clear();
    items.forEach((item)=>{
      this._renderer(item);
    })
  }
} 