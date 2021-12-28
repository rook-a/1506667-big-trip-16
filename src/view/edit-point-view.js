import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import he from 'he';
import SmartView from './smart-view.js';
import {OFFERS, DESTINATIONS} from '../utils/const.js';
import {DATEPICKER_DEFAULT_SETTING} from '../utils/const.js';

const createPictureTemplate = (pictures) => `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}"></img>`).join('')}
    </div>
  </div>`;

const createDescriptionTemplate = ({description}) => `<p class="event__destination-description">${description}</p>`;

const createOfferCheckboxTemplate = ({offers}) => `<div class="event__available-offers">
    ${offers.map(({id, name, title, price}) => `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" name="${name}">
      <label class="event__offer-label" for="${id}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
      </label>
    </div>`).join('')}
  </div>`;

const createOfferTemplate = (offers) => `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    ${createOfferCheckboxTemplate(offers)}
  </section>`;

const createDropdownCityTemplate = (citys) => `${citys.map(({name}) => `<option value="${name}"></option>`).join('')}`;

const createEditPointTemplate = (point) => {
  const {type, price, destination, timeStart, timeEnd} = point;

  const filterDescription = DESTINATIONS.find(({name}) => destination.name === name);
  const filterOffer = OFFERS.find(({eventType}) => type === eventType);

  const cityChoiceTemplate = createDropdownCityTemplate(DESTINATIONS);
  const picturesTemplate = destination.pictures ? createPictureTemplate(destination.pictures) : '';
  const descriptionTemplate = createDescriptionTemplate(filterDescription);
  const offerTemplate = createOfferTemplate(filterOffer);

  return `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
              <header class="event__header">
                <div class="event__type-wrapper">
                  <label class="event__type  event__type-btn" for="event-type-toggle-1">
                    <span class="visually-hidden">Choose event type</span>
                    <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                  </label>
                  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                  <div class="event__type-list">
                    <fieldset class="event__type-group">
                      <legend class="visually-hidden">Event type</legend>

                      <div class="event__type-item">
                        <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                        <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                        <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                        <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                        <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                        <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">
                        <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                        <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                        <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                        <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                      </div>
                    </fieldset>
                  </div>
                </div>

                <div class="event__field-group  event__field-group--destination">
                  <label class="event__label  event__type-output" for="event-destination-1">
                    ${type}
                  </label>
                  <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destination.name)}" list="destination-list-1">
                  <datalist class="event__city-list" id="destination-list-1">
                    ${cityChoiceTemplate}
                  </datalist>
                </div>

                <div class="event__field-group  event__field-group--time">
                  <label class="visually-hidden" for="event-start-time-1">From</label>
                  <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeStart.format('DD/MM/YY HH:mm')}">
                  &mdash;
                  <label class="visually-hidden" for="event-end-time-1">To</label>
                  <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeEnd.format('DD/MM/YY HH:mm')}">
                </div>

                <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-1">
                    <span class="visually-hidden">Price</span>
                    &euro;
                  </label>
                  <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${he.encode(`${price}`)}">
                </div>

                <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                <button class="event__reset-btn" type="reset">Delete</button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </header>
              <section class="event__details">

                ${offerTemplate}

                <section class="event__section  event__section--destination">
                  <h3 class="event__section-title  event__section-title--destination">Destination</h3>

                  ${descriptionTemplate}
                  ${picturesTemplate}

                </section>
              </section>
            </form>
          </li>`;
};

export default class CreateEditPoint extends SmartView {
  #datepickerTimeStart = null;
  #datepickerTimeEnd = null;

  constructor(point) {
    super();
    this._data = CreateEditPoint.parsePointToData(point);

    this.#setInnerHandlers();
    this.setDatepickerTimeStart();
    this.setDatepickerTimeEnd();
  }

  get getTemplate() {
    return createEditPointTemplate(this._data);
  }

  setOnEditPointClick = (callback) => {
    this._callback.pointClick = callback;
    this.getElement.querySelector('.event__rollup-btn').addEventListener('click', this.#pointClick);
  }

  setOnFormSubmit = (callback) => {
    this._callback.formSubmit = callback;
    this.getElement.querySelector('.event--edit').addEventListener('submit', this.#formSubmit);
  }

  #pointClick = (evt) => {
    evt.preventDefault();
    this._callback.pointClick(this._data);
  }

  #formSubmit = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(CreateEditPoint.parseDataToPoint(this._data));
  }

  static parsePointToData = (point) => ({...point})

  static parseDataToPoint = (data) => ({...data})

  #onTypeChange = (evt) => {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      offer: OFFERS.find(({eventType}) => evt.target.value === eventType).offers,
    });
  }

  #onCityChange = (evt) => {
    evt.preventDefault();
    const priceInput = this.getElement.querySelector('.event__input--destination');
    const saveBtn = this.getElement.querySelector('.event__save-btn');

    DESTINATIONS.map(({name}) => {
      if (name === evt.target.value) {
        priceInput.setCustomValidity('');
        priceInput.reportValidity();
        saveBtn.disabled = false;
        this.updateData({
          destination: {
            name: evt.target.value,
            description: this._data.destination.description,
            pictures: this._data.destination.pictures,
          }
        });
      } else {
        priceInput.setCustomValidity('Invalid value. Choose a city from the list');
        priceInput.reportValidity();
        saveBtn.disabled = true;
      }
    });
  }

  #setInnerHandlers = () => {
    this.getElement.querySelector('.event__type-group').addEventListener('change', this.#onTypeChange);
    this.getElement.querySelector('.event__field-group--destination').addEventListener('change', this.#onCityChange);
    this.getElement.querySelector('.event__input--price').addEventListener('input', this.#onPriceInput);
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setOnEditPointClick(this._callback.pointClick);
    this.setOnFormSubmit(this._callback.formSubmit);
    this.setDatepickerTimeStart();
    this.setDatepickerTimeEnd();
    this.setOnDeleteClick(this._callback.deleteClick);
  }

  #onPriceInput = (evt) => {
    evt.preventDefault();

    const priceValue = Number(evt.target.value) > 0 ? evt.target.value : '';
    const priceInput = this.getElement.querySelector('.event__input--price');
    const saveBtn = this.getElement.querySelector('.event__save-btn');

    if (!priceValue) {
      priceInput.setCustomValidity('Invalid value. Need more money!');
      priceInput.reportValidity();
      saveBtn.disabled = true;
    } else {
      priceInput.setCustomValidity('');
      priceInput.reportValidity();
      saveBtn.disabled = false;
      this.updateData({
        price: evt.target.value,
      }, true);
    }
  }

  reset = (point) => {
    this.updateData(
      CreateEditPoint.parsePointToData(point),
    );
  }

  setDatepickerTimeStart = () => {
    this.#datepickerTimeStart = flatpickr(
      this.getElement.querySelector('#event-start-time-1'),
      Object.assign({}, DATEPICKER_DEFAULT_SETTING, {
        maxDate: this._data.timeEnd.format('DD/MM/YYYY HH:mm'),
        defaultDate: this._data.timeStart.format('DD/MM/YYYY HH:mm'),
        defaultHour: this._data.timeStart.format('HH'),
        defaultMinute: this._data.timeStart.format('mm'),
        onClose: this.#onTimeStartChange,
      })
    );
  }

  setDatepickerTimeEnd = () => {
    this.#datepickerTimeEnd = flatpickr(
      this.getElement.querySelector('#event-end-time-1'),
      Object.assign({}, DATEPICKER_DEFAULT_SETTING, {
        minDate: this._data.timeStart.format('DD/MM/YYYY HH:mm'),
        defaultDate: this._data.timeEnd.format('DD/MM/YYYY HH:mm'),
        defaultHour: this._data.timeEnd.format('HH'),
        defaultMinute: this._data.timeEnd.format('mm'),
        onClose: this.#onTimeEndChange,
      })
    );
  }

  #onTimeStartChange = ([userDate]) => {
    this.updateData({
      date: dayjs(userDate),
      timeStart: dayjs(userDate),
      timeDuration: dayjs(userDate).diff(this._data.timeEnd),
    });
  }

  #onTimeEndChange = ([userDate]) => {
    this.updateData({
      date: dayjs(userDate),
      timeEnd: dayjs(userDate),
      timeDuration: dayjs(userDate).diff(this._data.timeStart),
    });
  }

  setOnDeleteClick = (callback) => {
    this._callback.deleteClick = callback;
    this.getElement.querySelector('.event__reset-btn').addEventListener('click', this.#onFormDeleteClick);
  }

  #onFormDeleteClick = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(CreateEditPoint.parseDataToPoint(this._data));
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerTimeStart) {
      this.#datepickerTimeStart.destroy();
      this.#datepickerTimeStart = null;
    }

    if (this.#datepickerTimeEnd) {
      this.#datepickerTimeEnd.destroy();
      this.#datepickerTimeEnd = null;
    }
  }
}
