import CreateFilters from '../view/filter-view.js';
import CreateSort from '../view/sort-view.js';
import ListPoinView from '../view/list-point-view.js';
import PointPresenter from './point-pressnter.js';
//import {generatePoint} from './mock/point.js';
import CreateNoPointMessage from '../view/no-point-message-view.js';
import {RenderPosition, render} from '../utils/render.js';
import {updateItem} from '../utils/utils.js';

import {DEFAULT_VALUE} from '../utils/const.js';

const POINTS_COUNT = 20;

export default class TripPresenter {
  #tripEventsContainer = null;
  #tripFiltersContainer = null;

  #filterComponent = new CreateFilters(DEFAULT_VALUE.filter);
  #sortConponent = new CreateSort(DEFAULT_VALUE.sorting);
  #listPointComponent = new ListPoinView();
  #noPointMessageComponent = new CreateNoPointMessage();

  #points = [];
  #pointPresenter = new Map();

  constructor(tripEventsContainer, tripFiltersContainer) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripFiltersContainer = tripFiltersContainer;
  }

  init = (points) => {
    this.#points = [...points];

    this.#renderEvents();
  }

  #onPointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #renderFilters = () => {
    render(this.#tripFiltersContainer, this.#filterComponent, RenderPosition.BEFOREEND);
  }

  #renderSort = () => {
    render(this.#tripEventsContainer, this.#sortConponent, RenderPosition.BEFOREEND);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listPointComponent, this.#onPointChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #clearPoints = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderPoints = () => {
    for (let i = 0; i < POINTS_COUNT; i++) {
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
    } else {
      this.#renderFilters();
      this.#renderSort();
      this.#renderListPoints();

      this.#renderPoints();
    }
  }
}
