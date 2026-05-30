import Fire from '../../firebase';
import moment from 'moment';
import 'moment/locale/ru';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { convertDateFromTime } from '../../utils/convertFromTime';
import { differenceInMinutes, formatDistanceStrict } from 'date-fns';
import { ru } from 'date-fns/locale';

const SET_DREAMS = 'mainScreen/SET_DREAMS';
const SET_YESTERDAY_DREAMS = 'mainScreen/SET_YESTERDAY_DREAMS';
const SET_TOMORROW_DREAMS = 'mainScreen/SET_TOMORROW_DREAMS';
const SET_TIME = 'mainScreen/SET_TIME';
const SET_DATE = 'mainScreen/SET_DATE';
const SET_ID = 'mainScreen/SET_ID';
const CLEAR_ID = 'mainScreen/CLEAR_ID';
const SET_LOADING = 'mainScreen/SET_LOADING';
const SET_DREAM = 'mainScreen/SET_DREAM';
const START_DREAM = 'mainScreen/START_DREAM';

let initialState = {
  dreams: [],
  currentDream: [],
  date: moment(),
  curTime: moment(),
  yesterday: [],
  tomorrow: [],
  id: '',
  isLoading: false,
  startedDream: false,
};

export const MainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DREAMS: {
      return { ...state, dreams: [...action.dreams] };
    }
    case SET_YESTERDAY_DREAMS: {
      return { ...state, yesterday: action.yesterdayDreams };
    }
    case SET_TOMORROW_DREAMS: {
      return { ...state, tomorrow: action.tomorrowDreams };
    }
    case SET_DREAM: {
      return { ...state, currentDream: action.dream };
    }
    case START_DREAM: {
      return { ...state, startedDream: action.started };
    }
    case SET_TIME: {
      return { ...state, curTime: moment() };
    }
    case SET_DATE: {
      return { ...state, date: action.date };
    }
    case SET_ID: {
      return { ...state, id: +Date.now().toString() };
    }
    case CLEAR_ID: {
      return { ...state, id: action.id };
    }
    case SET_LOADING: {
      return { ...state, isLoading: action.loading };
    }
    default:
      return state;
  }
};

export const setDreams = (dreams) => ({
  type: SET_DREAMS,
  dreams: [...dreams],
});
export const setYesterdayDreams = (yesterdayDreams) => ({
  type: SET_YESTERDAY_DREAMS,
  yesterdayDreams,
});
export const setTomorrowDreams = (tomorrowDreams) => ({
  type: SET_TOMORROW_DREAMS,
  tomorrowDreams,
});
export const setDream = (dream) => {
  return { type: SET_DREAM, dream };
};
export const setTimeSuccess = () => ({ type: SET_TIME });
export const setDateSuccess = (date) => ({ type: SET_DATE, date });
export const startDream = (started) => ({
  type: START_DREAM,
  started: started,
});
export const setId = () => ({ type: SET_ID });
export const clearId = () => ({ type: CLEAR_ID });
export const setLoading = (loading) => ({ type: SET_LOADING, loading });

export const getDataTC = (date) => async (dispatch, getState) => {
  const yesterdayDate = moment(date).subtract(1, 'day');

  try {
    // LOADER
    // dispatch(setLoading(true));

    const { dreams } = await Fire.getOnce(date);
    console.log('API 💀💀💀', dreams);
    const yesterdayDreams = await Fire.getOnce(yesterdayDate);

    if (dreams) {
      dispatch(setDreams(dreams));
      dispatch(setYesterdayDreams(yesterdayDreams.dreams));
      // console.log('set loading');
      dispatch(setLoading(false));
    }
  } catch (error) {
    dispatch(setDreams([]));
  }
};
const _calcWakefulness = async (dreams, endTime) => {
  const activeLanguages = await AsyncStorage.getItem('@active_language');
  const endTimeCurrent = moment.isMoment(endTime)
    ? endTime.format('HH:mm')
    : endTime;
  const sortedDreams = dreams.sort((a, b) =>
    a.startTime > b.startTime ? -1 : 1
  );

  const endTimeCalc =
    sortedDreams[1] && sortedDreams[1].endTime
      ? sortedDreams[1].endTime
      : endTimeCurrent
      ? endTimeCurrent
      : moment().local().format('HH:mm');
  const startTimeCalc =
    sortedDreams[0] && sortedDreams[0].startTime
      ? sortedDreams[0].startTime
      : moment().local().format('HH:mm');
  const start = convertDateFromTime(startTimeCalc);
  const end = convertDateFromTime(endTimeCalc);

  return {
    value: formatDistanceStrict(start, end, {
      locale: activeLanguages === 'en' ? ru : ru,
    }),
    inMinutes: differenceInMinutes(start, end),
  };
};
export const getCurrentDream = (date) => async (dispatch, getState) => {
  const previousDreams = [...getState().date.dreams];
  const { dream } = await Fire.getOnce(date, previousDreams);
  if (dream) dispatch(setDream(dream[0]));
};
const _isDayOrNight = async (time) => {
  const date = convertDateFromTime(time);
  const startTime = JSON.parse(await AsyncStorage.getItem(`@startNightSleep`));
  const endTime = JSON.parse(await AsyncStorage.getItem(`@endNightSleep`));
  const startHours = parseInt(startTime.split(':')[0]);
  const endHours = parseInt(endTime.split(':')[0]);
  const hours = date.getHours();

  return hours > endHours && hours < startHours ? 'day' : 'night';
};

// export const createDreamTC = (date, payload, dates) => async (dispatch, getState) => {
//   if (dates.end) {

//   }
// };

