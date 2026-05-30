import { eachDayOfInterval } from 'date-fns';
import moment from 'moment';
import Fire from '../firebase/index';

export const getDreamsForInterval = async (startDate, endDate) => {
  const dates = eachDayOfInterval({ start: startDate, end: endDate });
  const dreamsByDate = [];
  for (const date of dates) {
    const { dreams } = await Fire.getOnce(moment(date));
    dreamsByDate.push({ date, dreams });
  }
  return dreamsByDate;
};
