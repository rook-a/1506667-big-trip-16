import SortView from '../view/sort-view.js';
import ListPoinView from '../view/list-point-view.js';
import PointPresenter from './point-pressnter.js';
import PointNewPresenter from './point-new-presenter.js';
import NoPointMessageView from '../view/no-point-message-view.js';
import LoadingView from '../view/loading-view.js';
import {RenderPosition, render, remove} from '../utils/render.js';
import {filters} from '../utils/filter.js';
import {DEFAULT_VALUE, UpdateType, UserAction, FilterType, SortType, State} from '../utils/const.js';
import {sortByPrice, sortByDays, sortByTime} from '../utils/utils.js';
import {blankPoint} from '../utils/blank-point.js';

export default class TripPresenter {
  #tripEventsContainer = null;
  #tripFiltersContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #sortComponent = null;
  #filterModel = null;
  #noPointMessageComponent = null;
  #pointNewPresenter = null;
  #loadingComponent = new LoadingView();
  #pointPresenter = new Map();
  #currentFilterType = FilterType.EVERYTHING;
  #currentSortType = DEFAULT_VALUE.sorting;
  #isLoading = true;

  #listPointComponent = new ListPoinView();

  constructor(tripEventsContainer, tripFiltersContainer, pointsModel, filterModel, offersModel, destinationsModel) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripFiltersContainer = tripFiltersContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#pointNewPresenter = new PointNewPresenter(this.#listPointComponent, this.#makeOnViewAction);

    this.#pointsModel.addObserver(this.#makeOnModelEvent);
    this.#filterModel.addObserver(this.#makeOnModelEvent);
  }

  get points() {
    this.#currentFilterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filters[this.#currentFilterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortByDays);
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }

    return filteredPoints;
  }

  init = () => {
    this.#renderEvents();
  }

  createPoint = () => {
    blankPoint.type = this.#offersModel.offers[0].type;
    blankPoint.destination = this.#destinationsModel.destinations[0];
    blankPoint.offers = this.#offersModel.offers[0].offers;

    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(blankPoint, this.#offersModel.offers, this.#destinationsModel.destinations);
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setOnSortChange(this.onSortChange);

    render(this.#tripEventsContainer, this.#sortComponent, RenderPosition.BEFOREEND);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listPointComponent, this.#makeOnViewAction, this.#makeOnModeChange);
    pointPresenter.init(point, this.#offersModel.offers, this.#destinationsModel.destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i]);
    }
  }

  #renderLoading = () => {
    render(this.#tripEventsContainer, this.#loadingComponent, RenderPosition.AFTERBEGIN);
  }

  #renderNoPointMessage = () => {
    this.#noPointMessageComponent = new NoPointMessageView(this.#currentFilterType);
    render(this.#tripEventsContainer, this.#noPointMessageComponent, RenderPosition.BEFOREEND);
  }

  #renderListPoints = () => {
    render(this.#tripEventsContainer, this.#listPointComponent, RenderPosition.BEFOREEND);
  }

  #clearEvents = (isResetSortType) => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
    this.#pointNewPresenter.destroy();

    remove(this.#sortComponent);
    remove(this.#listPointComponent);
    remove(this.#loadingComponent);

    if (this.#noPointMessageComponent) {
      remove(this.#noPointMessageComponent);
    }

    if (isResetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderEvents = () => {
    const pointsCount = this.points.length;
    const formSort = this.#tripEventsContainer.querySelector('.trip-sort');

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (pointsCount === 0) {
      this.#renderListPoints();
      this.#renderNoPointMessage();
      return;
    }

    //проверка наличия формы сортировки на странице чтобы исключить неоднократное добавление при повторных кликах на TABLE
    if (formSort) {
      return;
    }

    this.#renderSort();
    this.#renderListPoints();
    this.#renderPoints();
  }

  destroy = () => {
    this.#clearEvents();
  }

  #makeOnModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #makeOnViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setViewState(State.SAVING);

        try {
          await this.#pointsModel.updatePoint(updateType, update);

        } catch(err) {
          this.#pointPresenter.get(update.id).setViewState(State.ABORTING);
        }
        break;
      case UserAction.ADD_POINT:
        this.#pointNewPresenter.setSaving();

        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#pointNewPresenter.getDisabledAddBtn(true);
          this.#pointNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setViewState(State.DELETING);

        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setViewState(State.ABORTING);
        }
        break;
    }
  }

  #makeOnModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data, this.#offersModel.offers, this.#destinationsModel.destinations);
        break;
      case UpdateType.MINOR:
        this.#clearEvents(true);
        this.#renderEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearEvents(true);
        this.#renderEvents();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderEvents();
        break;
    }
  }

  onSortChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearEvents();
    this.#renderEvents();
  }

  onFilterChange = (filterType) => {
    if (this.#currentFilterType === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}
