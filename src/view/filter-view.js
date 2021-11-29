import {FILTERS} from '../const.js';

export const createFiltersTemplate = (defaultFilter) => (
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
