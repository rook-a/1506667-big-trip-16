import {FilterType} from '../utils/const.js';
import AbstractView from './abstract-view.js';

const createFiltersTemplate = (currentFilterType) => (
  `<form class="trip-filters" action="#" method="get">

    ${Object.values(FilterType).map((filter) => `<div class="trip-filters__filter">
      <input
        id="filter-${filter}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${filter}"
        ${currentFilterType === filter ? 'checked' : ''}>

      <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
    </div>`).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class CreateFilters extends AbstractView {
  #currentFilterType = null;

  constructor(currentFilterType) {
    super();
    this.#currentFilterType = currentFilterType;
  }

  get getTemplate() {
    return createFiltersTemplate(this.#currentFilterType);
  }

  setOnFilterTypeChange = (callback) => {
    this._callback.filterTypeChange = callback;
    this.getElement.addEventListener('change', this.#onFilterTypeChange);
  }

  #onFilterTypeChange = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }
}
