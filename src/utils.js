export const getRandomInteger = (from, to) => {
  from = Math.ceil(from);
  to = Math.floor(to);

  return Math.round(Math.random() * (to - from) + from);
};

export const generateElement = (obj) => {
  const randomIndex = getRandomInteger(0, obj.length - 1);

  return obj[randomIndex];
};

export const getRandomElements = (elements) => {
  const count = getRandomInteger(0, elements.length - 1);
  const arrElements = [];

  for (let i = 0; i < count; i++) {
    arrElements.push(elements[i]);
  }

  return arrElements;
};
