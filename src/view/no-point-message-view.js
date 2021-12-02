import {createElement} from '../render.js';

const createNoPointMessageTemplate = () => (
  `<p class="trip-events__msg">
    Click New Event to create your first point
  </p>`
);

export default class CreateNoPointMessage {
  #element = null;

  get getElement() {
    if (!this.#element) {
      this.#element = createElement(this.getTemplate);
    }

    return this.#element;
  }

  get getTemplate() {
    return createNoPointMessageTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
