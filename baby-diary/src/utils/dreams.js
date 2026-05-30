import { areIntervalsOverlapping, isWithinInterval } from 'date-fns';
import { convertDateFromTime } from './convertFromTime';
import Fire from '../firebase/index';

export const checkForOverlap = async (date, updatedDream) => {
  const { dreams } = await Fire.getOnce(date);
  let check = dreams
    .filter((d) => d.id !== updatedDream.id)
    .map((d) => {
      let start = convertDateFromTime(d.startTime);
      let end = convertDateFromTime(d.endTime);
      if (d.startTime > d.endTime) {
        end = end.setDate(end.getDate() + 1);
      }
      return isWithinInterval(convertDateFromTime(updatedDream.startTime), {
        start: start,
        end: end,
      });
    });
  return check.includes(true);
};

export const checkForOverlapFinished = async (date, updatedDream) => {
  const { dreams } = await Fire.getOnce(date);
  let startOfDream = convertDateFromTime(updatedDream.startTime);
  let endOfDream = convertDateFromTime(updatedDream.endTime);
  // console.log('newDreamScreen setData', setDate, 'endofdream',(endOfDream).setDate)
  if (updatedDream.endTime < updatedDream.startTime) {
    endOfDream = endOfDream.setDate(endOfDream.getDate() + 1);
  }
  let check = [];

  check = dreams
    .filter((d) => d.id !== updatedDream.id)
    .map((d) => {
      if (!d.endTime) {
        return false;
      }
      let start = convertDateFromTime(d.startTime);
      let end = convertDateFromTime(d.endTime);
      if (d.startTime > d.endTime) {
        end = end.setDate(end.getDate() + 1);
      }
      return areIntervalsOverlapping(
        { start: startOfDream, end: endOfDream },
        { start: start, end: end }
      );
    });
  //console.log(check, 'check')
  return check.includes(true);
};

export const isInvalidDateInput = () => {
  const [startHours, startMinutes] = updatedDream.startTime.split(':');
  const [endHours, endMinutes] = updatedDream.endTime.split(':');
  console.log(updatedDream);
  const momentStart = moment(updatedDream.startDate, 'DD MMM')
    .set('h', startHours)
    .set('m', startMinutes);
  const momentEnd = moment(updatedDream.endDate, 'DD MMM')
    .set('h', endHours)
    .set('m', endMinutes);
  if (momentStart.toDate() > momentEnd.toDate()) {
    return languages.end_less_beginning_time;
  }
  console.log('start ', momentStart, 'end ', momentEnd);
  if (
    momentStart.date() !== momentEnd.date() &&
    !Number.isNaN(momentEnd.date()) &&
    activeTimeOfDay === 'day'
  ) {
    return languages.it_is_not_possible_to_set_different_dates_for_daytime_sleep;
  }
  return null;
};
