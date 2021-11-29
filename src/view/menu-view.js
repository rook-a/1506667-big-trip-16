import {MENU_TABS} from '../const.js';

export const createSiteMenuTemplate = (defaultTab) => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">

    ${MENU_TABS.map((tab) => `<a class="trip-tabs__btn ${defaultTab === tab ? 'trip-tabs__btn--active' : ''} " href="#">${tab}</a>`).join('')}

  </nav>`
);
