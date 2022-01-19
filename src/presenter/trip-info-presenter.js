import CreateTripInfo from '../view/trip-info-view.js';
import {RenderPosition, render, remove, replace} from '../utils/render.js';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #pointsModel = null;
  #tripInfoComponent = null;

  constructor(tripInfoContainer, pointsModel) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#getModelEvent);
  }

  init = () => {
    const points = this.#pointsModel.points;
    const prevTripInfoComponent = this.#tripInfoComponent;
    this.#tripInfoComponent = new CreateTripInfo(this.#pointsModel.points);

    if (!points.length && prevTripInfoComponent === null) {
      return;
    }

    if (!points.length && prevTripInfoComponent !== null) {
      remove(prevTripInfoComponent);
      this.#tripInfoComponent = null;
      return;
    }

    if (prevTripInfoComponent === null) {
      this.#renderTripInfo();
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  #renderTripInfo = () => {
    render(this.#tripInfoContainer, this.#tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  #getModelEvent = () => {
    this.init();
  }
}
