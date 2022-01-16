import CreateSiteMenu from './view/menu-view.js';
import {RenderPosition, render} from './utils/render.js';
import PointsModel from './model/points-model.js';
import {DEFAULT_VALUE, MENU_TABS} from './utils/const.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import CreateAddButton from './view/add-button-view.js';
import ApiService from './services/api-service.js';
import StatisticsPresenter from './presenter/statistics-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';

const AUTHORIZATION = 'Basic r3hweu7dc025qjz';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const tripInfoContainer = document.querySelector('.trip-main');
const siteMenuContainer = tripInfoContainer.querySelector('.trip-controls__navigation');
const tripFiltersContainer = tripInfoContainer.querySelector('.trip-controls__filters');

const siteMenuComponent = new CreateSiteMenu(DEFAULT_VALUE.menu);

const tripEventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel(new ApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const tripInfoPresenter = new TripInfoPresenter(tripInfoContainer, pointsModel);
const statisticsPresenter = new StatisticsPresenter(tripEventsContainer, pointsModel);
const tripPresenter = new TripPresenter(tripEventsContainer, tripFiltersContainer, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripFiltersContainer, filterModel, pointsModel);

const addButton = new CreateAddButton();
addButton.setOnClickAddButton(() => {
  tripPresenter.createPoint();
  siteMenuComponent.setMenuTab(DEFAULT_VALUE.menu);
  statisticsPresenter.destroy();
});

render(tripInfoContainer, addButton, RenderPosition.BEFOREEND);

const onSiteMenuClick = (menuTabs) => {
  switch (menuTabs) {
    case MENU_TABS.TABLE:
      statisticsPresenter.destroy();
      tripPresenter.init();
      filterPresenter.init();
      break;
    case MENU_TABS.STATS:
      tripPresenter.onSortChange(DEFAULT_VALUE.sorting);
      filterPresenter.onFilterTypeChange(DEFAULT_VALUE.filter);
      tripPresenter.destroy();
      filterPresenter.destroy();
      statisticsPresenter.init();
      break;
  }
};

siteMenuComponent.setOnMenuClick(onSiteMenuClick);

tripPresenter.init();

pointsModel.init().finally(() => {
  tripInfoPresenter.init();
  render(siteMenuContainer, siteMenuComponent, RenderPosition.BEFOREEND);
  filterPresenter.init();
});
