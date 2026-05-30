import moment from 'moment';

export const setTwoWeeksMinLimitDate = (_, dateEnd, isGetMinDate = true) => {
  if (isGetMinDate) {
    const minDate = moment(dateEnd).local().subtract(13, 'day');
    return minDate.toDate();
  }
  return moment(dateEnd).subtract(1, 'day').toDate();
};
export const setTwoWeeksMaxLimitDate = (dateStart, _, isGetMinDate = true) => {
  if (isGetMinDate) {
    return moment(dateStart).add(1, 'day').toDate();
  }
  const maxDate = moment(dateStart).local().add(13, 'day').toDate();
  return maxDate < new Date() ? maxDate : new Date();
};

export const setOneWeeksMinLimitDate = (_, dateEnd, isGetMinDate = true) => {
  if (isGetMinDate) {
    const minDate = moment(dateEnd).local().subtract(6, 'day');
    return minDate.toDate();
  }
  return moment(dateEnd).subtract(1, 'day').toDate();
};
export const setOneWeeksMaxLimitDate = (dateStart, _, isGetMinDate = true) => {
  if (isGetMinDate) {
    return moment(dateStart).add(1, 'day').toDate();
  }
  const maxDate = moment(dateStart).local().add(7, 'day').toDate();
  return maxDate < new Date() ? maxDate : new Date();
};

export const setNinetyMinLimitDate = (_, dateEnd, isGetMinDate = true) => {
  if (isGetMinDate) {
    const minDate = moment(dateEnd).local().subtract(89, 'day');
    return minDate.toDate();
  }
  return moment(dateEnd).subtract(1, 'day').toDate();
};
export const setNinetyMaxLimitDate = (dateStart, _, isGetMinDate = true) => {
  if (isGetMinDate) {
    return moment(dateStart).add(1, 'day').toDate();
  }
  const maxDate = moment(dateStart).local().add(89, 'day').toDate();
  return maxDate < new Date() ? maxDate : new Date();
};

export const setMonthMinLimitDate = (_, dateEnd, isGetMinDate = true) => {
  if (isGetMinDate) {
    const minDate = moment(dateEnd).local().subtract(29, 'day');
    return minDate.toDate();
  }
  return moment(dateEnd).subtract(1, 'day').toDate();
};
export const setMonthMaxLimitDate = (dateStart, _, isGetMinDate = true) => {
  if (isGetMinDate) {
    return moment(dateStart).add(1, 'day').toDate();
  }
  const maxDate = moment(dateStart).local().add(29, 'day').toDate();
  return maxDate < new Date() ? maxDate : new Date();
};
// todo: move to 1 method
