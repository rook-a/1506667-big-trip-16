import SiteMenuView from './view/menu-view.js';
import {RenderPosition, render} from './utils/render.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import {DEFAULT_VALUE, MenuTabs} from './utils/const.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import AddButtonView from './view/add-button-view.js';
import ApiService from './services/api-service.js';
import StatisticsPresenter from './presenter/statistics-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';

const AUTHORIZATION = 'Basic r3hweu7dc025qjz';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';
const apiService = new ApiService(END_POINT, AUTHORIZATION);

const tripInfoContainer = document.querySelector('.trip-main');
const siteMenuContainer = tripInfoContainer.querySelector('.trip-controls__navigation');
const tripFiltersContainer = tripInfoContainer.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const siteMenuComponent = new SiteMenuView(DEFAULT_VALUE.menu);
const pointsModel = new PointsModel(apiService);
const offersModel = new OffersModel(apiService);
const destinationsModel = new DestinationsModel(apiService);
const filterModel = new FilterModel();

const tripInfoPresenter = new TripInfoPresenter(tripInfoContainer, pointsModel);
const statisticsPresenter = new StatisticsPresenter(tripEventsContainer, pointsModel);
const tripPresenter = new TripPresenter(tripEventsContainer, pointsModel, filterModel, offersModel, destinationsModel);
const filterPresenter = new FilterPresenter(tripFiltersContainer, filterModel, pointsModel);

const addButton = new AddButtonView();
addButton.setOnClickAddButton(() => {
  tripPresenter.createPoint();
  siteMenuComponent.setMenuTab(DEFAULT_VALUE.menu);
  statisticsPresenter.destroy();
});

render(tripInfoContainer, addButton, RenderPosition.BEFOREEND);

const onSiteMenuClick = (menuTabs) => {
  switch (menuTabs) {
    case MenuTabs.TABLE:
      statisticsPresenter.destroy();
      tripPresenter.init();
      filterPresenter.init();
      break;
    case MenuTabs.STATS:
      tripPresenter.onSortChange(DEFAULT_VALUE.sorting);
      tripPresenter.onFilterChange(DEFAULT_VALUE.filter);
      tripPresenter.destroy();
      filterPresenter.destroy();
      statisticsPresenter.init();
      break;
  }
};

siteMenuComponent.setOnMenuClick(onSiteMenuClick);

tripPresenter.init();

destinationsModel.init().finally(() => {
  offersModel.init().finally(() => {
    pointsModel.init().finally(() => {
      tripInfoPresenter.init();
      render(siteMenuContainer, siteMenuComponent, RenderPosition.BEFOREEND);
      filterPresenter.init();
    });
  });
});
