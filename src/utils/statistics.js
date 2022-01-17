import dayjs from 'dayjs';

export const getUniqueType = (points) => {
  const result = [];

  points.map(({type}) => {
    const typeUpperCase = type.toUpperCase();

    if (!result.includes(typeUpperCase)) {
      result.push(typeUpperCase);
    }
  });

  return result;
};

export const createHumanizeTimeDuration = (time) => {
  // console.log('time', time);
  const minutesDuration = Math.floor(time / (1000 * 60)) % 60 > 0 ? `${Math.floor(time / (1000 * 60)) % 60}M` : '';
  const hoursDuration = Math.floor(time / (1000 * 60 * 60)) % 24 > 0 ? `${Math.floor(time / (1000 * 60 * 60)) % 24}H` : '';
  const daysDuration = Math.floor(time / (1000 * 60 * 60 * 24)) > 0 ? `${Math.floor(time / (1000 * 60 * 60 * 24))}D` : '';

  return daysDuration + hoursDuration + minutesDuration;
};

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


