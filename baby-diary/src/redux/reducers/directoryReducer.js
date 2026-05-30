import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { useSelector } from "react-redux";

const SET_PLACES = "directory/SET_PLACES";
const SET_RECOMENDTAION_RESET = "directory/SET_RECOMENDTAION_RESET";
const SET_REMINDERS_RESET = "directory/SET_REMINDERS_RESET";
const SET_EVENTS_STAT = "directory/SET_EVENTS_STAT";
const SET_TAGS = "directory/SET_TAGS";
const SET_LOADING = "directory/SET_LOADING";
const SET_DISABLE_FEEDING = "directory/SET_DISABLE_FEEDING";
const SET_DISABLE_TAGS = "directory/SET_DISABLE_TAGS";
const SET_DISABLE_PLACES = "directory/SET_DISABLE_PLACES";
const SET_DISABLE_EVENTS = "directory/SET_DISABLE_EVENTS";
const SET_DISABLE_TIMELINE_EVENTS = "directory/SET_DISABLE_TIMELINE_EVENTS";
const SET_DISABLE_COUNT_EVENTS = "directory/SET_DISABLE_COUNT_EVENTS";
const SET_DISABLE_COUNT_EVENTS_DAY = "directory/SET_DISABLE_COUNT_EVENTS_DAY";
const SET_DISABLE_COUNT_EVENTS_NIGHT =
  "directory/SET_DISABLE_COUNT_EVENTS_NIGHT";
const SET_REMINDERS = "directory/SET_REMINDERS";

export const initialState = {
  places: [
    {
      id: 0,
      value: "bed",
    },

    {
      id: 1,
      value: "stroller",
    },

    {
      id: 2,
      value: "car",
    },
  ],
  tags: [
    {
      id: 0,
      value: "fast_fall_asleep_tag",
      color: "#468564",
    },

    {
      id: 1,
      value: "crying_tag",
      color: "#BE1111",
    },

    {
      id: 2,
      value: "resisting_tag",
      color: "#CD8211",
    },
  ],
  eventsStatistic: [],
  loading: false,
  disableFeeding: false,
  disableTags: false,
  disablePlaces: false,
  disableEvents: true,
  disableTimeLineEvents: true,
  disableCountEvents: true,
  disableCountEventsDay: true,
  disableCountEventsNight: true,
  recomendtationRest: false,
  reminders: [],
};

export const directoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES: {
      return {
        ...state,
        places: action.places,
      };
    }
    case SET_EVENTS_STAT: {
      return {
        ...state,
        eventsStatistic: action.eventsStatistic,
      };
    }
    case SET_TAGS: {
      return {
        ...state,
        tags: action.tags,
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case SET_DISABLE_FEEDING: {
      return {
        ...state,
        disableFeeding: action.isEnable,
      };
    }
    case SET_RECOMENDTAION_RESET: {
      return {
        ...state,
        recomendtationRest: action.isEnable,
      };
    }
    case SET_DISABLE_TAGS: {
      return {
        ...state,
        disableTags: action.isEnable,
      };
    }
    case SET_DISABLE_PLACES: {
      return {
        ...state,
        disablePlaces: action.isEnable,
      };
    }
    case SET_DISABLE_EVENTS: {
      return {
        ...state,
        disableEvents: action.isEnable,
      };
    }
    case SET_DISABLE_TIMELINE_EVENTS: {
      return {
        ...state,
        disableTimeLineEvents: action.isEnable,
      };
    }
    case SET_DISABLE_COUNT_EVENTS: {
      return {
        ...state,
        disableCountEvents: action.isEnable,
      };
    }
    case SET_DISABLE_COUNT_EVENTS_DAY: {
      return {
        ...state,
        disableCountEventsDay: action.isEnable,
      };
    }
    case SET_DISABLE_COUNT_EVENTS_NIGHT: {
      return {
        ...state,
        disableCountEventsNight: action.isEnable,
      };
    }
    case SET_REMINDERS: {
      return {
        ...state,
        reminders: action.reminders,
      };
    }
    default:
      return state;
  }
};

export const setPlaces = (places) => ({ type: SET_PLACES, places });
export const setEventsStat = (eventsStatistic) => ({
  type: SET_EVENTS_STAT,
  eventsStatistic,
});
export const setTags = (tags) => ({ type: SET_TAGS, tags });
export const setLoading = (loading) => ({ type: SET_LOADING, loading });
export const setDisableFeeding = (isEnable) => ({
  type: SET_DISABLE_FEEDING,
  isEnable,
});
export const setDisableTags = (isEnable) => ({
  type: SET_DISABLE_TAGS,
  isEnable,
});
export const setRecomendtationRest = (isEnable) => ({
  type: SET_RECOMENDTAION_RESET,
  isEnable,
});
export const setDisablePlaces = (isEnable) => ({
  type: SET_DISABLE_PLACES,
  isEnable,
});
export const setDisableEvents = (isEnable) => ({
  type: SET_DISABLE_EVENTS,
  isEnable,
});
export const setDisableTimeLineEvents = (isEnable) => ({
  type: SET_DISABLE_TIMELINE_EVENTS,
  isEnable,
});
export const setDisableCountEvents = (isEnable) => ({
  type: SET_DISABLE_COUNT_EVENTS,
  isEnable,
});
export const setDisableCountEventsDay = (isEnable) => ({
  type: SET_DISABLE_COUNT_EVENTS_DAY,
  isEnable,
});
export const setDisableCountEventsNight = (isEnable) => ({
  type: SET_DISABLE_COUNT_EVENTS_NIGHT,
  isEnable,
});
export const setReminders = (reminders) => ({
  type: SET_REMINDERS,
  reminders,
});
export const addReminder = (reminder) => (dispatch, getState) => {
  dispatch(setReminders([...getState().directory.reminders, reminder]));
};
export const removeReminder = (id) => (dispatch, getState) => {
  const newReminders =
    getState().directory.reminders.filter((reminder) => reminder.id === id) ||
    [];

  dispatch(setReminders(newReminders));
};

