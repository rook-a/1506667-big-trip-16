import {getRandomInteger} from '../utils/utils.js';
import {generateElement} from '../utils/utils.js';
import {OFFERS, DESTINATIONS, DESCRIPTIONS} from '../utils/const.js';
import {createHumanizeTimeDuration} from '../utils/utils.js';
import dayjs from 'dayjs';
import {nanoid} from 'nanoid';

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

// export const defaultPoint = {
//   id: '',
//   type: 'taxi',
//   destination: {
//     name: 'Amsterdam',
//     description: 'Bla bla bla',
//     pictures: [],
//   },
//   timeStart: dayjs(),
//   timeEnd: dayjs().add(3, 'd'),
//   timeDuration: '',
//   price: 5,
//   offer: [],
//   isFavorite: false,
// };

// console.log(generatePoint());
