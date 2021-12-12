import {getRandomInteger} from '../utils/utils.js';
import {generateElement} from '../utils/utils.js';
import {getRandomElements} from '../utils/utils.js';
import {OFFERS} from '../utils/const.js';
import {TYPES} from '../utils/const.js';
import {DESTINATIONS} from '../utils/const.js';
import {DESCRIPTIONS} from '../utils/const.js';
import dayjs from 'dayjs';
import {nanoid} from 'nanoid';

const PRICE_FROM = 0;
const PRICE_TO = 1000;

const createPhotos = () => {
  const COUNT = getRandomInteger(1, 5);
  const pictures = [];

  for (let i = 0; i < COUNT; i++) {
    const picture = `http://picsum.photos/248/152?r=${getRandomInteger(PRICE_FROM, PRICE_TO)}`;

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

  /**
   * разница между значениями start / end пока не работает как нужно
   * https://coderoad.ru/60226101/%D0%A0%D0%B0%D0%B7%D0%BD%D0%B8%D1%86%D0%B0-%D0%BC%D0%B5%D0%B6%D0%B4%D1%83-%D0%B4%D0%B2%D1%83%D0%BC%D1%8F-%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%B0%D0%BC%D0%B8-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F-dayjs
   *
   * const fromtime = '11:20'
   * const totime = '12:30'
   * const ft = dayjs(`2000-01-01 ${fromtime}`);
   * const tt = dayjs(`2000-01-01 ${totime}`);
   * const mins = tt.diff(ft, "minutes", true);
   * const totalHours = parseInt(mins / 60);
   * const totalMins = dayjs().minute(mins).$m
   */

  return {dayFormat, dayFullFormat, dayTimeStart, dayTimeEnd};
};

export const generatePoint = () => {
  const date = generateDate().dayFormat;
  const dateFullFormat = generateDate().dayFullFormat;
  const timeStart = generateDate().dayTimeStart;
  const timeEnd = generateDate().dayTimeEnd;

  return {
    id: nanoid(),
    type: generateElement(TYPES),
    destination: {
      name: generateElement(DESTINATIONS),
      description: generateElement(DESCRIPTIONS),
      pictures: getRandomElements(createPhotos()),
    },
    date,
    dateFullFormat,
    timeStart,
    timeEnd,
    price: getRandomInteger(PRICE_FROM, PRICE_TO),
    offer: getRandomElements(OFFERS),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};


//console.log(generatePoint());