export const startDreamTC =
  (date, payload, isStartDream = false, isSameDay = null) =>
  async (dispatch, getState) => {
    dispatch(setTimeSuccess());
    dispatch(setId());
    let activeChild = JSON.parse(await AsyncStorage.getItem('@active_child'));
    const startT =
      payload?.startTime || moment(getState().date.curTime).format('HH:mm');

    const dream = {
      id: payload?.id || getState().date.id,
      startTime: startT,
      startDate: +new Date(payload?.startDate) || Date.now(),
      timeOfDay: payload?.timeOfDay || (await _isDayOrNight(startT)),
      place: payload?.place || 'Кроватка',
      comment: payload?.comment || '',
      events: payload?.events || [],
      tags: payload?.tags || [],
      countFeeding: payload?.countFeeding || '',
      started:
        !payload?.endDate &&
        !payload?.endTime &&
        moment().isAfter(moment(payload?.startTime, 'HH:mm')),
      childId: activeChild.id,
      dateOfDream: date.toString(),
    };
    if (payload?.endDate && payload?.endTime) {
      dream.endDate = payload.endDate;
      dream.endTime = payload.endTime;
    }
    // const payloadDream = {
    //   date,
    //   id: (payload && payload.id) || getState().date.id,
    //   started: true,
    //   payload,
    // };
    if (isStartDream) {
      dispatch(startDream(true));
    }
    try {
      if (isSameDay !== null && isSameDay) {
        dispatch(setDreams([...getState().date.dreams, dream]));
      }
      await Fire.setStartTime(date, dream);
      if (isSameDay !== null && isSameDay === false) {
        console.log('setting date');
        dispatch(setDateSuccess(date));
      }
      dispatch(startDream(false));

      // if (endTime) {
      //   dispatch(endDreamTC(date, endTime));
      // }
      // else {
      //   dispatch(setDreams(dreams));
      // }
    } catch (error) {
      console.log(error);
    }
  };

export const endDreamTC =
  (date, payload, isUpdateYday) => async (dispatch, getState) => {
    dispatch(startDream(false));
    try {
      console.log('ENDING ID -> ', payload.id);
      const newDreams = [
        ...getState().date.dreams.filter((dream) => dream.id !== payload.id),
      ];
      // const index = newDreams.findIndex((dream) => dream.id === payload.id);
      // console.log('index', index);
      // console.log(
      //   newDreams.map((dream) => dream.startTime),
      //   'before end'
      // );
      // console.log(newDreams[index], '🍕🍕');
      const newDream = {
        ...payload,
        endTime: moment().format('HH:mm'),
        endDate: moment().toDate().getTime(),
        wakefulness: await _calcWakefulness(
          newDreams,
          (payload && payload.endTime) || moment()
        ),
        started: false,
      };
      // newDreams.splice(index, 1, newDream);
      console.log(
        newDreams.map((dream) => dream.startTime),
        'after splice'
      );

      // else {
      //   newDreams.push({
      //     ...payload,
      //     endTime: (payload && payload.endTime) || moment().format('HH:mm'),
      //     endDate: (payload && payload.endDate) || moment().toDate().getTime(),
      //     wakefulness: await _calcWakefulness(
      //       newDreams,
      //       (payload && payload.endTime) || moment()
      //     ),
      //     started: false,
      //   });
      // }
      dispatch(setDreams([...newDreams, newDream]));
      // console.log(
      //   [...newDreams].map((dream) => dream.startTime),
      //   'after set 🥩'
      // );
      await Fire.setEndTime(
        {
          date,
          id: payload.id || getState().date.id,
          started: false,
        },
        (payload && payload.endTime) || moment(),
        (payload && payload.endDate) || moment().toDate().getTime(),
        null,
        isUpdateYday
      );
      if (isUpdateYday) {
        const { dreams: yesterdayDreams } = await Fire.getOnce(
          moment(payload.startDate)
        );

        dispatch(setYesterdayDreams(yesterdayDreams));
      }

      // if (dreams) {
      //   dispatch(setDreams(dreams));
      //   dispatch(clearId());
      // }
    } catch (error) {
      console.log(error);
    }
  };

export const removeDreamTC = (date, dream) => async (dispatch, getState) => {
  dispatch(startDream(false));
  try {
    //const previousDreams = [...getState().date.dreams]
    const dreams = getState().date.dreams.filter(
      (currDream) => currDream.id !== dream.id
    );
    dispatch(setDreams(dreams));
    await Fire.delete(date, dream);
    const { dreams: yesterdayDreams } = await Fire.getOnce(
      moment(date).subtract(1, 'day')
    );

    dispatch(setYesterdayDreams(yesterdayDreams));
  } catch (error) {
    console.log(error);
  }
};

export const updateDreamTC =
  (date, dream, id, prevDate, isSameDay = null) =>
  async (dispatch, getState) => {
    console.log('update', date, dream, prevDate);

    const currDreams = [...getState().date.dreams];
    const index = currDreams.findIndex((dream) => dream.id === id);
    if (isSameDay !== null && isSameDay) {
      console.log('same date update');
      dispatch(
        setDreams([
          ...currDreams.slice(0, index),
          dream,
          ...currDreams.slice(index + 1),
        ])
      );
    }
    try {
      await Fire.update(date, dream, id, prevDate);
      const { dreams: yesterdayDreams } = await Fire.getOnce(
        moment(date).subtract(1, 'day')
      );

      dispatch(setYesterdayDreams(yesterdayDreams));
      if (isSameDay !== null && isSameDay === false) {
        console.log('diff date update');
        dispatch(setDateSuccess(date));
      }
      // if (
      //   date.format('L') !== moment(prevDate.startDate, 'DD MMM').format('L')
      // ) {
      //   console.log('getting');
      //   dispatch(getDataTC(date));
      // }
    } catch (error) {
      console.log(error);
    }
  };
