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
