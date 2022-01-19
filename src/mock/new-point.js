import {MOCK_OFFERS} from './offers.js';
import {MOCK_DESTINATIONS} from './destinations.js';
import {MOCK_DESCRIPTIONS} from './description.js';
import dayjs from 'dayjs';

const FROM = 0;
const TO = 1000;

const getRandomInteger = (from, to) => {
  from = Math.ceil(from);
  to = Math.floor(to);

  return Math.round(Math.random() * (to - from) + from);
};

const generateElement = (elements) => {
  const randomIndex = getRandomInteger(0, elements.length - 1);

  return elements[randomIndex];
};

const currentOffers = generateElement(MOCK_OFFERS);
const currentDestination = generateElement(MOCK_DESTINATIONS);
const currentDescription = generateElement(MOCK_DESCRIPTIONS);

export const defaultPoint = {
  id: 0,
  type: currentOffers.type,
  destination: {
    name: currentDestination.name,
    description: currentDestination.description,
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(FROM, TO)}`,
        description: currentDescription,
      },
    ],
  },
  timeStart: dayjs().add(1, 'd'),
  timeEnd: dayjs().add(3, 'd'),
  price: 5,
  offers: currentOffers.offers,
  isFavorite: false,
};
