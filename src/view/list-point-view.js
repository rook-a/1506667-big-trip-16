import {createElement} from '../render.js';

const createListPointsTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class ListPoinView {
  #element = null;

  get getElement() {
    if (!this.#element) {
      this.#element = createElement(this.getTemplate);
    }

    return this.#element;
  }

  get getTemplate() {
    return createListPointsTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
