import dayjs from 'dayjs';
import {FilterType} from './const.js';

const CheckExpiringTodayAfter = (point) => dayjs().isBefore(point.timeStart) || dayjs().isBefore(point.timeEnd);
const CheckExpiringTodayBefore = (point) => dayjs().isAfter(point.timeStart) || dayjs().isAfter(point.timeEnd);

export const filters = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => CheckExpiringTodayAfter(point)),
  [FilterType.PAST]: (points) => points.filter((point) => CheckExpiringTodayBefore(point)),
};
