import { timeWithWords } from "./minutesWithWords";
import React from "react";

export const renderTime = (
  time,
  languages,
  br = " ",
  isStatisticsScreen = false,
  theme
) => {
  let { minutes, hours } = time;

  if (minutes === 60) {
    minutes = 0;
    hours = hours + 1;
  }
  if (isStatisticsScreen) {
    if (hours > 0 || minutes > 0) {
      return (
        <>
          {timeWithWords(languages, hours, "hours", "\n", theme)}
          {timeWithWords(languages, minutes, "minutes", "\n", theme)}
        </>
      );
      // hours > 0 ? "\n" : ""
    } else return "";
  }

  let timeHour = "00";
  let timeMinutes = "00";

  if (hours || minutes) {
    timeHour = hours >= 10 ? `${hours}` : `0${hours}`;
    timeMinutes = minutes >= 10 ? `${minutes}` : `0${minutes}`;
  }
  return `${timeHour ? timeHour : ""}:${timeMinutes ? timeMinutes : ""}`;
};
