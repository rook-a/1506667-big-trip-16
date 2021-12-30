import CreateTripInfo from './view/trip-info-view.js';
import CreateSiteMenu from './view/menu-view.js';
import {RenderPosition, render} from './utils/render.js';
import PointsModel from './model/points-model.js';
import {generatePoint} from './mock/point.js';
import {DEFAULT_VALUE} from './utils/const.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import CreateAddButton from './view/add-button-view.js';

const POINTS_COUNT = 20;

const points = Array.from({length: POINTS_COUNT}, generatePoint);

const tripInfoContainer = document.querySelector('.trip-main');
const siteMenuContainer = tripInfoContainer.querySelector('.trip-controls__navigation');
const tripFiltersContainer = tripInfoContainer.querySelector('.trip-controls__filters');

const tripEventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
pointsModel.points = points;

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(tripEventsContainer, tripFiltersContainer, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripFiltersContainer, filterModel);

const addButton = new CreateAddButton();
addButton.setOnClickAddButton(tripPresenter.createPoint);

render(tripInfoContainer, addButton, RenderPosition.BEFOREEND);

render(tripInfoContainer, new CreateTripInfo(), RenderPosition.AFTERBEGIN);
render(siteMenuContainer, new CreateSiteMenu(DEFAULT_VALUE.menu), RenderPosition.BEFOREEND);

filterPresenter.init();
tripPresenter.init();
