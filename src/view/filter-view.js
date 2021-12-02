import {FILTERS} from '../const.js';
import {createElement} from '../render.js';

const createFiltersTemplate = (defaultFilter) => (
  `<form class="trip-filters" action="#" method="get">

    ${FILTERS.map((filter) => `<div class="trip-filters__filter">
      <input
        id="filter-${filter}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${filter}" ${defaultFilter === filter ? 'checked' : ''}>

      <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
    </div>`).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class CreateFilters {
  #element = null;
  #defaultFilter = null;

  constructor(defaultFilter) {
    this.#defaultFilter = defaultFilter;
  }

  get getElement() {
    if (!this.#element) {
      this.#element = createElement(this.getTemplate);
    }

    return this.#element;
  }

  get getTemplate() {
    return createFiltersTemplate(this.#defaultFilter);
  }

  removeElement() {
    this.#element = null;
  }
}
