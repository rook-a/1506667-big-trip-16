import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
//import dayjs from 'dayjs';

import ListPoinView from './view/list-point-view.js';
import CreateTripInfo from './view/trip-info-view.js';
import CreateSiteMenu from './view/menu-view.js';
import CreateFilters from './view/filter-view.js';
import {RenderPosition, render, replace} from './utils/render.js';

import CreateSort from './view/sort-view.js';
import CreateNoPointMessage from './view/no-point-message-view.js';

import CreateEditPoint from './view/edit-point-view.js';

import CreatePoint from './view/point-view.js';

import {generatePoint} from './mock/point.js';
//import {generateFilter} from './mock/filter.js';
import {DEFAULT_VALUE} from './utils/const.js';

const TASK_COUNT = 20;

const tasks = Array.from({length: TASK_COUNT}, generatePoint);
// console.log(tasks);
//const filters = generateFilter(tasks);
//console.log(filters);
const tripInfoContainer = document.querySelector('.trip-main');
const siteMenuContainer = tripInfoContainer.querySelector('.trip-controls__navigation');
const tripFiltersContainer = tripInfoContainer.querySelector('.trip-controls__filters');

const tripEventsContainer = document.querySelector('.trip-events');

const renderPoint = (listPointContainer, point) => {
  const pointComponent = new CreatePoint(point);
  const pointEditComponent = new CreateEditPoint(point);

  const replacePointToForm = () => {
    replace(pointEditComponent, pointComponent);
  };

  const replaceFormToPoint = () => {
    replace(pointComponent, pointEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.setOnPointClick(() => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setOnFormSubmit(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setOnEditPointClick(() => {
    replaceFormToPoint();
    document.addEventListener('keydown', onEscKeyDown);
  });

  render(listPointContainer, pointComponent, RenderPosition.BEFOREEND);
};

render(tripInfoContainer, new CreateTripInfo(), RenderPosition.AFTERBEGIN);
render(siteMenuContainer, new CreateSiteMenu(DEFAULT_VALUE.menu), RenderPosition.BEFOREEND);


if (tasks.length === 0) {
  render(tripEventsContainer, new CreateNoPointMessage(), RenderPosition.BEFOREEND);
} else {
  render(tripFiltersContainer, new CreateFilters(DEFAULT_VALUE.filter), RenderPosition.BEFOREEND);
  render(tripEventsContainer, new CreateSort(DEFAULT_VALUE.sorting), RenderPosition.BEFOREEND);

  render(tripEventsContainer, new ListPoinView(), RenderPosition.BEFOREEND);

  const listPointsContainer = document.querySelector('.trip-events__list');

  for (let i = 0; i < TASK_COUNT; i++) {
    renderPoint(listPointsContainer, tasks[i]);
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
}
