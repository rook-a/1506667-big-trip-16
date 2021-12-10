import CreateFilters from '../view/filter-view.js';
import CreateSort from '../view/sort-view.js';
import ListPoinView from '../view/list-point-view.js';
import PointPresenter from './point-pressnter.js';
//import {generatePoint} from './mock/point.js';
import CreateNoPointMessage from '../view/no-point-message-view.js';
import {RenderPosition, render} from '../utils/render.js';

import {DEFAULT_VALUE} from '../utils/const.js';

const POINT_COUNT = 20;

export default class TripPresenter {
  #tripEventsContainer = null;
  #tripFiltersContainer = null;

  #filterComponent = new CreateFilters(DEFAULT_VALUE.filter);
  #sortConponent = new CreateSort(DEFAULT_VALUE.sorting);
  #listPointComponent = new ListPoinView();
  #noPointMessageComponent = new CreateNoPointMessage();

  #points = [];

  constructor(tripEventsContainer, tripFiltersContainer) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripFiltersContainer = tripFiltersContainer;
  }

  init = (points) => {
    this.#points = [...points];

    this.#renderEvents();
  }

  #renderFilters = () => {
    render(this.#tripFiltersContainer, this.#filterComponent, RenderPosition.BEFOREEND);
  }

  #renderSort = () => {
    render(this.#tripEventsContainer, this.#sortConponent, RenderPosition.BEFOREEND);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listPointComponent);
    pointPresenter.init(point);
  }

  #renderPoints = () => {
    for (let i = 0; i < POINT_COUNT; i++) {
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
