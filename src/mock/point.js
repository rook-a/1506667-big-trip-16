import {getRandomInteger} from '../utils/utils.js';
import {generateElement} from '../utils/utils.js';
// import {getRandomElements} from '../utils/utils.js';
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
  const daysGap = getRandomInteger(-DAY_GAP, DAY_GAP);

  const day = dayjs().add(daysGap, 'day').toDate();
  const dayFormat = dayjs(day).format('MMM D');
  const dayFullFormat = dayjs(day).format('DD/MM/YY');

  const TIME_GAP = 30;
  const timesGap = getRandomInteger(-TIME_GAP, TIME_GAP);
  const dayTimeStart = dayjs().add(timesGap, 'm').format('HH:mm');
  const dayTimeEnd = dayjs().add(timesGap, 'm').format('HH:mm');

  return {dayFormat, dayFullFormat, dayTimeStart, dayTimeEnd};
};

export const generatePoint = () => {
  const currentOffer = generateElement(OFFERS);
  const currentDestination = generateElement(DESTINATIONS);
  const date = generateDate().dayFormat;
  const dateFullFormat = generateDate().dayFullFormat;
  const timeStart = generateDate().dayTimeStart;
  const timeEnd = generateDate().dayTimeEnd;
  const timeDuration = dayjs.duration(dayjs(`2000-01-01 ${timeEnd}`).diff(dayjs(`2000-01-01 ${timeStart}`))).minutes();

  return {
    id: nanoid(),
    type: currentOffer.eventType,
    destination: {
      name: currentDestination.name,
      description: currentDestination.description,
      pictures: createPhotos(),
    },
    date,
    dateFullFormat,
    timeStart,
    timeEnd,
    timeDuration,
    price: getRandomInteger(PRICE_FROM, PRICE_TO),
    offer: currentOffer.offers,
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

// console.log(generatePoint());
