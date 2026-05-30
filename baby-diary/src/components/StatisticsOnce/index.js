import React, { useRef } from "react";
import {
  Text,
  View,
  TouchableNativeFeedback,
  Dimensions,
  Platform,
} from "react-native";
import {
  calcTotalSleep,
  calcAverage,
  getDreamByType,
  calcWakefulness,
} from "../../utils/calcStatistics";
import { renderTime } from "../../utils/renderTime";
import { renderTotalSleepColor } from "../../utils/renderDreamColor";
import RBSheet from "react-native-raw-bottom-sheet";
import moment from "moment";
import "moment/locale/ru";
import { differenceInDays } from "date-fns";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import useDeviceWidth from "../../hooks/useDeviceWidth";
const deviceWidth = Dimensions.get("window").width;

const _renderStatistics = (
  field,
  index,
  statisticSection,
  theme,
  amountOfDays,
  indicator,
  yesterdayDreams,
  tomorrowDreams,
  languages,
  date,
  curTime,
  currentRecommendation,
  listStyle
) => {
  const isDisable =
    statisticSection.length > 0
      ? !statisticSection.find((setting) => setting.id === field.id)
      : false;
  let todayDay = date.diff(curTime, "day") === 0;
  const myRef = useRef([]);

  const time = typeof field.value === "string" ? field.value.split(":") : null;
  const totalSleep = {
    hours: time && time[0],
    minutes: time && time[1],
  };

  const { blockWidth } = useDeviceWidth();

  if (field.value === "00:00" || field.value === 0) return null;
  return (
    !isDisable && (
      <TouchableNativeFeedback
        key={index}
        background={
          Platform.OS === "android"
            ? TouchableNativeFeedback.SelectableBackground()
            : ""
        }
        onPress={() => myRef.current[field.id].open()}
      >
        <View
          key={index}
          style={
            listStyle
              ? {
                  ...styles.statisticsOnceItemAlternative,
                  backgroundColor: theme.navigator,
                  width: "46%",

                  // height: 150,
                  marginRight: 5,
                  marginLeft: 5,
                  borderRadius: 20,
                }
              : {
                  ...styles.statisticsOnceItem,
                  backgroundColor: theme.navigator,
                  paddingHorizontal: 0,
                  borderRadius: 18,
                  marginLeft: 10,
                  width: blockWidth >= 450 ? 700 : "95%",
                }
          }
        >
          <View
            style={
              listStyle
                ? {
                    ...styles.statisticsOnceText,
                    flexWrap: "wrap",
                    top: 0,
                    left: 0,
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    paddingLeft: 20,
                  }
                : {
                    ...styles.statisticsOnceText,
                    paddingLeft: 35,
                    width: blockWidth >= 450 ? 700 : "100%",
                  }
            }
          >
            <Text
              style={{
                color: theme.text,
              }}
            >
              {field.title}
            </Text>
            <View
              style={
                listStyle
                  ? {
                      ...styles.timesContainer,

                      color: theme.text,
                      bottom: 20,
                      right: 10,
                      position: "absolute",
                    }
                  : {
                      right: 20,
                      position: "absolute",
                      color: theme.text,
                      backgroundColor: indicator
                        ? renderTotalSleepColor(
                            field.id,
                            amountOfDays,
                            totalSleep,
                            theme
                          )
                        : theme.navigator,
                    }
              }
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: theme.text,
                  paddingRight: 20,
                }}
              >
                {field.value}
              </Text>
              <RBSheet
                ref={(el) => (myRef.current[field.id] = el)}
                closeOnDragDown={false}
                closeOnPressMask={true}
                height={230}
                customStyles={{
                  wrapper: {
                    backgroundColor: "rgba(0,0,0,.3)",
                  },
                  container: {
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    backgroundColor: theme.navigator,
                    padding: 5,
                  },
                  draggableIcon: {
                    display: "none",
                  },
                }}
              >
                <_onOpenDigitalInfo
                  today={field.value}
                  yesterdayDreams={yesterdayDreams}
                  tomorrowDreams={tomorrowDreams}
                  id={field.id}
                  languages={languages}
                  theme={theme}
                  todayDay={todayDay}
                  date={date}
                  indicator={indicator}
                  amountOfDays={amountOfDays}
                  currentRecommendation={currentRecommendation}
                />
              </RBSheet>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  );
};

