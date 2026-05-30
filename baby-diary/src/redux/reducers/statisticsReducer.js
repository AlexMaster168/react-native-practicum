import Fire from '../../firebase';
import { eachDayOfInterval } from 'date-fns';
import moment from 'moment';

const SET_DAY_OF_WEEK = 'statisticsScreen/SET_DAY_OF_WEEK';
const SET_DAY_OF_PREV_WEEK = 'statisticsScreen/SET_DAY_OF_PREV_WEEK';
// const SET_DAY_OF_MONTH = 'statisticsScreen/SET_DAY_OF_MONTH'
const SET_PREV_ACTIVE_DATE = 'statisticsScreen/SET_PREV_ACTIVE_DATE';
const SET_NEXT_ACTIVE_DATE = 'statisticsScreen/SET_NEXT_ACTIVE_DATE';
const SET_DREAMS = 'statisticsScreen/SET_DREAMS';
const SET_TIME_LINE_DREAMS = 'statisticsScreen/SET_TIME_LINE_DREAMS';
const SET_SHOW_MEDIANA = 'statisticsScreen/SET_SHOW_MEDIANA';
const SET_LOADING = 'statisticsScreen/SET_LOADING';
const SET_DREAM_COLOR_INDICATOR = 'statisticsScreen/SET_DREAM_COLOR_INDICATOR';
const SET_STATISTIC_COLOR_INDICATOR =
  'statisticsScreen/SET_STATISTIC_COLOR_INDICATOR';
const SET_GESTURE = 'statisticsScreen/SET_GESTURE';

const SET_CHART_PREV = 'statisticChartScreen/SET_CHART_PREV';
const SET_CHART_SETTINGS = 'statisticChartScreen/SET_CHART_SETTINGS';
const SET_CHART_RANGES = 'statisticChartScreen/SET_CHART_RANGES';
const SET_DIAGRAM_PREV_DREAMS = 'statisticChartScreen/SET_DIAGRAM_PREV_DREAMS';
const SET_TABLE_MODE = 'statisticChartScreen/SET_TABLE_MODE';

let initialState = {
  weeks: [],
  prevWeeks: [],
  prevActiveDate: moment().local().subtract(7, 'day'),
  nextActiveDate: moment().local(),
  dreams: [],
  loading: false,
  colorDreamIndicator: false,
  colorStatisticIndicator: false,
  gesture: false,
  timeLineDreams: true,
  showMediana: true,
  diagramPrevDreams: [],
  tableMode: { value: 'table' },
  chartRanges: {
    table: {
      start: moment().subtract(6, 'day').toDate(),
      end: new Date(),
    },
    summary: {
      start: moment().subtract(6, 'day').toDate(),
      end: new Date(),
    },
    diagram: {
      start: moment().subtract(6, 'day').toDate(),
      end: new Date(),
    },
    event_diagram: {
      start: moment().subtract(6, 'day').toDate(),
      end: new Date(),
    },
    ratio_diagram: {
      start: moment().subtract(29, 'day').toDate(),
      end: new Date(),
    },
    graph: {
      start: moment().subtract(13, 'day').toDate(),
      end: new Date(),
    },
  },
  chartPrev: true,
  chartSettings: [
    {
      chart: true,
      chartPrev: true,
      label: true,
      nameOfChart: 'total_sleep',
      chartColor: 'green',
      textColor: 'white',
    },
    {
      chart: true,
      chartPrev: true,
      label: true,
      nameOfChart: 'day_sleep',
      chartColor: 'orange',
    },
    {
      chart: true,
      chartPrev: true,
      label: true,
      nameOfChart: 'night_sleep',
      chartColor: 'blue',
      textColor: 'white',
    },
    {
      chart: true,
      chartPrev: true,
      label: true,
      nameOfChart: 'wakefulness_text',
      chartColor: '#f54e42',
    },
  ],
};

