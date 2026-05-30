import Fire from '../../firebase';
import { eachDayOfInterval } from 'date-fns';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeChild } from './childReducer';

const SET_DREAMS = 'reservationScreen/SET_DREAMS';
const SET_LOADING = 'reservationScreen/SET_LOADING';

let initialState = {
  dreams: [],
  loading: false,
};

export const backupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DREAMS:
      return {
        ...state,
        dreams: [...state.dreams, action.dreams],
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export const setLoading = (loading) => ({ type: SET_LOADING, loading });
export const setDreams = (dreams) => ({ type: SET_DREAMS, dreams });

export const setDaysTC = (children) => (dispatch) => {
  dispatch(setLoading(true));
  let allDays = eachDayOfInterval({
    start: new Date().setDate(new Date().getDate() - 15),
    end: new Date(),
  });
  return dispatch(setDreamsTC(allDays, children));
};

export const setDreamsTC = (days, children) => async (dispatch, getState) => {
  const dates = days.map((day) => moment(day));
  let dreams = [];
  for (let i = 0; i < children.length; i++) {
    await dispatch(changeChild(children[i]));

    const response = await Promise.all(
      dates.map((date) => {
        return Fire.getOnce(date);
      })
    );
    dreams = dreams.concat(response.map((dream) => ({ dream: dream.dreams })));
  }
  dispatch(setDreams(dreams));
  dispatch(setLoading(false));
  return dreams;
};

export const addInfo = (type, payload) => async (dispatch) => {
  dispatch(setLoading(true));
  const storageInfo = JSON.parse(await AsyncStorage.getItem(`@${type}`));

  if (!storageInfo) {
    await AsyncStorage.setItem(`@${type}`, JSON.stringify(payload));
  } else {
    const filteredInfo = payload.filter(
      (info) =>
        storageInfo.find((storageInfo) => storageInfo.id === info.id) ===
        undefined
    );
    const jsonChildren =
      storageInfo && storageInfo.length && storageInfo.concat(filteredInfo);
    await AsyncStorage.setItem(`@${type}`, JSON.stringify(jsonChildren));
  }
  await AsyncStorage.setItem('@appLaunched_key', 'true');
};

export const addDreams =
  (dreams, backupChildren, storeChildren) => async (dispatch) => {
    const children = backupChildren.concat(storeChildren);
    for (let i = 0; i < children.length; i++) {
      await dispatch(changeChild(children[i]));
      let activeChild = JSON.parse(await AsyncStorage.getItem('@active_child'));
      let childDream = dreams.filter((dream) => {
        return activeChild.id === dream.childId;
      });
      childDream.map(async (dream) => {
        console.log(dream);
        const { dreams } = await Fire.setBackupDream({
          date: moment(dream.startDate),
          id: dream.id,
          dream,
        });
        if (dreams) {
          dispatch(setDreams(dreams));
        }
      });
    }
    dispatch(setLoading(false));
  };