const _onOpenDigitalInfo = ({
  today,
  yesterdayDreams,
  tomorrowDreams,
  id,
  languages,
  theme,
  todayDay,
  date,
  indicator,
  amountOfDays,
  currentRecommendation,
}) => {
  let yesterdayDate = date.date() - 1;
  yesterdayDate = moment([date.year(), date.month(), yesterdayDate]).format(
    "DD MMMM"
  );
  let tomorrowDate = date.date() + 1;
  tomorrowDate = moment([date.year(), date.month(), tomorrowDate]).format(
    "DD MMMM"
  );

  let title = "";
  let yesterday = 0;
  let tomorrow = 0;

  const dreamDayYesterday = getDreamByType("day", yesterdayDreams);
  const dreamNightYesterday = getDreamByType("night", yesterdayDreams);
  const dreamDayTomorrow = getDreamByType("day", tomorrowDreams);
  const dreamNightTomorrow = getDreamByType("night", tomorrowDreams);

  switch (id) {
    case "total_sleep":
      title = id;
      yesterday = renderTime(calcTotalSleep(yesterdayDreams), languages);
      tomorrow = renderTime(calcTotalSleep(tomorrowDreams), languages);

      break;
    case "average_sleep":
      title = id;
      yesterday = renderTime(
        calcAverage(calcTotalSleep(yesterdayDreams), yesterdayDreams.length),
        languages
      );
      tomorrow = renderTime(
        calcAverage(calcTotalSleep(tomorrowDreams), tomorrowDreams.length),
        languages
      );
      break;
    case "total_day_sleep":
      title = id;
      yesterday = renderTime(calcTotalSleep(dreamDayYesterday), languages);
      tomorrow = renderTime(calcTotalSleep(dreamDayTomorrow), languages);
      break;
    case "average_day_sleep":
      title = id;
      yesterday = renderTime(
        calcAverage(
          calcTotalSleep(dreamDayYesterday),
          dreamDayYesterday.length
        ),
        languages
      );
      tomorrow = renderTime(
        calcAverage(calcTotalSleep(dreamDayTomorrow), dreamDayTomorrow.length),
        languages
      );
      break;
    case "total_night_sleep":
      title = id;
      yesterday = renderTime(calcTotalSleep(dreamNightYesterday), languages);
      tomorrow = renderTime(calcTotalSleep(dreamNightTomorrow), languages);
      break;
    case "average_night_sleep":
      title = id;
      yesterday = renderTime(
        calcAverage(
          calcTotalSleep(dreamNightYesterday),
          dreamNightYesterday.length
        ),
        languages
      );
      tomorrow = renderTime(
        calcAverage(
          calcTotalSleep(dreamNightTomorrow),
          dreamNightTomorrow.length
        ),
        languages
      );
      break;
    case "day_sleep_count":
      title = id;
      yesterday = dreamDayYesterday.length;
      tomorrow = dreamDayTomorrow.length;
      break;
    case "night_sleep_count":
      title = id;
      yesterday = dreamNightYesterday.length;
      tomorrow = dreamNightTomorrow.length;
      break;
    case "total_wakefulness":
      title = id;
      yesterday = renderTime(calcWakefulness(yesterdayDreams), languages);
      tomorrow = renderTime(calcWakefulness(tomorrowDreams), languages);
  }

  const calcTime = (time) => {
    let arrOfTime = time.split(":");
    arrOfTime[0] = +arrOfTime[0] * 60;
    arrOfTime[1] = +arrOfTime[1];
    return arrOfTime.reduce((a, b) => +a + +b);
  };

  const _backgroundColor = (day) => {
    if (day === undefined) {
      return;
    }
    let styleObj = {
      ...styles.timesContainer,
      backgroundColor: indicator
        ? renderTotalSleepColor(id, amountOfDays, day)
        : "#fff",
      // color: theme.text || '#ffffff'
    };
    return styleObj;
  };

  const _calcDifference = (theme) => {
    let yesterdayDiff = calcTime(today) - calcTime(yesterday);
    let tomorrowDiff = calcTime(today) - calcTime(tomorrow);
    let yesterdayDiffHours = Math.trunc(yesterdayDiff / 60);
    let tomorrowDiffHours = Math.trunc(tomorrowDiff / 60);
    let yesterdayDiffMinutes = yesterdayDiff - yesterdayDiffHours * 60;
    let tomorrowDiffMinutes = tomorrowDiff - tomorrowDiffHours * 60;

    let yesterdayRenderObj = {
      minutes: Math.abs(yesterdayDiffMinutes),
      hours: Math.abs(yesterdayDiffHours),
    };
    let tomorrowRenderObj = {
      minutes: Math.abs(tomorrowDiffMinutes),
      hours: Math.abs(tomorrowDiffHours),
    };

    return (
      <View style={styles.bottomSheetBottomContainer}>
        {yesterdayDiff === 0 ? null : yesterdayDiff < 0 ? (
          <Text style={{ color: theme.text }}>
            {languages.less_by} {renderTime(yesterdayRenderObj)}
          </Text>
        ) : (
          <Text style={{ color: theme.text }}>
            {languages.more_on} {renderTime(yesterdayRenderObj)}
          </Text>
        )}
        {tomorrowDiff === 0 ? null : tomorrowDiff < 0 ? (
          <Text style={{ color: theme.text }}>
            {languages.less_by} {renderTime(tomorrowRenderObj)}
          </Text>
        ) : (
          <Text style={{ color: theme.text }}>
            {languages.more_on} {renderTime(tomorrowRenderObj)}
          </Text>
        )}
      </View>
    );
  };

  const renderRecommend = (theme) => {
    let currentId = "";

    if (id === "total_day_sleep") {
      currentId = currentRecommendation.daySleep;
    }
    if (id === "total_night_sleep") {
      currentId = currentRecommendation.nightSleep;
    }
    if (currentId === null) {
      return;
    }
    return (
      <View style={styles.recommendedTitle}>
        <Text style={{ color: theme.text }}>{languages.norm_for_newborn}</Text>
        <View style={styles.recommendedContainer}>
          <View style={styles.leftLine}></View>
          <View style={styles.middle}>
            <Text style={{ color: theme.text }}>{currentId}</Text>
          </View>
          <View style={styles.rightLine}></View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.bottomSheetIdText}>
        <Text
          style={{
            color: theme.text,
            fontSize: 16,
          }}
        >{`${languages[id]}`}</Text>
      </View>
      <View>{renderRecommend(theme)}</View>
      <View
        style={{
          ...styles.bottomSheetUpperContainer,
        }}
      >
        {todayDay ? (
          <View>
            <Text style={{ color: theme.text }}>{languages.yesterday}</Text>
            <Text style={_backgroundColor(yesterday)}>{yesterday}</Text>
          </View>
        ) : (
          <View>
            <Text>{yesterdayDate}</Text>
            <Text style={_backgroundColor(yesterday)}> {yesterday} </Text>
          </View>
        )}
        {todayDay ? (
          <View>
            <Text style={{ color: theme.text }}>{languages.today}</Text>
            <Text style={_backgroundColor(today)}>{today}</Text>
          </View>
        ) : (
          <View>
            <Text>{date.format("DD MMMM")}</Text>
            <Text style={_backgroundColor(today)}> {today} </Text>
          </View>
        )}
        {todayDay ? null : (
          <View>
            <Text style={{ color: theme.text }}>{tomorrowDate}</Text>
            <Text style={_backgroundColor(tomorrow)}> {tomorrow}</Text>
          </View>
        )}
      </View>
      {typeof today === "number" ? null : _calcDifference(theme)}
    </View>
  );
};

