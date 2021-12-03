import {MENU_TABS} from '../utils/const.js';
import AbstractView from './abstract-view.js';

const createSiteMenuTemplate = (defaultTab) => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">

    ${MENU_TABS.map((tab) => `<a class="trip-tabs__btn ${defaultTab === tab ? 'trip-tabs__btn--active' : ''} " href="#">${tab}</a>`).join('')}

  </nav>`
);

export default class CreateSiteMenu extends AbstractView {
  #defaultTab = null;

  constructor(defaultTab) {
    super();
    this.#defaultTab = defaultTab;
  }

  get getTemplate() {
    return createSiteMenuTemplate(this.#defaultTab);
  }

}
