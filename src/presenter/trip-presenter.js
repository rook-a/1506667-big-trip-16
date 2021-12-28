import CreateSort from '../view/sort-view.js';
import ListPoinView from '../view/list-point-view.js';
import PointPresenter from './point-pressnter.js';
import PointNewPresenter from './point-new-presenter.js';
import CreateNoPointMessage from '../view/no-point-message-view.js';
import {RenderPosition, render, remove} from '../utils/render.js';
import {filters} from '../utils/filter.js';
import {DEFAULT_VALUE, UpdateType, UserAction, FilterType, SortType} from '../utils/const.js';
import {sortByPrice, sortByDays, sortByTime} from '../utils/utils.js';

export default class TripPresenter {
  #tripEventsContainer = null;
  #tripFiltersContainer = null;
  #pointsModel = null;
  #sortConponent = null;
  #filterModel = null;
  #noPointMessageComponent = null;
  #pointNewPresenter = null;
  #pointPresenter = new Map();
  #currentfilterType = FilterType.EVERYTHING;
  #currentSortType = DEFAULT_VALUE.sorting;

  #listPointComponent = new ListPoinView();

  constructor(tripEventsContainer, tripFiltersContainer, pointsModel, filterModel) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripFiltersContainer = tripFiltersContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointNewPresenter = new PointNewPresenter(this.#listPointComponent, this.#onViewAction);

    this.#pointsModel.addObserver(this.#onModelEvent);
    this.#filterModel.addObserver(this.#onModelEvent);
  }

  get points() {
    this.#currentfilterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filters[this.#currentfilterType](points);

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
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init();
  }

  #onModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #onViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  #onModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEvents(true);
        this.#renderEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearEvents(true);
        this.#renderEvents();
        break;
    }
  }

  #onSortChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearEvents();
    this.#renderEvents();
  }

  #renderSort = () => {
    this.#sortConponent = new CreateSort(this.#currentSortType);
    this.#sortConponent.setOnSortChange(this.#onSortChange);

    render(this.#tripEventsContainer, this.#sortConponent, RenderPosition.BEFOREEND);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listPointComponent, this.#onViewAction, this.#onModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i]);
    }
  }

  #renderNoPointMessage = () => {
    this.#noPointMessageComponent = new CreateNoPointMessage(this.#currentfilterType);
    render(this.#tripEventsContainer, this.#noPointMessageComponent, RenderPosition.BEFOREEND);
  }

  #renderListPoints = () => {
    render(this.#tripEventsContainer, this.#listPointComponent, RenderPosition.BEFOREEND);
  }

  #clearEvents = (isResetSortType) => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
    this.#pointNewPresenter.destroy();

    remove(this.#sortConponent);
    remove(this.#listPointComponent);

    if (this.#noPointMessageComponent) {
      remove(this.#noPointMessageComponent);
    }

    if (isResetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderEvents = () => {
    const pointsCount = this.points.length;

    if (pointsCount === 0) {
      this.#renderNoPointMessage();
      return;
    }

    this.#renderSort();
    this.#renderListPoints();
    this.#renderPoints();
  }
}
