import { convertDateFromTime } from './convertFromTime';
import { differenceInMinutes } from 'date-fns';
import { sortBy } from 'lodash';
import moment from 'moment';
import { el } from 'date-fns/locale';
const _toPositive = (number) =>
  Math.sign(number) === -1 ? number * -1 : number;

const _separateMinutes = (diffMinute, diffHour) => {
  if (diffMinute < 0) {
    diffMinute = diffMinute * -1;
  }
  let tempHour = Math.floor(diffMinute / 60);
  let diffMinutes = diffMinute - tempHour * 60;
  let diffHours = diffHour + tempHour;

  return {
    hours: diffHours,
    minutes: diffMinutes,
  };
};

export const getDreamByType = (type, dreams) => {
  return dreams?.filter((dream) => dream.timeOfDay === type) || [];
};

export const calcAverage = ({ totalMinutes }, dreamCount) => {
  let avg = 0;
  if (totalMinutes) avg = Math.floor(totalMinutes / dreamCount);
  let avgHour = _separateMinutes(avg, 0).hours;
  let avgMinutes = _separateMinutes(avg, 0).minutes;

  return {
    minutes: avgMinutes,
    hours: avgHour,
  };
};

export const calcWakefulness = (dreams) => {
  let totalWakefulness = 0;

  if (dreams && dreams.length) {
    dreams.forEach((dream) => {
      const wakefulness = dream.wakefulness && dream.wakefulness.inMinutes;
      totalWakefulness += parseInt(wakefulness);
    });
  }
  return _separateMinutes(totalWakefulness, 0);
};

export const timeDifference = (startTime, endTime) => {
  const startDate = convertDateFromTime(startTime);
  const endDate = convertDateFromTime(endTime);
  return differenceInMinutes(endDate, startDate);
};

export const calcTotalSleep = (dream) => {
  let diffMinute = 0;
  let diffHours = 0;
  let totalMinutes = 0;
  let newStartTime = '';
  let newEndTime = '';

  dream?.length &&
    dream.forEach((item) => {
      if (item.startTime && item.endTime) {
        newStartTime = item.startTime;
        newEndTime = item.endTime;

        if (item.startTime > item.endTime) {
          const start = item.startTime.split(':');
          const startHours = +start[0] - 12;
          newStartTime = startHours + ':' + start[1];
          const end = item.endTime.split(':');
          const endHours = +end[0] + 12;
          newEndTime = endHours + ':' + end[1];
        }
        diffMinute += _toPositive(timeDifference(newStartTime, newEndTime));
        totalMinutes += _toPositive(timeDifference(newStartTime, newEndTime));

        if (diffMinute > 60) {
          diffHours = _separateMinutes(diffMinute, diffHours).hours;
          diffMinute = _separateMinutes(diffMinute, diffHours).minutes;
        }
      }
    });

  return {
    minutes: diffMinute,
    hours: diffHours,
    totalMinutes,
  };
};

export const calcMedianaTotalSleep = (dreams) => {
  let arr = sortBy(
    dreams.map((dream, index) => {
      return calcTotalSleep(dream.dream).totalMinutes;
    })
  ).filter((i) => i !== 0);
  return avg(arr);
};
export const calcMedianaWakefulness = (dreams) => {
  let arr = sortBy(
    dreams
      .map((dream, index) => {
        return calcWakefulness(dream.dream);
      })
      .map((obj) => {
        return obj.hours * 60 + obj.minutes;
      })
      .filter((i) => i !== 0)
      .filter((i) => isNaN(i) !== true)
  );
  return avg(arr);
};
export const calcMedianaTotalSleepNight = (dreams) => {
  let arr = dreams
    .map((dream, index) => {
      return dream.dream.filter((dream) => dream.timeOfDay === 'night');
    })
    .map((arr, index) => {
      if (arr.length > 0) return arr;
    })
    .filter((arr) => arr !== undefined)
    .map((dream) => {
      return calcTotalSleep(dream).totalMinutes;
    });
  return avg(arr);
};
export const calcMedianaTotalSleepDay = (dreams) => {
  let arr = dreams
    .map((dream, index) => {
      return dream.dream.filter((dream) => dream.timeOfDay === 'day');
    })
    .map((arr, index) => {
      if (arr.length > 0) return arr;
    })
    .filter((arr) => arr !== undefined)
    .map((dream) => {
      return calcTotalSleep(dream).totalMinutes;
    });
  return avg(arr);
};
export const calcMedianaAvarageSleepDay = (dreams) => {
  let arr = dreams
    .map((dream, index) => {
      return dream.dream.filter((dream) => dream.timeOfDay === 'day');
    })
    .map((arr, index) => {
      if (arr.length > 0) return arr;
    })
    .filter((arr) => arr !== undefined)
    .map((dream) => {
      return calcAverage(calcTotalSleep(dream), dream.length);
    })
    .map((obj) => {
      return obj.hours * 60 + obj.minutes;
    });
  return avg(arr);
};
export const calcMedianaAvarageSleepNight = (dreams) => {
  let arr = dreams
    .map((dream, index) => {
      return dream.dream.filter((dream) => dream.timeOfDay === 'night');
    })
    .map((arr, index) => {
      if (arr.length > 0) return arr;
    })
    .filter((arr) => arr !== undefined)
    .map((dream) => {
      return calcAverage(calcTotalSleep(dream), dream.length);
    })
    .map((obj) => {
      return obj.hours * 60 + obj.minutes;
    });
  return avg(arr);
};

export const calcMedianaAverageSleep = (dreams) => {
  let arr = sortBy(
    dreams
      .map((dream, index) => {
        return dream.dream;
      })
      .map((dream) => {
        return calcAverage(calcTotalSleep(dream), dream.length);
      })
      .map((obj) => {
        return obj.hours * 60 + obj.minutes;
      })
  ).filter((i) => i !== 0);
  return avg(arr);
};
const avg = (arr) => {
  let minutes = 0;
  for (var i = 0; i < arr.length; i++) {
    minutes += arr[i];
  }

  minutes /= arr.length;

  minutes = Math.floor(minutes);
  if (!isNaN(minutes)) {
    return `${
      Math.floor(minutes / 60) < 9
        ? '0' + Math.floor(minutes / 60)
        : Math.floor(minutes / 60)
    }:${
      Math.floor(minutes % 60) < 9
        ? '0' + Math.floor(minutes % 60)
        : Math.floor(minutes % 60)
    }`;
  }
  return '00:00';
};
export default {
  calcTotalSleep,
  calcWakefulness,
  getDreamByType,
  calcMedianaTotalSleep,
  calcMedianaTotalSleepDay,
  calcMedianaTotalSleepNight,
  calcMedianaAverageSleep,
  calcMedianaAvarageSleepDay,
  calcMedianaAvarageSleepNight,
  calcMedianaWakefulness,
};