export const initReminders = () => async (dispatch) => {
  const notificationKeys = (await AsyncStorage.getAllKeys()).filter((key) =>
    key.includes("_notification")
  );
  const reminders = [];
  for (const notificationKey of notificationKeys) {
    const reminder = JSON.parse(await AsyncStorage.getItem(notificationKey));
    if (moment(reminder.notifTime).diff(moment()) > 0) {
      reminders.push(reminder);
    }
  }

  dispatch(setReminders(reminders));
};

export const getInfo = (type) => async (dispatch) => {
  dispatch(setLoading(true));
  const storageInfo = JSON.parse(await AsyncStorage.getItem(`@${type}`));
  if (storageInfo) {
    switch (type) {
      case "places":
        dispatch(setPlaces(storageInfo));
        break;
      case "tags":
        dispatch(setTags(storageInfo));
        break;
      case "events_statistic":
        dispatch(setEventsStat(storageInfo));
      default:
        break;
    }
  } else {
    dispatch(setPlaces([]));
    dispatch(setTags([]));
    dispatch(setEventsStat([]));
  }

  dispatch(setLoading(false));
};

export const createInfo = (type, value, color, disable) => async (dispatch) => {
  const info = {
    id: +new Date(),
    value,
    color,
    disable,
  };
  // await AsyncStorage.removeItem(`@${type}`)
  const storageInfo = await AsyncStorage.getItem(`@${type}`);
  if (!storageInfo) {
    await AsyncStorage.setItem(`@${type}`, JSON.stringify([info]));
  } else {
    const jsonChildren =
      storageInfo && storageInfo.length && JSON.parse(storageInfo).concat(info);
    await AsyncStorage.setItem(`@${type}`, JSON.stringify(jsonChildren));
  }
  dispatch(getInfo(type));
};

export const createDefaultInfo = (type, languages) => async () => {
  const storageInfo = await AsyncStorage.getItem(`@${type}`);
  if (!storageInfo) {
    await AsyncStorage.setItem(
      `@${type}`,
      JSON.stringify(
        initialState[type].map((initInfo) => ({
          ...initInfo,
          value: languages[initInfo.value],
        }))
      )
    );
  }
};

export const editInfo =
  (type, value, id, color, disable) => async (dispatch) => {
    // await AsyncStorage.removeItem(`@${type}`)
    const storageInfo = JSON.parse(await AsyncStorage.getItem(`@${type}`));
    console.log("-------edit_info-------");
    console.log("storage INFO", storageInfo);
    const updatedStorage = storageInfo.map((info) => {
      if (info.id === id) {
        info.value = value;
        info.color = color;
        info.disable = disable;
      }
      return info;
    });
    await AsyncStorage.setItem(`@${type}`, JSON.stringify(updatedStorage));
    dispatch(getInfo(type));
  };

export const deleteInfo = (type, value) => async (dispatch) => {
  const storageInfo = JSON.parse(await AsyncStorage.getItem(`@${type}`));
  const updatedInfo = storageInfo.filter(
    (p) => p.value.toString() !== value.toString()
  );

  await AsyncStorage.setItem(`@${type}`, JSON.stringify(updatedInfo));

  if (type === "places") {
    dispatch(setPlaces(updatedInfo));
  } else {
    dispatch(setTags(updatedInfo));
  }
};

export const deletePlace = (id) => async (dispatch) => {
  const storagePlaces = JSON.parse(await AsyncStorage.getItem(`@places`));
  const updatedPlaces = storagePlaces.filter((place) => place.id !== id);
  await AsyncStorage.setItem(`@places`, JSON.stringify(updatedPlaces));
  dispatch(setPlaces(updatedPlaces));
};

export const editPlace = (type, text, id) => async (dispatch) => {
  const storageInfo = JSON.parse(await AsyncStorage.getItem(`@${type}`));
  const updatedStorage = storageInfo.map((info) => {
    if (info.id === id) {
      info.value = text;
    }
    return info;
  });
  await AsyncStorage.setItem(`@${type}`, JSON.stringify(updatedStorage));

  dispatch(getInfo(type));
};
export const updatedInfo = (type, value) => async (dispatch) => {
  await AsyncStorage.removeItem(`@${type}`);

  await AsyncStorage.setItem(`@${type}`, JSON.stringify(value));

  dispatch(getInfo(type));
};

export const editEventsStat =
  (eventsStatistic, id, _disable) => async (dispatch) => {
    console.log(eventsStatistic, "s");
    try {
      dispatch(
        setEventsStat(
          eventsStatistic.map((setting) =>
            setting.id === id ? { ...setting, disable: true } : setting
          )
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
export const resetEventsStat = (eventsStatistic) => async (dispatch) => {
  console.log(eventsStatistic, "s");
  try {
    eventsStatistic.map((setting) =>
      setting.disable === true
        ? dispatch(setEventsStat({ ...setting, disable: false }))
        : dispatch(setEventsStat(setting))
    );
  } catch (error) {
    console.log(error);
  }
};
export const enableAdds = (value) => async (dispatch, getState) => {
  if (value === "feeding") {
    dispatch(setDisableFeeding(!getState().directory.disableFeeding));
  } else {
    dispatch(setDisableTags(!getState().directory.disableTags));
  }
};
