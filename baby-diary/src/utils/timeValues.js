import moment from "moment";

export const getValueIfNotZero = (value, str, addSeperators = false) =>
  value ? `${value} ${str}${addSeperators ? ", " : ""}` : "";

export const getDateFromTimeAndDate = (time, date) => {
  // returns date object from separate time and date
  const momentTime = moment(time);
  const momentDate = moment(date);

  const h = momentTime.hour();
  const m = momentTime.minute();

  const dd = momentDate.date();
  const mm = momentDate.month();
  const yy = momentDate.year();

  const timezone = new Date().getTimezoneOffset() / 60;

  return new Date(yy, mm, dd, h - timezone, m, 0);
};

// compare or date are equal
export const compareDate = (first, second) => {
  const day = moment(first).format("D") === moment(second).format("D");
  const month = moment(first).format("M") === moment(second).format("M");
  const year = moment(first).format("YYYY") === moment(second).format("YYYY");

  return day && month && year;
};

export const getMillisecondsByDateAndTime = (time, date) => {
  // returns ms by date and time for this year
  if (!time || !date) {
    return 0;
  }
  const [hour, minute] = time.split(":");
  const [day] = date.split(" ");

  const result = new Date(
    `${moment().year()}/${moment().month()}/${day} ${hour}:${minute}`
  );

  return +result;
};
// connect time and time
export const connectTimeAndDate = (time, date) => {
  if (!time && !date) {
    return null;
  }
  const momentTime = moment(time).format("HH:mm");
  const momentDate = moment(date).format("YYYY MM DD");
  return moment(`${momentDate} ${momentTime}`, "YYYY MM DD HH:mm").format();
};
