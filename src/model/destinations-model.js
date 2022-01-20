import AbstractObserver from '../utils/abstract-observer.js';
import {UpdateType} from '../utils/const.js';

export default class DestinationsModel extends AbstractObserver {
  #apiService = null;
  #destinations = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get destinations() {
    return this.#destinations;
  }

  init = async () => {
    try {
      this.#destinations = await this.#apiService.destinations;
    } catch(err) {
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  }
}
