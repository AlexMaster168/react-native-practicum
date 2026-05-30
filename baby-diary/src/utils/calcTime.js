import moment from "moment";
import { Platform } from "react-native";
import { getValueIfNotZero } from "./timeValues";

export const calcTimePeriod = (languages, dateStart, dateEnd) => {
  // calculating time period from start date to end date
  if (dateStart < dateEnd) {
    // date in milliseconds
    const newDateStart = new Date(dateStart).getTime();
    const newDateEnd = new Date(dateEnd).getTime();
    // calculating time period from start date to end date in milliseconds
    const time = newDateEnd - newDateStart;
    const fullDays = Math.floor(time / 1000 / 60 / 60 / 24);
    const fullHour = Math.floor(time / 1000 / 60 / 60);
    const fullMinutes = Math.floor(time / 1000 / 60);

    const dd = fullDays;
    const hh = fullHour - fullDays * 24;
    const mm = fullMinutes - fullHour * 60;
    return {
      dd,
      hh,
      mm,
    };
  }
  return languages.input_time_less;
};

export const periodToString = ({ dd, hh, mm }, languages) => {
  return `${getValueIfNotZero(dd, languages.days)} ${
    hh > 0 ? getValueIfNotZero(hh, languages.hours[1]) : ""
  } ${getValueIfNotZero(mm, languages.minutes[1])}`;
};

export const calcTimeAndDateFromPeriod = (date, [hh, mm]) => {
  // calculating date and time based on period
  const resultDate = moment
    .utc(date)
    .add(+hh, "hour")
    .add(+mm, "minute")
    .format("DD MMM, HH:mm");
  return resultDate;
};

export const calcSumTime = (dates) => {
  // calculating sum/subtraction of dates
  if (dates.length) {
    const first = moment(dates[0].value).local();
    const [hh, mm] = dates.reduce(
      (acc, currDate, index, arr) => {
        const nextElValue = arr[index + 1]?.value;
        if (index === arr.length - 1 || !nextElValue) {
          return acc;
        }
        const momentDate = moment(nextElValue).local();
        const hh = momentDate.hour();
        const mm = momentDate.minute();

        if (currDate.operation === "+") {
          if (acc[1] + mm > 59) {
            // minutes
            acc[0]++; // hours
            acc[1] = mm - 60; // minutes
          } else {
            acc[1] += mm; // minutes
          }
          acc[0] += hh; // hours
          return acc;
        }
        // 20 - 30 = 50
        // 15 - 30 = 45
        // 04 - 52 = 12
        if (acc[1] - mm < 0) {
          acc[0]--; // hours
          acc[1] = 60 - mm + acc[1]; // minutes
        } else {
          acc[1] -= mm; // minutes
        }
        acc[0] -= hh;
        return acc;
      },
      [first.hour(), first.minute()]
    );
    if (mm < 0 || hh < 0) {
      return "Less than 0";
    }
    return `${hh} hour ${mm} minutes`;
  }
  return "No items";
};

export const calcDreamTime = (languages, time, date) => {
  if (
    moment(date)
      .set("hour", +time.slice(0, 2))
      .set("minute", +time.slice(3, 5))
      .add(8.64e7, "millisecond")
      .toDate() < moment().toDate()
  ) {
    return "";
  }
  const [hh, mm] = `${moment
    .utc(
      moment().diff(
        moment(date)
          .set("hour", +time.slice(0, 2))
          .set("minute", +time.slice(3, 5))
      )
    )
    .format(`HH mm`)}`.split(" ");

  return `${hh !== "00" ? hh + " " + languages.hours[1] + " " : ""}${
    mm !== "00" ? mm + " " + languages.minutes[1] : ""
  }${hh || mm ? " " + languages.ago : ""}`;
};

export const calcTimeEvents = (languages, dateStart, dateEnd, type) => {
  let hh, mm;

  hh = dateEnd.slice(0, 2) - dateStart?.slice(0, 2);
  mm = dateEnd.slice(3, 5) - dateStart?.slice(3, 5);
  if (languages !== null) {
    if (hh >= 0) {
      if (hh < 0 && hh > -24)
        if (dd !== 0) {
          hh += 24;
          dd--;
        } else {
          hh += 24;
          dd--;
        }
      if (mm < 0 && mm > -60)
        if (hh !== 0) {
          mm += 60;
          hh--;
        } else {
          mm += 60;
          hh--;
        }
      return type !== "numb"
        ? ` ${hh ? hh + " " + languages.hours[1] : " "} ${
            +" " + mm ? mm + " " + languages.minutes[2] : ""
          } `
        : `${hh < 10 ? "0" + hh : hh}:${mm < 10 ? "0" + mm : mm}`;
    }
    return languages.less_minute;
  } else {
    if (hh >= 0) {
      if (hh < 0 && hh > -24)
        if (dd !== 0) {
          hh += 24;
          dd--;
        } else {
          hh += 24;
          dd--;
        }
      if (mm < 0 && mm > -60)
        if (hh !== 0) {
          mm += 60;
          hh--;
        } else {
          mm += 60;
          hh--;
        }

      return { hours: hh, minutes: mm };
    }
    return 0;
  }
};

export default {
  calcTimePeriod,
  calcTimeAndDateFromPeriod,
  calcSumTime,
  calcTimeEvents,
};