export const statisticByType = (type, dreams, languages) => {
  const dreamDay = getDreamByType("day", dreams);
  const dreamNight = getDreamByType("night", dreams);

  switch (type) {
    case "total_sleep":
      return {
        id: "total_sleep",
        title: `${languages.total_sleep}: `,
        value: renderTime(calcTotalSleep(dreams), languages),
      };
    case "average_sleep":
      return {
        id: "average_sleep",
        title: `${languages.average_sleep}: `,
        value: renderTime(
          calcAverage(calcTotalSleep(dreams), dreams.length),
          languages
        ),
      };
    case "total_day_sleep":
      return {
        id: "total_day_sleep",
        title: `${languages.day_sleep}: `,
        value: renderTime(calcTotalSleep(dreamDay), languages),
      };
    case "average_day_sleep":
      return {
        id: "average_day_sleep",
        title: `${languages.average_day_sleep}: `,
        value: renderTime(
          calcAverage(calcTotalSleep(dreamDay), dreamDay.length),
          languages
        ),
      };
    case "total_night_sleep":
      return {
        id: "total_night_sleep",
        title: `${languages.night_sleep}: `,
        value: renderTime(calcTotalSleep(dreamNight), languages),
      };
    case "average_night_sleep":
      return {
        id: "average_night_sleep",
        title: `${languages.average_night_sleep}: `,
        value: renderTime(
          calcAverage(calcTotalSleep(dreamNight), dreamNight.length),
          languages
        ),
      };
    case "day_sleep_count":
      return {
        id: "day_sleep_count",
        title: `${languages.day_sleep_count}: `,
        value: dreamDay.length,
      };
    case "night_sleep_count":
      return {
        id: "night_sleep_count",
        title: `${languages.night_sleep_count}: `,
        value: dreamNight.length,
      };
    case "total_wakefulness":
      return {
        id: "total_wakefulness",
        title: `${languages.total_wakefulness}: `,
        value: renderTime(calcWakefulness(dreams), languages),
      };
  }
};

