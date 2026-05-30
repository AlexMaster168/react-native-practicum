import moment from 'moment';

export const toDbPathMoment = (startEventDate) =>
  moment(`${startEventDate} ${moment().year()}`, 'DD MMMM YYYY').locale('en');
