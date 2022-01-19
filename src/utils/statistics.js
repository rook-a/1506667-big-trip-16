import dayjs from 'dayjs';
import {addZero} from './utils.js';

/**
 * addZero — добавляет в строку 0, если разница меньше 10
 * @param {*} time продолжительность всех точек одного типа в миллисекундах
 * @returns строка вида 1D11H11M
 */

export const createHumanizeTimeDuration = (time) => {
  const minutesDuration = Math.floor(time / (1000 * 60)) % 60 > 0 ? `${addZero(Math.floor(time / (1000 * 60)) % 60)}M` : '';
  const hoursDuration = Math.floor(time / (1000 * 60 * 60)) % 24 > 0 ? `${addZero(Math.floor(time / (1000 * 60 * 60)) % 24)}H` : '';
  const daysDuration = Math.floor(time / (1000 * 60 * 60 * 24)) > 0 ? `${addZero(Math.floor(time / (1000 * 60 * 60 * 24)))}D` : '';

  return daysDuration + hoursDuration + minutesDuration;
};

/**
 * @param {*} points — массив всех точек маршрута
 * @returns массив уникальных типов путешествия
 */

export const getUniqueType = (points) => {
  const results = [];

  points.map(({type}) => {
    const typeUpperCase = type.toUpperCase();

    if (!results.includes(typeUpperCase)) {
      results.push(typeUpperCase);
    }
  });

  return results;
};

/**
 * @param {*} points — массив всех точек маршрута
 * @param {*} types — массив уникальных типов путешествия
 * @returns объект вида {ТИП_ТОЧКИ: общая стоимость всех точке этого типа}
 */

export const getTotalPriceType = (points, types) => {
  const result = {};

  types.map((type) => {
    let sum = 0;
    points.map((point) => {
      if (point.type === type.toLowerCase()) {
        sum += point.price;
      }
    });
    result[type] = sum;
  });

  return result;
};

/**
 * @param {*} points — массив всех точек маршрута
 * @param {*} types — массив уникальных типов путешествия
 * @returns объект вида {ТИП_ТОЧКИ: общее число подходящих по типу точек}
 */

export const getTypeCount = (points, types) => {
  const result = {};

  types.map((type) => {
    let sum = 0;
    points.map((point) => {
      if (point.type === type.toLowerCase()) {
        sum++;
      }
    });
    result[type] = sum;
  });

  return result;
};

/**
 * @param {*} points — массив всех точек маршрута
 * @param {*} types — массив уникальных типов путешествия
 * @returns объект вида {ТИП_ТОЧКИ: длительность всех точек этого типа в миллисекундах}
 */

export const getTimeType = (points, types) => {
  const result = {};

  types.map((type) => {
    let sum = 0;
    points.map((point) => {
      if (point.type === type.toLowerCase()) {
        sum += dayjs(point.timeEnd).diff(point.timeStart);
      }
    });
    result[type] = sum;
  });

  return result;
};


