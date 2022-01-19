import dayjs from 'dayjs';
import {FilterType} from './const.js';

const isExpiringTodayAfter = (point) => dayjs().isBefore(point.timeStart) || dayjs().isBefore(point.timeEnd);
const isExpiringTodayBefore = (point) => dayjs().isAfter(point.timeStart) || dayjs().isAfter(point.timeEnd);

export const filters = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isExpiringTodayAfter(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isExpiringTodayBefore(point)),
};
