import CreateEditPoint from '../view/edit-point-view.js';
import CreatePoint from '../view/point-view.js';
import {RenderPosition, render, replace, remove} from '../utils/render.js';

export default class PointPresenter {
  #listPointContainer = null;
  #changeDate = null;

  #pointComponent = null;
  #editPointComponent = null;

  #point = null;

  constructor(listPointContainer, changeDate) {
    this.#listPointContainer = listPointContainer;
    this.#changeDate = changeDate;
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new CreatePoint(point);
    this.#editPointComponent = new CreateEditPoint(point);

    this.#pointComponent.setOnPointClick(this.#onClick);
    this.#pointComponent.setOnFavoriteClick(this.#onFavoriteClick);
    this.#editPointComponent.setOnFormSubmit(this.#onSubmit);
    this.#editPointComponent.setOnEditPointClick(this.#onSubmit); //onSubmit в данном случае не очень понятное название. возможно стоит заменить

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#listPointContainer, this.#pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#listPointContainer.getElement.contains(prevPointComponent.getElement)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#listPointContainer.getElement.contains(prevEditPointComponent.getElement)) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
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

  #onFavoriteClick = () => {
    this.#changeDate({...this.#point, isFavorite: !this.#point.isFavorite});
  }

  #onClick = () => {
    this.#replacePointToForm();
  }

  #onSubmit = (point) => {
    this.#changeDate(point);
    this.#replaceFormToPoint();
  }
}
