import CreateFilters from '../view/filter-view.js';
import CreateSort from '../view/sort-view.js';
import ListPoinView from '../view/list-point-view.js';
import PointPresenter from './point-pressnter.js';
//import {generatePoint} from './mock/point.js';
import CreateNoPointMessage from '../view/no-point-message-view.js';
import {RenderPosition, render} from '../utils/render.js';
import {updateItem} from '../utils/utils.js';

import {DEFAULT_VALUE} from '../utils/const.js';
import {SortType} from '../utils/const.js';
import {sortPrice, sortDays, sortTime} from '../utils/utils.js';

export default class TripPresenter {
  #tripEventsContainer = null;
  #tripFiltersContainer = null;

  #filterComponent = new CreateFilters(DEFAULT_VALUE.filter);
  #sortConponent = new CreateSort(DEFAULT_VALUE.sorting);
  #listPointComponent = new ListPoinView();
  #noPointMessageComponent = new CreateNoPointMessage();

  #points = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;
  #soursedPoints = [];

  constructor(tripEventsContainer, tripFiltersContainer) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripFiltersContainer = tripFiltersContainer;
  }

  init = (points) => {
    this.#points = [...points];
    this.#soursedPoints = [...points];

    this.#points.sort(sortDays);

    this.#renderEvents();
  }

  #onModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #onPointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#soursedPoints = updateItem(this.#soursedPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #renderFilters = () => {
    render(this.#tripFiltersContainer, this.#filterComponent, RenderPosition.BEFOREEND);
  }

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#points.sort(sortDays);
        break;
      case SortType.TIME:
        this.#points.sort(sortTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortPrice);
        break;
      default:
        this.#points = [...this.#soursedPoints];
    }

    this.#currentSortType = sortType;
  }

  #onSortChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);

    this.#clearPoints();
    this.#renderPoints();
  }

  #renderSort = () => {
    render(this.#tripEventsContainer, this.#sortConponent, RenderPosition.BEFOREEND);
    this.#sortConponent.setOnSortChange(this.#onSortChange);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listPointComponent, this.#onPointChange, this.#onModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #clearPoints = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderPoints = () => {
    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  }

  #renderNoPointMessage = () => {
    render(this.#tripEventsContainer, this.#noPointMessageComponent, RenderPosition.BEFOREEND);
  }

  #renderListPoints = () => {
    render(this.#tripEventsContainer, this.#listPointComponent, RenderPosition.BEFOREEND);
  }

  #renderEvents = () => {
    if (this.#points.length === 0) {
      this.#renderNoPointMessage();
      return;
    }

    this.#renderFilters();
    this.#renderSort();
    this.#renderListPoints();

    this.#renderPoints();
  }
}
