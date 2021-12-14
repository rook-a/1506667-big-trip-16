import CreateTripInfo from './view/trip-info-view.js';
import CreateSiteMenu from './view/menu-view.js';
// import CreateFilters from './view/filter-view.js';
import {RenderPosition, render} from './utils/render.js';

import {generatePoint} from './mock/point.js';
//import {generateFilter} from './mock/filter.js';
import {DEFAULT_VALUE} from './utils/const.js';
import TripPresenter from './presenter/trip-presenter.js';

const POINTS_COUNT = 20;

const points = Array.from({length: POINTS_COUNT}, generatePoint);
// console.log(points);
//const filters = generateFilter(points);
//console.log(filters);
const tripInfoContainer = document.querySelector('.trip-main');
const siteMenuContainer = tripInfoContainer.querySelector('.trip-controls__navigation');
const tripFiltersContainer = tripInfoContainer.querySelector('.trip-controls__filters');

const tripEventsContainer = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripEventsContainer, tripFiltersContainer);

render(tripInfoContainer, new CreateTripInfo(), RenderPosition.AFTERBEGIN);
render(siteMenuContainer, new CreateSiteMenu(DEFAULT_VALUE.menu), RenderPosition.BEFOREEND);

tripPresenter.init(points);
