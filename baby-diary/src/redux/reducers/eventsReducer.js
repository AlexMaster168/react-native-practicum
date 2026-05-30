import moment from "moment";
import { compareDate, getDate } from "../../utils/timeValues";
import Fire from "../../firebase";

const SET_EVENTS = "events/SET_EVENTS";
const SET_DATE = "events/SET_DATE";

const initialState = {
  events: [],
  date: new Date(),
};

export const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS:
      return {
        ...state,
        events: action.events,
      };
    case SET_DATE:
      return {
        ...state,
        date: action.date,
      };
    default:
      return state;
  }
};

export const setEvents = (events) => ({ type: SET_EVENTS, events });
export const setDate = (date) => ({ type: SET_DATE, date });

export const deleteEvent = (childId, payload) => async (dispatch, getState) => {
  try {
    await Fire.deleteEvent(childId, payload);
    dispatch(
      setEvents(
        getState().events.events.filter((event) => event.id !== payload.id)
      )
    );
  } catch (error) {
    console.error(error);
  }
};
export const updateEvent =
  (childId, previousDate, payload) => async (dispatch, getState) => {
    try {
      const previousDatePathMoment = moment(previousDate)
        .locale("en")
        .format("L");
      const inputDatePathMoment = moment(payload.startTime)
        .locale("en")
        .format("L");
      await Fire.updateEvent(childId, previousDatePathMoment, payload);
      if (previousDatePathMoment === inputDatePathMoment) {
        const index = getState().events.events.findIndex(
          (el) => el.id === payload.id
        );
        const newEvents = [...getState().events.events];
        newEvents[index] = payload;
        dispatch(setEvents(newEvents));
      } else {
        dispatch(setDate(moment(payload.startTime).toDate()));
      }
    } catch (error) {
      console.error(error);
    }
  };
export const createEvent = (childId, payload) => async (dispatch, getState) => {
  try {
    await Fire.createEvent(childId, payload);
    const currentDate = getState().events.date;
    if (compareDate(payload.startTime, currentDate)) {
      dispatch(setEvents([...getState().events.events, payload]));
    } else {
      dispatch(setDate(payload.startTime.toDate()));
    }
  } catch (error) {
    console.error(error);
  }
};
export const getEventsByDate = (childId, date) => async (dispatch) => {
  try {
    const data = await Fire.getEventsByDate(childId, date);
    dispatch(setEvents(data));
  } catch (error) {
    console.log(error);
  }
};
