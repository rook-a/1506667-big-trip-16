import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
//import dayjs from 'dayjs';

import {RenderPosition, renderTemplate} from './render.js';
import {createSiteMenuTemplate} from './view/menu-view.js';
import {createTripInfoTemplate} from './view/trip-info-view.js';
import {createFiltersTemplate} from './view/filter-view.js';

import {createSortTemplate} from './view/sort-view.js';

import {createListPointsTemplate} from './view/list-point-view.js';

import {createNewPointTemplate} from './view/new-point-view.js';
//import {createPointWithoutOffersTemplate} from './view/new-point-without-destination-view.js';
//import {createPointWithoutDestinationTemplate} from './view/new-point-without-offers-view.js';

import {createEditPointTemplate} from './view/edit-point-view.js';

import {createPointTemplate} from './view/point-view.js';

import {generatePoint} from './mock/point.js';
//import {generateFilter} from './mock/filter.js';
import {DEFAULT_VALUE} from './const.js';

const TASK_COUNT = 20;

const tasks = Array.from({length: TASK_COUNT}, generatePoint);
// console.log(tasks);
//const filters = generateFilter(tasks);
//console.log(filters);
const tripInfoContainer = document.querySelector('.trip-main');
const siteMenuContainer = tripInfoContainer.querySelector('.trip-controls__navigation');
const tripFiltersContainer = tripInfoContainer.querySelector('.trip-controls__filters');

const tripEventsContainer = document.querySelector('.trip-events');


renderTemplate(tripInfoContainer, createTripInfoTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(siteMenuContainer, createSiteMenuTemplate(DEFAULT_VALUE.menu), RenderPosition.BEFOREEND);
renderTemplate(tripFiltersContainer, createFiltersTemplate(DEFAULT_VALUE.filter), RenderPosition.BEFOREEND);

renderTemplate(tripEventsContainer, createSortTemplate(DEFAULT_VALUE.sorting), RenderPosition.BEFOREEND);


renderTemplate(tripEventsContainer, createListPointsTemplate(), RenderPosition.BEFOREEND);

const listPointsContainer = document.querySelector('.trip-events__list');

renderTemplate(listPointsContainer, createEditPointTemplate(tasks[0]), RenderPosition.AFTERBEGIN);
renderTemplate(listPointsContainer, createNewPointTemplate(tasks[1]), RenderPosition.BEFOREEND);
// renderTemplate(listPointsContainer, createPointWithoutOffersTemplate(tasks[2]), RenderPosition.BEFOREEND);
// renderTemplate(listPointsContainer, createPointWithoutDestinationTemplate(tasks[3]), RenderPosition.BEFOREEND);

for (let i = 4; i < TASK_COUNT; i++) {
  renderTemplate(listPointsContainer, createPointTemplate(tasks[i]), RenderPosition.BEFOREEND);
}

//в качестве теста
flatpickr('#event-start-time-1', {
  enableTime: true,
  altInput: true,
  // eslint-disable-next-line camelcase
  time_24hr: true,
  altFormat: 'd/m/y H:i',
  dateFormat: 'd-m-Y H:i',
});

flatpickr('#event-end-time-1', {
  enableTime: true,
  altInput: true,
  // eslint-disable-next-line camelcase
  time_24hr: true,
  altFormat: 'd/m/y H:i',
  dateFormat: 'd-m-Y H:i',
});
