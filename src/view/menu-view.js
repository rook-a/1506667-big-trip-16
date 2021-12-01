import {MENU_TABS} from '../const.js';
import {createElement} from '../render.js';

const createSiteMenuTemplate = (defaultTab) => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">

    ${MENU_TABS.map((tab) => `<a class="trip-tabs__btn ${defaultTab === tab ? 'trip-tabs__btn--active' : ''} " href="#">${tab}</a>`).join('')}

  </nav>`
);

export default class CreateSiteMenu {
  #element = null;
  #defaultTab = null;

  constructor(defaultTab) {
    this.#defaultTab = defaultTab;
  }

  get getElement() {
    if (!this.#element) {
      this.#element = createElement(this.getTemplate);
    }

    return this.#element;
  }

  get getTemplate() {
    return createSiteMenuTemplate(this.#defaultTab);
  }

  removeElement() {
    this.#element = null;
  }
}
