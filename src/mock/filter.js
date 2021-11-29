import dayjs from 'dayjs';
//нужно исправить. компонент работает неверно


//const isExpired = dayjs().isAfter(generateDate()[0], 'D');
//isSameOrAfter()
//isSameOrBefore()
// console.log(isExpired);

const isExpiringTodayAfter = (date) => dayjs(date).isAfter(dayjs(), 'D');
const isExpiringTodayBefore = (date) => dayjs(date).isBefore(dayjs(), 'D');

const pointFilterMap = {
  everything: (tasks) => tasks,
  future: (tasks) => tasks.filter((task) => isExpiringTodayAfter(task.date)),
  past: (tasks) => tasks.filter((task) => isExpiringTodayBefore(task.date)),
};

export const generateFilter = (tasks) => Object.entries(pointFilterMap).map(
  ([filterName, fn]) => ({
    name: filterName,
    cb: fn(tasks),
  }),
);
