import dayjs from 'dayjs';

export const sortByPrice = (pointFirst, pointSecond) => pointSecond.price - pointFirst.price;

export const sortByDays = (pointFirst, pointSecond) => {
  if (pointFirst.timeStart.isBefore(pointSecond.timeStart)) {
    return -1;
  }

  if (pointFirst.timeStart.isAfter(pointSecond.timeStart)) {
    return 1;
  }

  return 0;
};

export const sortByTime = (pointFirst, pointSecond) => {
  const firstPointDiff  = pointFirst.timeStart.diff(pointFirst.timeEnd);
  const secondPointDiff = pointSecond.timeStart.diff(pointSecond.timeEnd);

  if (secondPointDiff < firstPointDiff) {
    return 1;
  }

  if (secondPointDiff > firstPointDiff) {
    return -1;
  }

  return 0;
};

export const createHumanizeTimeDuration = (timeStart, timeEnd) => {
  const minutesDuration = timeEnd.diff(timeStart, 'm') % 60 > 0 ? `${timeEnd.diff(timeStart, 'm') % 60}M` : '';
  const hoursDuration = timeEnd.diff(timeStart, 'h') % 24 > 0 ? `${timeEnd.diff(timeStart, 'h') % 24}H` : '';
  const daysDuration = timeEnd.diff(timeStart, 'd') > 0 ? `${timeEnd.diff(timeStart, 'd')}D` : '';

  return daysDuration + hoursDuration + minutesDuration;
};

export const isDatesEqual = (dateFirst, dateSecond) => (dateFirst === null && dateSecond === null) || dayjs(dateFirst).isSame(dateSecond);

export const defaultPoint = {
  id: '',
  type: 'taxi',
  destination: {
    name: 'Amsterdam',
    description: 'Bla bla bla',
    pictures: [],
  },
  timeStart: dayjs().add(1, 'd'),
  timeEnd: dayjs().add(3, 'd'),
  price: 5,
  offer: [],
  isFavorite: false,
};