export const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DAY_OF_WEEK: {
      return {
        ...state,
        weeks: action.weeks,
      };
    }
    case SET_DAY_OF_PREV_WEEK: {
      return {
        ...state,
        prevWeeks: action.prevWeeks,
      };
    }
    case SET_TIME_LINE_DREAMS: {
      return {
        ...state,
        timeLineDreams: action.timeLineDreams,
      };
    }
    case SET_SHOW_MEDIANA: {
      return {
        ...state,
        showMediana: action.showMediana,
      };
    }
    case SET_PREV_ACTIVE_DATE:
      return {
        ...state,
        prevActiveDate: action.activeDate,
      };
    case SET_NEXT_ACTIVE_DATE:
      return {
        ...state,
        nextActiveDate: action.activeDate,
      };
    case SET_DREAMS:
      return {
        ...state,
        dreams: action.dreams,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case SET_DREAM_COLOR_INDICATOR:
      return {
        ...state,
        colorDreamIndicator: action.indicator,
      };
    case SET_STATISTIC_COLOR_INDICATOR:
      return {
        ...state,
        colorStatisticIndicator: action.indicator,
      };
    case SET_GESTURE:
      return {
        ...state,
        gesture: action.indicator,
      };
    case SET_CHART_SETTINGS:
      return {
        ...state,
        chartSettings: action.settngs,
      };

    case SET_CHART_PREV:
      return {
        ...state,
        chartPrev: action.chartPrev,
      };
    case SET_CHART_RANGES:
      return {
        ...state,
        chartRanges: action.chartRanges,
      };
    case SET_DIAGRAM_PREV_DREAMS:
      return {
        ...state,
        diagramPrevDreams: action.diagramPrevDreams,
      };
    case SET_TABLE_MODE:
      return {
        ...state,
        tableMode: action.tableMode,
      };
    default:
      return state;
  }
};

export const setWeeks = (weeks) => ({ type: SET_DAY_OF_WEEK, weeks });
export const setPrevWeeks = (prevWeeks) => ({
  type: SET_DAY_OF_PREV_WEEK,
  prevWeeks,
});
export const setShowMediana = (showMediana) => ({
  type: SET_SHOW_MEDIANA,
  showMediana,
});
export const setPrevActiveDate = (activeDate) => ({
  type: SET_PREV_ACTIVE_DATE,
  activeDate,
});
export const setTimeLineDreams = (timeLineDreams) => ({
  type: SET_TIME_LINE_DREAMS,
  timeLineDreams,
});
export const setNextActiveDate = (activeDate) => ({
  type: SET_NEXT_ACTIVE_DATE,
  activeDate,
});
export const setDreams = (dreams) => ({ type: SET_DREAMS, dreams });
export const setLoading = (loading) => ({ type: SET_LOADING, loading });
export const setDreamColorIndicator = (indicator) => ({
  type: SET_DREAM_COLOR_INDICATOR,
  indicator,
});
export const setStatisticColorIndicator = (indicator) => ({
  type: SET_STATISTIC_COLOR_INDICATOR,
  indicator,
});
export const setGesture = (indicator) => ({ type: SET_GESTURE, indicator });
export const setSettings = (settngs) => ({ type: SET_CHART_SETTINGS, settngs });
export const setChartTotalSleep = (chartTotalSleep) => ({
  type: SET_CHART_TOTAL_SLEEP,
  chartTotalSleep,
});
export const setChartDaySleep = (chartDaySleep) => ({
  type: SET_CHART_DAY_SLEEP,
  chartDaySleep,
});
export const setChartNightSleep = (chartNightSleep) => ({
  type: SET_CHART_NIGHT_SLEEP,
  chartNightSleep,
});
export const setChartPrev = (chartPrev) => ({
  type: SET_CHART_PREV,
  chartPrev,
});
export const setChartRanges = (chartRanges) => ({
  type: SET_CHART_RANGES,
  chartRanges,
});
export const setDiagramPrevDreams = (diagramPrevDreams) => ({
  type: SET_DIAGRAM_PREV_DREAMS,
  diagramPrevDreams,
});
export const setTableMode = (tableMode) => ({
  type: SET_TABLE_MODE,
  tableMode,
});
// export const setWeeksTC = (endDay, type, getMonth, daysRange) => (dispatch) => {
//   console.log('set weeks tC');
//   dispatch(setLoading(true));
//   const startDate = endDay.toDate();
//   const endDate = _calcEndDay(startDate, type, getMonth, daysRange);
//   let daysOfWeek;

