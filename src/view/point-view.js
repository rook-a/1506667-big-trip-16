import AbstractView from './abstract-view.js';

const createOfferTemplate = (offers) => `<ul class="event__selected-offers">
  ${offers.map(({title, price}) => `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>`).join('')}
</ul>`;

const createTimeDuration = (timeStart, timeEnd) => {
  const timeDuration = timeEnd.diff(timeStart, 'm');
  const minutesDuration = timeDuration % 60 > 0 ? `${timeDuration % 60}M` : '';
  const hoursDuration = Math.floor(timeDuration / 60) % 24 > 0 ? `${Math.floor(timeDuration / 60) % 24}H ` : '';
  const daysDuration = Math.floor((timeDuration / 60) / 24) > 0 ? `${Math.floor((timeDuration / 60) / 24)}D ` : '';

  return daysDuration + hoursDuration + minutesDuration;
};

const createPointTemplate = (point) => {
  const {type, price, destination, offer, timeStart, timeEnd} = point;

  const favoriteClassName = point.isFavorite ? 'event__favorite-btn--active' : '';
  const offerTemplate = offer ? createOfferTemplate(offer) : '';

  return `<li class="trip-events__item">
            <div class="event">
              <time class="event__date" datetime="${timeStart.format('YYYY-MM-DD')}">${timeStart.format('MMM D')}</time>
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
              </div>
              <h3 class="event__title">${type} ${destination.name}</h3>
              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="${timeStart.format('YYYY-MM-DDTHH:mm')}">${timeStart.format('HH:mm')}</time>
                  &mdash;
                  <time class="event__end-time" datetime="${timeEnd.format('YYYY-MM-DDTHH:mm')}">${timeEnd.format('HH:mm')}</time>
                </p>
                <p class="event__duration">${createTimeDuration(timeStart, timeEnd)}</p>
              </div>
              <p class="event__price">
                &euro;&nbsp;<span class="event__price-value">${price}</span>
              </p>
              <h4 class="visually-hidden">Offers:</h4>
              ${offerTemplate}
              <button class="event__favorite-btn ${favoriteClassName}" type="button">
                <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                </svg>
              </button>
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>`;
};

export default class CreatePoint extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get getTemplate() {
    return createPointTemplate(this.#point);
  }

  setOnPointClick = (callback) => {
    this._callback.pointClick = callback;
    this.getElement.querySelector('.event__rollup-btn').addEventListener('click', this.#pointClick);
  }

  setOnFavoriteClick = (callback) => {
    this._callback.favoriteClick = callback;
    this.getElement.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClick);
  }

  #pointClick = (evt) => {
    evt.preventDefault();
    this._callback.pointClick();
  }

  #favoriteClick = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}
