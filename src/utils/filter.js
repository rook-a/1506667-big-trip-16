import dayjs from 'dayjs';
import {FilterType} from './const.js';

const checkExpiringTodayAfter = (point) => dayjs().isBefore(point.timeStart) || dayjs().isBefore(point.timeEnd);
const checkExpiringTodayBefore = (point) => dayjs().isAfter(point.timeStart) || dayjs().isAfter(point.timeEnd);

export const filters = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => checkExpiringTodayAfter(point)),
  [FilterType.PAST]: (points) => points.filter((point) => checkExpiringTodayBefore(point)),
};
