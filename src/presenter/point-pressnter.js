import CreateEditPoint from '../view/edit-point-view.js';
import CreatePoint from '../view/point-view.js';
import {RenderPosition, render, replace} from '../utils/render.js';

export default class PointPresenter {
  #listPointContainer = null;

  #pointComponent = null;
  #editPointComponent = null;

  #point = null;

  constructor(listPointContainer) {
    this.#listPointContainer = listPointContainer;
  }

  init = (point) => {
    this.#point = point;

    this.#pointComponent = new CreatePoint(point);
    this.#editPointComponent = new CreateEditPoint(point);

    this.#pointComponent.setOnPointClick(this.#onClick);

    this.#editPointComponent.setOnFormSubmit(this.#onSubmit);

    this.#editPointComponent.setOnEditPointClick(this.#onSubmit);

    render(this.#listPointContainer, this.#pointComponent, RenderPosition.BEFOREEND);
  }


  #replacePointToForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #onClick = () => {
    this.#replacePointToForm();
  }

  #onSubmit = () => {
    this.#replaceFormToPoint();
  }
}
