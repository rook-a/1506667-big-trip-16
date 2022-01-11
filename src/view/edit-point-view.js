import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import he from 'he';
import SmartView from './smart-view.js';
import {DATEPICKER_DEFAULT_SETTING} from '../utils/const.js';

const createPictureTemplate = (pictures) => `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}"></img>`).join('')}
    </div>
  </div>`;

const createDescriptionTemplate = ({description}) => description ? `<p class="event__destination-description">${description}</p>` : '';

const createOfferCheckboxTemplate = ({offers}, pointOffer, isDisabled) => offers ? `<ul class="event__available-offers">
    ${offers.map(({id, title, price}) => `<li class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="${id}"
        type="checkbox"
        name="${title}"
        ${pointOffer.map((offer) => id === offer.id ? 'checked' : '').join('')}
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="event__offer-label" for="${id}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
      </label>
    </li>`).join('')}
  </ul>` : '';

const createOfferTemplate = (point, offer, isDisabled) => point.offers.length > 0 ? `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    ${createOfferCheckboxTemplate(point, offer, isDisabled)}
  </section>` : '';

const createDropdownCityTemplate = (citys) => `${citys.map(({name}) => `<option value="${name}"></option>`).join('')}`;

const createTypeTemplate = (types, isDisabled) => `<div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>

      ${types.map(({type}) => `<div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isDisabled ? 'disabled' : ''}>
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
      </div>`).join('')}

    </fieldset>
  </div>`;

const createEditPointTemplate = (point, OFFERS, DESTINATION) => {
  // console.log('OFFERS', OFFERS);
  // console.log('DESTINATION', DESTINATION);
  const {
    type,
    price,
    destination,
    timeStart,
    timeEnd,
    offer,
    isDisabled,
    isSaving,
    isDeleting,
  } = point;
  // console.log('point', point);
  const filterDescription = DESTINATION.find(({name}) => destination.name === name);
  const filterPoint = OFFERS.find((item) => item.type === type);
  // console.log('filterOffer', filterOffer);
  const cityChoiceTemplate = createDropdownCityTemplate(DESTINATION);
  const picturesTemplate = destination.pictures ? createPictureTemplate(destination.pictures) : '';
  const descriptionTemplate = createDescriptionTemplate(filterDescription);
  const offerTemplate = createOfferTemplate(filterPoint, offer, isDisabled);
  const typeTemplate = createTypeTemplate(OFFERS, isDisabled);

  return `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
              <header class="event__header">
                <div class="event__type-wrapper">
                  <label class="event__type  event__type-btn" for="event-type-toggle-1">
                    <span class="visually-hidden">Choose event type</span>
                    <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                  </label>
                  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>
                  ${typeTemplate}
                </div>

                <div class="event__field-group  event__field-group--destination">
                  <label class="event__label  event__type-output" for="event-destination-1">
                    ${type}
                  </label>
                  <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destination.name)}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
                  <datalist class="event__city-list" id="destination-list-1">
                    ${cityChoiceTemplate}
                  </datalist>
                </div>

                <div class="event__field-group  event__field-group--time">
                  <label class="visually-hidden" for="event-start-time-1">From</label>
                  <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeStart.format('DD/MM/YY HH:mm')}" ${isDisabled ? 'disabled' : ''}>
                  &mdash;
                  <label class="visually-hidden" for="event-end-time-1">To</label>
                  <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeEnd.format('DD/MM/YY HH:mm')}" ${isDisabled ? 'disabled' : ''}>
                </div>

                <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-1">
                    <span class="visually-hidden">Price</span>
                    &euro;
                  </label>
                  <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${he.encode(`${price}`)}" ${isDisabled ? 'disabled' : ''}>
                </div>

                <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
                <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
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
  #OFFERS = null;
  #DESTINATION = null;

  constructor(point, OFFERS, DESTINATION) {
    super();
    this.#OFFERS = OFFERS;
    this.#DESTINATION = DESTINATION;
    this._data = CreateEditPoint.parsePointToData(point);

    this.#setInnerHandlers();
  }

  get getTemplate() {
    return createEditPointTemplate(this._data, this.#OFFERS, this.#DESTINATION);
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

    this.updateData({
      offer: this.#onOffersChange(),
    }, true);

    this._callback.formSubmit(CreateEditPoint.parseDataToPoint(this._data));
  }

  static parsePointToData = (point) => ({
    ...point,
    isSaving: false,
    isDisabled: false,
    isDeleting: false,
  })

  static parseDataToPoint = (data) => {
    delete data.isSaving;
    delete data.isDisabled;
    delete data.isDeleting;

    return {...data};
  } ///////////////////////////

  #onTypeChange = (evt) => {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      offer: this.#OFFERS.find(({type}) => evt.target.value === type).offers,
    });
  }

  #onCityChange = (evt) => {
    evt.preventDefault();
    const priceInput = this.getElement.querySelector('.event__input--destination');
    const saveBtn = this.getElement.querySelector('.event__save-btn');

    this.#DESTINATION.map((destination) => {
      const {name, description, pictures} = destination;

      if (name === evt.target.value) {
        priceInput.setCustomValidity('');
        priceInput.reportValidity();
        saveBtn.disabled = false;
        this.updateData({
          destination: {
            name: evt.target.value,
            description: description,
            pictures: pictures,
          }
        });
      } else {
        priceInput.setCustomValidity('Invalid value. Choose a city from the list');
        priceInput.reportValidity();
        saveBtn.disabled = true;
      }
    });
  }

  #onOffersChange = () => {
    const checkboxOffers = Array.from(this.getElement.querySelectorAll('.event__offer-checkbox'));
    const currentPointType = this.#OFFERS.find((offer) => offer.type === this._data.type);
    const checkedOffers = [];
    const offers = [];

    checkboxOffers.map((offer) => {
      const id = Number(offer.id);

      if (offer.checked) {
        checkedOffers.push(id);
      }
    });

    currentPointType.offers.map((offer) => {
      if (checkedOffers.includes(offer.id)) {
        offers.push(offer);
      }
    });

    return offers;
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
    this.setOnDeleteClick(this._callback.deleteClick);
    this.setDatepickerTimeStart();
    this.setDatepickerTimeEnd();
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
        price: Number(evt.target.value),
      });
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
        defaultDate: this._data.timeStart.toString(),
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
        minDate: this._data.timeStart.toString(),
        defaultDate: this._data.timeEnd.toString(),
        defaultHour: this._data.timeEnd.format('HH'),
        defaultMinute: this._data.timeEnd.format('mm'),
        onClose: this.#onTimeEndChange,
      })
    );
  }

  #onTimeStartChange = ([userDate]) => {
    const dateStartinput = this.getElement.querySelector('#event-start-time-1');
    const saveBtn = this.getElement.querySelector('.event__save-btn');
    // console.log(this._data);
    if (dayjs([userDate]).isAfter(this._data.timeEnd)) {
      dateStartinput.setCustomValidity('Invalid value'); //не показывает сообщение
      dateStartinput.reportValidity();
      saveBtn.disabled = true;
    } else {
      dateStartinput.setCustomValidity('');
      dateStartinput.reportValidity();
      saveBtn.disabled = false;

      this.updateData({
        timeStart: dayjs(userDate),
      }, true);
    }
  }

  #onTimeEndChange = ([userDate]) => {
    this.updateData({
      timeEnd: dayjs(userDate),
    }, true);
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
