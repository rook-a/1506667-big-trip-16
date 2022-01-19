import CreateFilters from '../view/filter-view.js';
import {UpdateType} from '../utils/const.js';
import {RenderPosition, render, remove, replace} from '../utils/render.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;
  #filterComponent = null;

  constructor(filterContainer, filterModel, pointsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#getModelEvent);
    this.#filterModel.addObserver(this.#getModelEvent);
  }

  get filters() {
    return this.#filterModel.filter;
  }

  init() {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new CreateFilters(this.#filterModel.filter, this.#pointsModel.getFilteredPointsCount());
    this.#filterComponent.setOnFilterTypeChange(this.onFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterContainer, this.#filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  destroy = () => {
    remove(this.#filterComponent);
    this.#filterComponent = null;
  }

  #getModelEvent = () => {
    this.init();
  }

  onFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}
