import CreateFilters from '../view/filter-view.js';
import {UpdateType} from '../utils/const.js';
import {RenderPosition, render, remove, replace} from '../utils/render.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;

    this.#filterModel.addObserver(this.#onModelEvent);
  }

  get filters() {
    return this.#filterModel.filter;
  }

  init() {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new CreateFilters(this.#filterModel.filter);
    this.#filterComponent.setOnFilterTypeChange(this.#onFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterContainer, this.#filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #onModelEvent = () => {
    this.init();
  }

  #onFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  destroy = () => {
    remove(this.#filterComponent);
    this.#filterComponent = null;
  }
}
