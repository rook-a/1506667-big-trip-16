import AbstractView from './abstract-view.js';
import {siteMenuComponent} from '../main.js';
import {DEFAULT_VALUE} from '../utils/const.js';

const createAddButtonTemplate = () => (
  '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>'
);

export default class CreateAddButton extends AbstractView {
  get getTemplate() {
    return createAddButtonTemplate();
  }

  setOnClickAddButton = (callback) => {
    this._callback.clickAddButton = callback;
    this.getElement.addEventListener('click', this.#onClickAddButton);
  }

  #onClickAddButton = (evt) => {
    evt.preventDefault();
    siteMenuComponent.setMenuTab(DEFAULT_VALUE.menu);
    this._callback.clickAddButton();
  }
}
