import dayjs from 'dayjs';

export const defaultPoint = {
  id: 0,
  type: '',
  destination: null,
  timeStart: dayjs().add(1, 'd'),
  timeEnd: dayjs().add(3, 'd'),
  price: 5,
  offers: [],
  isFavorite: false,
};