//   switch (type) {
//     case 'prev':
//       {
//         daysOfWeek = eachDayOfInterval({ start: endDate, end: startDate });
//       }
//       break;
//     case 'next':
//       {
//         daysOfWeek = eachDayOfInterval({ start: startDate, end: endDate });
//       }
//       break;
//     default: {
//       daysOfWeek = eachDayOfInterval({ start: endDate, end: startDate });
//     }
//   }

//   let prevActiveDate;
//   let nextActiveDate;

//   if (getMonth) {
//     prevActiveDate = moment(daysOfWeek[24]);
//     nextActiveDate = moment(daysOfWeek[daysOfWeek.length - 1]);
//   } else {
//     prevActiveDate = moment(daysOfWeek[0]);
//     nextActiveDate = moment(daysOfWeek[daysOfWeek.length - 1]);
//   }
//   dispatch(setPrevActiveDate(prevActiveDate));
//   dispatch(setNextActiveDate(nextActiveDate));
//   dispatch(setWeeks(daysOfWeek));
//   // dispatch(
//   //   setPrevWeekTC(
//   //     eachDayOfInterval({
//   //       start: _calcEndDay(startDate, 'prev', true),
//   //       end: startDate,
//   //     })
//   //   )
//   // );
//   dispatch(setDreamsTC(daysOfWeek));
// };

export const setWeeksTC = (startDate, endDate) => async (dispatch) => {
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  dispatch(setWeeks(days));
};

export const setDreamsTC = (days) => async (dispatch) => {
  const dates = days.map((day) => moment(day));
  const response = await Promise.all(
    dates.map((date) => {
      return Fire.getOnce(date);
    })
  );
  const dreams = response.map((dream) => ({ dream: dream.dreams }));
  dispatch(setDreams(dreams));
  dispatch(setLoading(false));
};
export const setDiagramPrevDreamsTC = (date) => async (dispatch) => {
  const { dreams } = await Fire.getOnce(date);
  dispatch(setDiagramPrevDreams(dreams));
  dispatch(setLoading(false));
};
export const setPrevWeekTC = (days) => async (dispatch) => {
  const dates = days.map((day) => moment(day));

  const response = await Promise.all(
    dates.map((date) => {
      return Fire.getOnce(date);
    })
  );
  const dreams = response.map((dream, index) => ({
    dream: dream.dreams,
    date: days[index],
  }));
  dispatch(setPrevWeeks(dreams));
  dispatch(setLoading(false));
};

export const setDreamColorStatistic = (indicator) => (dispatch, getState) => {
  dispatch(setDreamColorIndicator(indicator));
};

export const setStatisticColorStatistic =
  (indicator) => (dispatch, getState) => {
    dispatch(setStatisticColorIndicator(indicator));
  };

export const setGestureActive = (indicator) => (dispatch, getState) => {
  dispatch(setGesture(indicator));
};

export const setChartSettings = (settings) => (dispatch) => {
  dispatch(setSettings(settings));
};
export const updateChartSettings =
  (chartSettings, type, value, metka) => async (dispatch) => {
    const previousDreams = chartSettings;
    console.log(
      chartSettings.map((setting) =>
        setting.nameOfChart === type ? { ...setting, chart: value } : setting
      )
    );
    try {
      switch (metka) {
        case 'chart':
          dispatch(
            setChartSettings(
              chartSettings.map((setting) =>
                setting.nameOfChart === type
                  ? { ...setting, chart: value }
                  : setting
              )
            )
          );
          break;
        case 'label':
          dispatch(
            setChartSettings(
              chartSettings.map((setting) =>
                setting.nameOfChart === type
                  ? { ...setting, label: value }
                  : setting
              )
            )
          );
          break;
        case 'chartPrev':
          dispatch(
            setChartSettings(
              chartSettings.map((setting) =>
                setting.nameOfChart === type
                  ? { ...setting, chartPrev: value }
                  : setting
              )
            )
          );
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

/* export default {setWeeksTC, setDreamsTC, setChartSettings,} */
