import {RenderPosition, renderTemplate} from './render.js';
import {createSiteMenuTemplate} from './view/menu-view.js';
import {createTripInfoTemplate} from './view/trip-info-view.js';
import {createFiltersTemplate} from './view/filter-view.js';

import {createSortTemplate} from './view/sort-view.js';

import {createListPointsTemplate} from './view/list-point-view.js';

import {createNewPointTemplate} from './view/new-point-view.js';
import {createPointWithoutOffersTemplate} from './view/new-point-without-destination-view.js';
import {createPointWithoutDestinationTemplate} from './view/new-point-without-offers-view.js';

import {createEditPointTemplate} from './view/edit-point-view.js';

import {createPointTemplate} from './view/point-view.js';

const TASK_COUNT = 3;

const tripInfoContainer = document.querySelector('.trip-main');
const siteMenuContainer = tripInfoContainer.querySelector('.trip-controls__navigation');
const tripFiltersContainer = tripInfoContainer.querySelector('.trip-controls__filters');

const tripEventsContainer = document.querySelector('.trip-events');


renderTemplate(tripInfoContainer, createTripInfoTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(siteMenuContainer, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripFiltersContainer, createFiltersTemplate(), RenderPosition.BEFOREEND);

renderTemplate(tripEventsContainer, createSortTemplate(), RenderPosition.BEFOREEND);


renderTemplate(tripEventsContainer, createListPointsTemplate(), RenderPosition.BEFOREEND);

const listPointsContainer = document.querySelector('.trip-events__list');

renderTemplate(listPointsContainer, createEditPointTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(listPointsContainer, createNewPointTemplate(), RenderPosition.BEFOREEND);
renderTemplate(listPointsContainer, createPointWithoutOffersTemplate(), RenderPosition.BEFOREEND);
renderTemplate(listPointsContainer, createPointWithoutDestinationTemplate(), RenderPosition.BEFOREEND);

for (let i = 0; i < TASK_COUNT; i++) {
  renderTemplate(listPointsContainer, createPointTemplate(), RenderPosition.BEFOREEND);
}
