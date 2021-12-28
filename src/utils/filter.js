import dayjs from 'dayjs';
import {FilterType} from './const.js';

const isExpiringTodayAfter = (pointFirst, pointSecond) => dayjs(pointFirst.timeStart).isAfter(pointSecond.timeStart);
const isExpiringTodayBefore = (pointFirst, pointSecond) => dayjs(pointFirst.timeStart).isBefore(pointSecond.timeStart);

export const filters = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((pointFirst, pointSecond) => isExpiringTodayAfter(pointFirst, pointSecond)),
  [FilterType.PAST]: (points) => points.filter((pointFirst, pointSecond) => isExpiringTodayBefore(pointFirst, pointSecond)),
};
