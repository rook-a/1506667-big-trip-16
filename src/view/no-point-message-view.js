import AbstractView from './abstract-view.js';
import {FilterType} from '../utils/const.js';

const noPointTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const createNoPointMessageTemplate = (filterType) => {
  const noPointTextValue = noPointTextType[filterType];

  return (
    `<p class="trip-events__msg">
      ${noPointTextValue}
    </p>`
  );
};
export default class NoPointMessageView extends AbstractView {
  constructor(filterType) {
    super();
    this._filterType = filterType;
  }

  get getTemplate() {
    return createNoPointMessageTemplate(this._filterType);
  }
}
