export const renderTotalSleepColor = (tag, amountOfDays, totalSleep, theme) => {
  const { hours, minutes } = totalSleep;
  const sleepTime = +hours + +minutes / 60;
  if (amountOfDays <= 90) {
    // от 0 до 3x месяцев
    if (tag === "total_sleep") {
      if (sleepTime >= 15 && sleepTime <= 18) {
        return "#11bf14";
      } else if (
        (sleepTime < 15 && sleepTime >= 13) ||
        (sleepTime > 18 && sleepTime <= 20)
      ) {
        return "#ffbc00";
      }
    } else if (tag === "total_day_sleep") {
      if (sleepTime >= 7 && sleepTime <= 9) {
        return "#11bf14";
      } else if (
        (sleepTime < 7 && sleepTime >= 5) ||
        (sleepTime > 9 && sleepTime <= 11)
      ) {
        return "#ffbc00";
      }
    } else if (tag === "total_night_sleep") {
      if (sleepTime >= 8 && sleepTime <= 9) {
        return "#11bf14";
      } else if (
        (sleepTime < 8 && sleepTime >= 6) ||
        (sleepTime > 9 && sleepTime <= 11)
      ) {
        return "#ffbc00";
      }
    } else if (
      tag === "average_night_sleep" ||
      tag === "average_day_sleep" ||
      tag === "average_sleep" ||
      "day_sleep_count"
    ) {
      return theme.background;
    }
  } else if (amountOfDays <= 120) {
    /// до 4-х месяцев
    if (tag === "total_sleep") {
      if (sleepTime >= 13 && sleepTime <= 15) {
        return "#11bf14";
      } else if (
        (sleepTime < 13 && sleepTime >= 11) ||
        (sleepTime > 15 && sleepTime <= 17)
      ) {
        return "#ffbc00";
      }
    } else if (tag === "total_day_sleep") {
      if (sleepTime >= 4 && sleepTime <= 5) {
        return "#11bf14";
      } else if (
        (sleepTime < 4 && sleepTime >= 2) ||
        (sleepTime > 5 && sleepTime <= 7)
      ) {
        return "#ffbc00";
      }
    } else if (tag === "total_night_sleep") {
      if (sleepTime >= 9 && sleepTime <= 10) {
        return "#11bf14";
      } else if (
        (sleepTime < 9 && sleepTime >= 7) ||
        (sleepTime > 10 && sleepTime <= 12)
      ) {
        return "#ffbc00";
      }
    } else if (
      tag === "average_night_sleep" ||
      tag === "average_day_sleep" ||
      tag === "average_sleep" ||
      "day_sleep_count"
    ) {
      return "#fff";
    }
  } else if (amountOfDays <= 150) {
    //до 5-ти месяцев
    if (tag === "total_sleep") {
      if (sleepTime >= 14 && sleepTime <= 16) {
        return "#11bf14";
      } else if (
        (sleepTime < 14 && sleepTime >= 12) ||
        (sleepTime > 16 && sleepTime <= 18)
      ) {
        return "#ffbc00";
      }
    } else if (tag === "total_day_sleep") {
      if (sleepTime >= 4 && sleepTime <= 5) {
        return "#11bf14";
      } else if (
        (sleepTime < 4 && sleepTime >= 2) ||
        (sleepTime > 5 && sleepTime <= 7)
      ) {
        return "#ffbc00";
      }
    } else if (tag === "total_night_sleep") {
      if (sleepTime >= 10 && sleepTime <= 11) {
        return "#11bf14";
      } else if (
        (sleepTime < 10 && sleepTime >= 8) ||
        (sleepTime > 11 && sleepTime <= 13)
      ) {
        return "#ffbc00";
      }
    } else if (
      tag === "average_night_sleep" ||
      tag === "average_day_sleep" ||
      tag === "average_sleep" ||
      "day_sleep_count"
    ) {
      return "#fff";
    }
  } else if (amountOfDays <= 210) {
    //до 7-ми месяцев
    if (tag === "total_sleep") {
      if (sleepTime >= 13 && sleepTime <= 16) {
        return "#11bf14";
      } else if (
        (sleepTime < 13 && sleepTime >= 11) ||
        (sleepTime > 16 && sleepTime <= 18)
      ) {
        return "#ffbc00";
      }
    } else if (tag === "total_day_sleep") {
      if (sleepTime >= 3 && sleepTime <= 4) {
        return "#11bf14";
      } else if (
        (sleepTime < 3 && sleepTime >= 1) ||
        (sleepTime > 4 && sleepTime <= 6)
      ) {
        return "#ffbc00";
      }
    } else if (tag === "total_night_sleep") {
      if (sleepTime >= 10 && sleepTime <= 12) {
        return "#11bf14";
      } else if (
        (sleepTime < 10 && sleepTime >= 8) ||
        (sleepTime > 12 && sleepTime <= 14)
      ) {
        return "#ffbc00";
      }
    } else if (
      tag === "average_night_sleep" ||
      tag === "average_day_sleep" ||
      tag === "average_sleep" ||
      "day_sleep_count"
    ) {
      return "#fff";
    }
  } else if (amountOfDays <= 270) {
    //до 9-ти месяцев
    if (tag === "total_sleep") {
      if (sleepTime >= 13 && sleepTime <= 15.5) {
        return "#11bf14";
      } else if (
        (sleepTime < 13 && sleepTime >= 11) ||
        (sleepTime > 15.5 && sleepTime <= 17.5)
      ) {
        return "#ffbc00";
      }
    } else if (tag === "total_day_sleep") {
      if (sleepTime >= 3 && sleepTime <= 3.5) {
        return "#11bf14";
      } else if (
        (sleepTime < 3 && sleepTime >= 1) ||
        (sleepTime > 3.5 && sleepTime <= 5.5)
      ) {
        return "#ffbc00";
      }
    } else if (tag === "total_night_sleep") {
      if (sleepTime >= 10 && sleepTime <= 12) {
        return "#11bf14";
      } else if (
        (sleepTime < 10 && sleepTime >= 8) ||
        (sleepTime > 12 && sleepTime <= 14)
      ) {
        return "#ffbc00";
      }
    } else if (
      tag === "average_night_sleep" ||
      tag === "average_day_sleep" ||
      tag === "average_sleep" ||
      "day_sleep_count"
    ) {
      return "#fff";
    }
  } else if (amountOfDays <= 360) {
    //до года
    if (tag === "total_sleep") {
      if (sleepTime >= 12 && sleepTime <= 15) {
        return "#11bf14";
      } else if (
        (sleepTime < 12 && sleepTime >= 10) ||
        (sleepTime > 15 && sleepTime <= 17)
      ) {
        return "#ffbc00";
      }
    } else if (tag === "total_day_sleep") {
      if (sleepTime >= 2 && sleepTime <= 3) {
        return "#11bf14";
      } else if (
        (sleepTime < 2 && sleepTime >= 1) ||
        (sleepTime > 3 && sleepTime <= 5)
      ) {
        return "#ffbc00";
      }
    } else if (tag === "total_night_sleep") {
      if (sleepTime >= 10 && sleepTime <= 12) {
        return "#11bf14";
      } else if (
        (sleepTime < 10 && sleepTime >= 8) ||
        (sleepTime > 12 && sleepTime <= 14)
      ) {
        return "#ffbc00";
      }
    } else if (
      tag === "average_night_sleep" ||
      tag === "average_day_sleep" ||
      tag === "average_sleep" ||
      "day_sleep_count"
    ) {
      return "#fff";
    }
  } else if (amountOfDays <= 540) {
    // от года до 1.5 года
    if (tag === "total_sleep") {
      if (sleepTime >= 11.5 && sleepTime <= 15) {
        return "#11bf14";
      } else if (
        (sleepTime < 11.5 && sleepTime >= 10) ||
        (sleepTime > 15 && sleepTime <= 17)
      ) {
        return "#ffbc00";
      }
    } else if (tag === "total_day_sleep") {
      if (sleepTime >= 1.5 && sleepTime <= 3) {
        return "#11bf14";
      } else if (
        (sleepTime < 1.5 && sleepTime >= 1) ||
        (sleepTime > 3 && sleepTime <= 4)
      ) {
        return "#ffbc00";
      }
    } else if (tag === "total_night_sleep") {
      if (sleepTime >= 10 && sleepTime <= 12) {
        return "#11bf14";
      } else if (
        (sleepTime < 10 && sleepTime >= 8) ||
        (sleepTime > 12 && sleepTime <= 14)
      ) {
        return "#ffbc00";
      }
    } else if (
      tag === "average_night_sleep" ||
      tag === "average_day_sleep" ||
      tag === "average_sleep" ||
      "day_sleep_count"
    ) {
      return "#fff";
    }
  } else {
    if (tag === "total_sleep") {
      if (sleepTime >= 11.5 && sleepTime <= 13) {
        return "#11bf14";
      } else if (
        (sleepTime < 11.5 && sleepTime >= 10) ||
        (sleepTime > 13 && sleepTime <= 15)
      ) {
        return "#ffbc00";
      }
    } else if (tag === "total_day_sleep") {
      if (sleepTime >= 1.5 && sleepTime <= 2) {
        return "#11bf14";
      } else if (
        (sleepTime < 1.5 && sleepTime >= 1) ||
        (sleepTime > 2 && sleepTime <= 3)
      ) {
        return "#ffbc00";
      }
    } else if (tag === "total_night_sleep") {
      if (sleepTime >= 10 && sleepTime <= 11) {
        return "#11bf14";
      } else if (
        (sleepTime < 10 && sleepTime >= 8) ||
        (sleepTime > 11 && sleepTime <= 13)
      ) {
        return "#ffbc00";
      }
    } else if (
      tag === "average_night_sleep" ||
      tag === "average_day_sleep" ||
      tag === "average_sleep" ||
      "day_sleep_count"
    ) {
      return "#fff";
    }
  }
  return "#F43F34";
};
