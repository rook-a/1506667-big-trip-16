import {MenuTabs} from '../utils/const.js';
import SmartView from './smart-view.js';

const createSiteMenuTemplate = (defaultTab) => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">

    ${Object.values(MenuTabs).map((tab) => `<a class="trip-tabs__btn ${defaultTab === tab ? 'trip-tabs__btn--active' : ''}" href="#" data-menu-tab="${tab}">${tab.toLowerCase()}</a>`).join('')}

  </nav>`
);

export default class SiteMenuView extends SmartView {
  #defaultTab = null;

  constructor(defaultTab) {
    super();
    this.#defaultTab = defaultTab;
  }

  get getTemplate() {
    return createSiteMenuTemplate(this.#defaultTab);
  }

  restoreHandlers = () => {
    this.getElement.addEventListener('click', this.#onMenuClick);
  }

  setOnMenuClick = (callback) => {
    this._callback.menuClick = callback;
    this.getElement.addEventListener('click', this.#onMenuClick);
  }

  setMenuTab = (menuTab) => {
    this.#defaultTab = menuTab;
    this.updateElement();
  }

  #onMenuClick = (evt) => {
    evt.preventDefault();

    if (evt.target.tagName !== 'A') {
      return;
    }

    this._callback.menuClick(evt.target.dataset.menuTab);
    this.setMenuTab(evt.target.dataset.menuTab);
  }
}
