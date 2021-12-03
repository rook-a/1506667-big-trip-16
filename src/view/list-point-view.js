import AbstractView from './abstract-view.js';

const createListPointsTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class ListPoinView extends AbstractView {
  get getTemplate() {
    return createListPointsTemplate();
  }
}
