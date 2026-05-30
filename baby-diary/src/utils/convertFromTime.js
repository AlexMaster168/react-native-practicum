export const convertDateFromTime = (time) => {
  let date = new Date();

  const [hours, minutes] = time.split(':');
  date.setHours(+hours);
  date.setMinutes(minutes);

  return date;
};
