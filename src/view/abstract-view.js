import {createElement} from '../utils/render.js';

const SHAKE_ANIMATION_TIMEOUT = 500;

export default class AbstractView {
  #element = null;
  _callback = {};

  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one.');
    }
  }

  get getElement() {
    if (!this.#element) {
      this.#element = createElement(this.getTemplate);
    }

    return this.#element;
  }

  get getTemplate() {
    throw new Error('Abstract method not implemented: get getTemplate');
  }

  removeElement() {
    this.#element = null;
  }

  shake (callback) {
    this.getElement.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this.getElement.style.animation = '';
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
