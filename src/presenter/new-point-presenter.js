import EditPointView from '../view/edit-point-view.js';
import {RenderPosition, render, remove} from '../utils/render.js';
import {UserAction, UpdateType} from '../utils/const.js';

export default class NewPointPresenter {
  #listPointContainer = null;
  #editPointComponent = null;
  #changeDate = null;

  constructor(listPointContainer, changeData) {
    this.#listPointContainer = listPointContainer;
    this.#changeDate = changeData;
  }

  init(point, OFFERS, DESTINATIONS) {
    if (this.#editPointComponent !== null) {
      return;
    }

    this.#editPointComponent = new EditPointView(point, OFFERS, DESTINATIONS);
    this.#editPointComponent.setOnFormSubmit(this.#onClickToSave);
    this.#editPointComponent.setOnEditPointClick(this.#onClickToDelete);
    this.#editPointComponent.setOnDeleteClick(this.#onClickToDelete);
    this.#editPointComponent.setDatepickerTimeStart();
    this.#editPointComponent.setDatepickerTimeEnd();

    render(this.#listPointContainer, this.#editPointComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  destroy = () => {
    if (this.#editPointComponent === null) {
      return;
    }

    remove(this.#editPointComponent);
    this.#editPointComponent = null;

    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.getDisabledAddBtn();
  }

  setSaving = () => {
    this.#editPointComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting = () => {
    const resetFormState = () => {
      this.#editPointComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#editPointComponent.shake(resetFormState);
  }

  getDisabledAddBtn = (isDisabled) => {
    const addBtn = document.querySelector('.trip-main__event-add-btn');
    const addBtnDisabled = addBtn.disabled = true;
    const addBtnEnabled = addBtn.disabled = false;

    return isDisabled ? addBtnDisabled : addBtnEnabled;
  }

  #onClickToSave = (point) => {
    this.#changeDate(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  }

  #onClickToDelete = () => {
    this.destroy();
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}
