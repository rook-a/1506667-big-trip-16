import AbstractView from './abstract-view.js';

const createLoadingTemplate = () => (
  `<p class="trip-events__msg">
    Loading...
  </p>`
);

export default class LoadingView extends AbstractView {
  get getTemplate() {
    return createLoadingTemplate();
  }
}
