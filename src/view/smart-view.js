import AbstractView from './abstract-view';

export default class SmartView extends AbstractView {
  _data = {};

  constructor() {
    super();
  }

  updateData = (update, justDataUpdating) => {
    if (!update) {
      return;
    }

    this._data = {...this._data, ...update};

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement = () => {
    const prevElement = this.getElement;
    const parent = prevElement.parentElement;

    this.removeElement();

    const newElement = this.getElement;

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers = () => {
    throw new Error('Abstract method not implemented: restoreHandlers');
  }
}
