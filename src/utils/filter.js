import dayjs from 'dayjs';
import {FilterType} from './const.js';

const isExpiringTodayAfter = (pointFirst, pointSecond) => dayjs(pointFirst.timeStart, 'd').isAfter(pointSecond.timeStart, 'd');
const isExpiringTodayBefore = (pointFirst, pointSecond) => dayjs(pointFirst.timeEnd, 'd').isBefore(pointSecond.timeEnd, 'd');

export const filters = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((pointFirst, pointSecond) => isExpiringTodayAfter(pointFirst, pointSecond)),
  [FilterType.PAST]: (points) => points.filter((pointFirst, pointSecond) => isExpiringTodayBefore(pointFirst, pointSecond)),
};
