import SmartView from './smart-view.js';
import {sortByDays} from '../utils/utils.js';

const createTripInfoTemplate = (cityNames, datesTrip, totalPrice) => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${cityNames()}</h1>

      <p class="trip-info__dates">${datesTrip()}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice()}</span>
    </p>
  </section>`
);

export default class CreateTripInfo extends SmartView {
  #points = [];

  constructor(points) {
    super();
    this.#points = points.sort(sortByDays);
  }

  get getTemplate() {
    return createTripInfoTemplate(this.#createCityNames, this.#createDates, this.#createTotalTripPrice);
  }

  #createTotalTripPrice = () => {
    const points = this.#points;
    const totalPointPrice = points.reduce((sum, point) => sum + point.price, 0);
    const totalOffersSum = points.map(({offer}) => offer.reduce((sum, currentOffer) => sum + currentOffer.price, 0));
    const totalTripPrice = totalOffersSum.reduce((sum, offerPrice) => sum + offerPrice, totalPointPrice);

    return totalTripPrice;
  }

  #createCityNames = () => {
    const points = this.#points.sort(sortByDays);

    if (points.length > 0) {
      const firstCityName = points[0].destination.name;
      const secondCityName = points[1].destination.name;
      const lastCityName = points[points.length - 1].destination.name;

      switch (points.length) {
        case 0:
          break;
        case 1:
          return `${firstCityName}`;
        case 2:
          return `${firstCityName}&nbsp;&mdash;&nbsp;${lastCityName}`;
        case 3:
          return `${firstCityName}&nbsp;&mdash;&nbsp;${secondCityName}&nbsp;&mdash;&nbsp;${lastCityName}`;
        default:
          return `${firstCityName}&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;${lastCityName}`;
      }
    }
  }

  #createDates = () => {
    const points = this.#points.sort(sortByDays);

    if (points.length > 0) {
      return `${points[0].timeStart.format('MMM D')}&nbsp;&mdash;&nbsp;${points[points.length - 1].timeEnd.format('MMM D')}`;
    }
  }
}
