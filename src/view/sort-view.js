import {SortType} from '../utils/const.js';
import AbstractView from './abstract-view.js';

const createSortTemplate = (currentSortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">

    ${Object.values(SortType).map((item) => `<div class="trip-sort__item  trip-sort__item--${item}">

      <input
        id="sort-${item}"
        class="trip-sort__input visually-hidden"
        type="radio"
        name="trip-sort"
        value="${item}"
        ${currentSortType === item ? 'checked' : ''}
        ${SortType.EVENT === item || SortType.OFFERS === item ? 'disabled' : ''}>

      <label class="trip-sort__btn" for="sort-${item}">${item}</label>

    </div>`).join('')}

  </form>`
);

export default class CreateSort extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get getTemplate() {
    return createSortTemplate(this.#currentSortType);
  }

  setOnSortChange = (callback) => {
    this._callback.sortChange = callback;
    this.getElement.addEventListener('click', this.#sortTypeChange);
  }

  #sortTypeChange = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this._callback.sortChange(evt.target.value);
  }
}
