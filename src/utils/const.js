export const OFFERS = [
  {
    id: 'event-offer-luggage-1',
    name: 'event-offer-luggage',
    title: 'Add luggage',
    price: 30,
  },
  {
    id: 'event-offer-comfort-1',
    name: 'event-offer-comfort',
    title: 'Switch to comfort class',
    price: 100,
  },
  {
    id: 'event-offer-meal-1',
    name: 'event-offer-meal',
    title: 'Add meal',
    price: 15,
  },
  {
    id: 'event-offer-seats-1',
    name: 'event-offer-seats',
    title: 'Choose seats',
    price: 5,
  },
  {
    id: 'event-offer-train-1',
    name: 'event-offer-train',
    title: 'Travel by train',
    price: 40,
  },
];

export const TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

export const DESTINATIONS = [
  'Amsterdam',
  'Geneva',
  'Chamonix',
  'Berlin',
  'Porto',
  'Barselona',
  'London',
  'Oslo',
  'Bratislava',
  'Milan',
  'Ibiza',
];

export const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
];

export const FILTERS = [
  'everything',
  'future',
  'past',
];

export const MENU_TABS = [
  'Table',
  'Stats',
];

export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

export const DEFAULT_VALUE = {
  menu: MENU_TABS[0],
  filter: FILTERS[0],
  sorting: SortType.DAY,
};

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
