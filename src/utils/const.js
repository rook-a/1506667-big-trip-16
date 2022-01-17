export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const MENU_TABS = {
  TABLE: 'TABLE',
  STATS: 'STATS',
};

export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

export const DEFAULT_VALUE = {
  menu: MENU_TABS.TABLE,
  filter: FilterType.EVERYTHING,
  sorting: SortType.DAY,
};

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const DATEPICKER_DEFAULT_SETTING = {
  enableTime: true,
  'time_24hr': true,
  dateFormat: 'd/m/y H:i',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};
