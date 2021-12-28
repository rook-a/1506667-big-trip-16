import AbstractObserver from '../utils/abstract-observer';
import {FilterType} from '../utils/const.js';

export default class FilterModel extends AbstractObserver {
  #filter = FilterType.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
