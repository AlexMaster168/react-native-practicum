import {DateTime} from "luxon";

const SET_START_TIME = 'time/SET_START_TIME';
const SET_END_TIME = 'time/SET_END_TIME';
const SET_TIME = 'time/SET_TIME';
const SET_START_DATE = 'time/SET_START_DATE';
const SET_END_DATE = 'time/SET_END_DATE';

let initialState = {
    startTime: '',
    endTime: '',
    startDate: DateTime.local(),
    endDate: DateTime.local(),
    ArrOfStartTime: [],
    ArrOfEndTime: [],
    curTime: DateTime.local()
};

export const NewDreamScreenReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_START_TIME:
            return {
                ...state,
                startTime: action.time
            };
        case SET_END_TIME:
            return {
                ...state,
                endTime: action.time
            };
        case SET_TIME:
            return {
                ...state,
                curTime: DateTime.local()
            };
        case SET_START_DATE:
            console.log('reducer', action.date)
            return {
                ...state,
                startDate: action.date
            };
        case SET_END_DATE:
            return {
                ...state,
                endDate: action.date
            };
        default:
            return state
    }
}

export const setTimeSuccess = () => ({type: SET_TIME});

export const setStartTime = (time) => ({
    type: SET_START_TIME,
    time
});

export const setEndTime = (time) => ({
    type: SET_END_TIME,
    time
});

export const setStartDate = (date) => ({
    type: SET_START_DATE,
    date
});

export const setEndDate = (date) => ({
    type: SET_END_DATE,
    date
});