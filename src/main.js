import CreateTripInfo from './view/trip-info-view.js';
import CreateSiteMenu from './view/menu-view.js';
import {RenderPosition, render} from './utils/render.js';
import PointsModel from './model/points-model.js';
import {DEFAULT_VALUE} from './utils/const.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import CreateAddButton from './view/add-button-view.js';
import ApiService from './services/api-service.js';

const AUTHORIZATION = 'Basic r3hweu7dc025qjz';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip/';

const tripInfoContainer = document.querySelector('.trip-main');
const siteMenuContainer = tripInfoContainer.querySelector('.trip-controls__navigation');
const tripFiltersContainer = tripInfoContainer.querySelector('.trip-controls__filters');

const tripEventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel(new ApiService(END_POINT, AUTHORIZATION));

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(tripEventsContainer, tripFiltersContainer, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripFiltersContainer, filterModel);

const addButton = new CreateAddButton();
addButton.setOnClickAddButton(tripPresenter.createPoint);

render(tripInfoContainer, addButton, RenderPosition.BEFOREEND);

tripPresenter.init();

pointsModel.init().finally(() => {
  render(tripInfoContainer, new CreateTripInfo(), RenderPosition.AFTERBEGIN);
  render(siteMenuContainer, new CreateSiteMenu(DEFAULT_VALUE.menu), RenderPosition.BEFOREEND);
  filterPresenter.init();
});
