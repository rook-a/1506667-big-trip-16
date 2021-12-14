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

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const sortPrice = (pointFirst, pointSecond) => pointSecond.price - pointFirst.price;

export const sortDays = (pointFirst, pointSecond) => {
  if (dayjs(pointFirst.date).isBefore(pointSecond.date)) {
    return 1;
  }

  if (dayjs(pointFirst.date).isAfter(pointSecond.date)) {
    return -1;
  }

  return 0;
};

export const sortTime = (pointFirst, pointSecond) => {
  if (pointSecond.timeDuration > pointFirst.timeDuration) {
    return 1;
  }

  if (pointSecond.timeDuration < pointFirst.timeDuration) {
    return -1;
  }

  return 0;
};
