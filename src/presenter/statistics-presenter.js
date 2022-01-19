import StatisticsView from '../view/statistics-view.js';
import {RenderPosition, render, remove} from '../utils/render.js';
import {getUniqueType, getTotalPriceType, getTypeCount, getTimeType, createHumanizeTimeDuration} from '../utils/statistics.js';
import {Chart} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BAR_HEIGHT = 55;

export default class StatisticsPresenter {
  #tripEventsContainer = null;
  #pointsModel = null;
  #statisticsComponent = null;

  constructor(tripEventsContainer, pointsModel) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#statisticsComponent = new StatisticsView();
    this.#pointsModel.addObserver(this.#makeOnModelEvent);

    this.#renderStatistics();
    this.#renderMoneyChart();
    this.#renderTypeChart();
    this.#renderTimeChart();
  }

  destroy = () => {
    remove(this.#statisticsComponent);
    this.#pointsModel.removeObserver(this.#makeOnModelEvent);
  }

  #renderStatistics = () => {
    const statistics = this.#tripEventsContainer.querySelector('.statistics');

    //проверка наличия статистики на странице чтобы исключить неоднократное добавление при повторных кликах на STATS
    if (statistics) {
      return;
    }

    render(this.#tripEventsContainer, this.#statisticsComponent, RenderPosition.BEFOREEND);
  }

  #createChart = ({ctx, labels, data, formatter, text}) => new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter,
        },
      },
      title: {
        display: true,
        text,
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });

  #renderMoneyChart = () => {
    const ctx = document.querySelector('#money');
    const uniqueType = getUniqueType(this.#pointsModel.points);
    const totalPrice = getTotalPriceType(this.#pointsModel.points, uniqueType);

    const labels = Object.keys(totalPrice).sort((a, b) => totalPrice[b] - totalPrice[a]);
    const data = Object.values(totalPrice).sort((a, b) => b - a);
    const formatter = (value) => `€ ${value}`;
    const text = 'MONEY';

    ctx.height = BAR_HEIGHT * labels.length;

    return this.#createChart({ctx, labels, data, formatter, text});
  }

  #renderTypeChart = () => {
    const ctx = document.querySelector('#type');
    const uniqueType = getUniqueType(this.#pointsModel.points);
    const typeCount = getTypeCount(this.#pointsModel.points, uniqueType);

    const labels = Object.keys(typeCount).sort((a, b) => typeCount[b] - typeCount[a]);
    const data = Object.values(typeCount).sort((a, b) => b - a);
    const formatter = (value) => `${value}x`;
    const text = 'TYPE';

    ctx.height = BAR_HEIGHT * labels.length;

    return this.#createChart({ctx, labels, data, formatter, text});
  }

  #renderTimeChart = () => {
    const ctx = document.querySelector('#time');
    const uniqueType = getUniqueType(this.#pointsModel.points);
    const timeType = getTimeType(this.#pointsModel.points, uniqueType);

    const labels = Object.keys(timeType).sort((a, b) => timeType[b] - timeType[a]);
    const data = Object.values(timeType).sort((a, b) => b - a);
    const formatter = (value) => `${createHumanizeTimeDuration(value)}`;
    const text = 'TIME';

    ctx.height = BAR_HEIGHT * labels.length;

    return this.#createChart({ctx, labels, data, formatter, text});
  }

  #makeOnModelEvent = () => {
    this.init();
  }
}
