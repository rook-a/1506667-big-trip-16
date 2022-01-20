import AbstractObserver from '../utils/abstract-observer.js';
import {UpdateType} from '../utils/const.js';

export default class OffersModel extends AbstractObserver {
  #apiService = null;
  #offers = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get offers() {
    return this.#offers;
  }

  init = async () => {
    try {
      this.#offers = await this.#apiService.offers;
    } catch(err) {
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
  }
}