export const _statisticsSection = (dreams, languages) => {
  const dreamDay = getDreamByType("day", dreams);
  const dreamNight = getDreamByType("night", dreams);

  return [
    {
      id: "total_sleep",
      title: `${languages.total_sleep}: `,
      value: renderTime(calcTotalSleep(dreams), languages),
    },
    {
      id: "average_sleep",
      title: `${languages.average_sleep}: `,
      value: renderTime(
        calcAverage(calcTotalSleep(dreams), dreams.length),
        languages
      ),
    },
    {
      id: "total_day_sleep",
      title: `${languages.day_sleep}: `,
      value: renderTime(calcTotalSleep(dreamDay), languages),
    },
    {
      id: "average_day_sleep",
      title: `${languages.average_day_sleep}: `,
      value: renderTime(
        calcAverage(calcTotalSleep(dreamDay), dreamDay.length),
        languages
      ),
    },
    {
      id: "total_night_sleep",
      title: `${languages.night_sleep}: `,
      value: renderTime(calcTotalSleep(dreamNight), languages),
    },
    {
      id: "average_night_sleep",
      title: `${languages.average_night_sleep}: `,
      value: renderTime(
        calcAverage(calcTotalSleep(dreamNight), dreamNight.length),
        languages
      ),
    },
    {
      id: "day_sleep_count",
      title: `${languages.day_sleep_count}: `,
      value: dreamDay.length,
    },
    {
      id: "night_sleep_count",
      title: `${languages.night_sleep_count}: `,
      value: dreamNight.length,
    },
    {
      id: "total_wakefulness",
      title: `${languages.total_wakefulness}: `,
      value: renderTime(calcWakefulness(dreams), languages),
    },
  ];
};
const StatisticsOnce = ({
  statisticSection,
  dreams,
  yesterdayDreams,
  tomorrowDreams,
  languages,

  birthday,
  indicator,
  date,
  curTime,
  listStyle,
  currentRecommendation,
}) => {
  const amountOfDays = differenceInDays(new Date(), new Date(birthday));
  // console.log('s', statisticSection);
  const order = statisticSection.map((item) => item.id);
  const theme = useSelector(({ app }) => app.activeTheme);
  return (
    // <ScrollView style={styles.statisticsOnce} nestedScrollEnabled = {true}>
    <View
      style={
        listStyle
          ? { ...styles.statisticsOnceContainer }
          : {
              flexWrap: "nowrap",
            }
      }
    >
      {_statisticsSection(dreams, languages)
        .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
        .map((field, index) =>
          _renderStatistics(
            field,
            index,
            statisticSection,
            theme,
            amountOfDays,
            indicator,
            yesterdayDreams,
            tomorrowDreams,
            languages,
            date,
            curTime,
            currentRecommendation,
            listStyle
          )
        )}
    </View>
  );
};

export default StatisticsOnce;
