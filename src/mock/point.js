import {getRandomInteger} from '../utils/utils.js';
import {generateElement} from '../utils/utils.js';
import {OFFERS} from '../utils/const.js';
import {DESTINATIONS} from '../utils/const.js';
import {DESCRIPTIONS} from '../utils/const.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {nanoid} from 'nanoid';

dayjs.extend(duration);

const PRICE_FROM = 0;
const PRICE_TO = 1000;

const createPhotos = () => {
  const COUNT = getRandomInteger(1, 5);
  const pictures = [];

  for (let i = 0; i < COUNT; i++) {
    const picture = {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(PRICE_FROM, PRICE_TO)}`,
      description: `${generateElement(DESCRIPTIONS)}`,
    };

    pictures.push(picture);
  }

  return pictures;
};

const generateDate = () => {
  const DAY_GAP = 7;
  const daysGapStart = getRandomInteger(-DAY_GAP, 0);
  const daysGapEnd = getRandomInteger(0, DAY_GAP);

  const TIME_GAP = 35; // 35 чтобы при генерации появлялись часы
  const timeGapStart = getRandomInteger(-TIME_GAP, 0);
  const timeGapEnd = getRandomInteger(0, TIME_GAP);

  const dayTimeStart = dayjs().add(daysGapStart, 'd').add(timeGapStart, 'm');
  const dayTimeEnd = dayjs().add(daysGapEnd, 'd').add(timeGapEnd, 'm');

  return {dayTimeStart, dayTimeEnd};
};

const createHumanizeTimeDuration = (timeStart, timeEnd) => {
  const minutesDuration = timeEnd.diff(timeStart, 'm') % 60 > 0 ? `${timeEnd.diff(timeStart, 'm') % 60}M` : '';
  const hoursDuration = timeEnd.diff(timeStart, 'h') % 24 > 0 ? `${timeEnd.diff(timeStart, 'h') % 24}H` : '';
  const daysDuration = timeEnd.diff(timeStart, 'd') > 0 ? `${timeEnd.diff(timeStart, 'd')}D` : '';

  return daysDuration + hoursDuration + minutesDuration;
};

export const generatePoint = () => {
  const currentOffer = generateElement(OFFERS);
  const currentDestination = generateElement(DESTINATIONS);
  const date = generateDate();
  const timeStart = date.dayTimeStart;
  const timeEnd = date.dayTimeEnd;
  const timeDuration = date.dayTimeEnd.diff(date.dayTimeStart);

  return {
    id: nanoid(),
    type: currentOffer.eventType,
    destination: {
      name: currentDestination.name,
      description: currentDestination.description,
      pictures: createPhotos(),
    },
    timeStart,
    timeEnd,
    timeDuration,
    createHumanizeTimeDuration,
    price: getRandomInteger(PRICE_FROM, PRICE_TO),
    offer: currentOffer.offers,
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

// console.log(generatePoint());
