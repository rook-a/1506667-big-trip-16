import AbstractView from './abstract-view.js';

const createNoPointMessageTemplate = () => (
  `<p class="trip-events__msg">
    Click New Event to create your first point
  </p>`
);

export default class CreateNoPointMessage extends AbstractView {
  get getTemplate() {
    return createNoPointMessageTemplate();
  }
}
