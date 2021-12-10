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
