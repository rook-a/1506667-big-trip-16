import dayjs from 'dayjs';

export const getRandomInteger = (from, to) => {
  from = Math.ceil(from);
  to = Math.floor(to);

  return Math.round(Math.random() * (to - from) + from);
};

export const generateElement = (elements) => {
  const randomIndex = getRandomInteger(0, elements.length - 1);

  return elements[randomIndex];
};

export const getRandomElements = (elements) => {
  const count = getRandomInteger(0, elements.length - 1);
  const arrayElements = [];

  for (let i = 0; i < count; i++) {
    arrayElements.push(elements[i]);
  }

  return arrayElements;
};

export const sortByPrice = (pointFirst, pointSecond) => pointSecond.price - pointFirst.price;

export const sortByDays = (pointFirst, pointSecond) => {
  if (dayjs(pointFirst.timeStart).isBefore(pointSecond.timeStart)) {
    return -1;
  }

  if (dayjs(pointFirst.timeStart).isAfter(pointSecond.timeStart)) {
    return 1;
  }

  return 0;
};

export const sortByTime = (pointFirst, pointSecond) => {
  if (pointSecond.timeDuration > pointFirst.timeDuration) {
    return 1;
  }

  if (pointSecond.timeDuration < pointFirst.timeDuration) {
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
