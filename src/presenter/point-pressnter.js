import CreateEditPoint from '../view/edit-point-view.js';
import CreatePoint from '../view/point-view.js';
import {RenderPosition, render, replace, remove} from '../utils/render.js';
import {Mode} from '../utils/const.js';

export default class PointPresenter {
  #listPointContainer = null;
  #changeDate = null;
  #changeMode = null;

  #pointComponent = null;
  #editPointComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor(listPointContainer, changeDate, changeMode) {
    this.#listPointContainer = listPointContainer;
    this.#changeDate = changeDate;
    this.#changeMode = changeMode;
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new CreatePoint(point);
    this.#editPointComponent = new CreateEditPoint(point);

    this.#pointComponent.setOnPointClick(this.#onClick);
    this.#pointComponent.setOnFavoriteClick(this.#onFavoriteClick);
    this.#editPointComponent.setOnFormSubmit(this.#onClickToSave);
    this.#editPointComponent.setOnEditPointClick(this.#onClickToClose);

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#listPointContainer, this.#pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);

    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#editPointComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #onFavoriteClick = () => {
    this.#changeDate({...this.#point, isFavorite: !this.#point.isFavorite});
  }

  #onClick = () => {
    this.#replacePointToForm();
  }

  #onClickToSave = (point) => {
    this.#changeDate(point);
    this.#replaceFormToPoint();
  }

  #onClickToClose = () => {
    this.#editPointComponent.reset(this.#point);
    this.#replaceFormToPoint();
  }
}
