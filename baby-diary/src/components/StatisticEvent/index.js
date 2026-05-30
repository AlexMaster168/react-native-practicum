import React from "react";
import { Text, View, Platform, TouchableNativeFeedback } from "react-native";
import useDeviceWidth from "../../hooks/useDeviceWidth";
import { styles } from "./styles";

const countEvent = (events, type, startNightSleep, endNightSleep) => {
  let countDay = 0;
  let countNight = 0;
  events.map((event) => {
    event.startEventTime < startNightSleep ? countDay++ : countNight++;
  });
  return type !== "night" ? countDay : countNight;
};
const StatisticsDream = ({
  eventsStatistic,
  events,
  languages,
  theme,
  listStyle,
  startNightSleep,
  endNightSleep,
  disableCountEvents,
  disableCountEventsDay,
  disableCountEventsNight,
}) => {
  console.log(eventsStatistic);
  const { blockWidth } = useDeviceWidth();

  const list = (
    countEvent,
    startNightSleep,
    languages,
    disableCountEvents,
    disableCountEventsDay,
    disableCountEventsNight
  ) => [
    {
      value: languages.count_dream,
      id: 0,
      disable: disableCountEvents,
      count: events.length,
    },
    {
      value: languages.count_dream_per_day,
      id: 1,
      disable: disableCountEventsDay,
      count: countEvent(events, "day", startNightSleep),
    },
    {
      value: languages.count_dream_per_night,
      id: 2,
      disable: disableCountEventsNight,
      count: countEvent(events, "night", startNightSleep),
    },
  ];
  const order = eventsStatistic.map((item) => item.value);

  return (
    <View style={listStyle ? { ...styles.statisticsOnceContainer } : null}>
      {list(
        countEvent,
        startNightSleep,
        languages,
        disableCountEvents,
        disableCountEventsDay,
        disableCountEventsNight
      )
        .sort((a, b) => order.indexOf(a.value) - order.indexOf(b.value))
        .map((setting, index) =>
          setting.disable ? (
            setting.count > 0 ? (
              <TouchableNativeFeedback
                background={
                  Platform.OS === "android"
                    ? TouchableNativeFeedback.SelectableBackground()
                    : ""
                }
                key={setting.id}
              >
                <View
                  style={
                    listStyle
                      ? {
                          ...styles.statisticsOnceItemAlternative,
                          backgroundColor: theme.navigator,
                          width: "46%",
                          height: 110,
                          marginRight: 5,
                          marginLeft: 5,
                          borderRadius: 20,
                        }
                      : {
                          ...styles.statisticsOnceItem,
                          backgroundColor: theme.navigator,
                          flexDirection: "row",
                          justifyContent: "center",
                          flexWrap: "nowrap",
                          marginLeft: 5,
                          width: blockWidth >= 450 ? 700 : "96%",
                          borderRadius: 12,
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
                            width: "90%",
                            height: "100%",
                            paddingTop: 15,
                          }
                        : {
                            ...styles.statisticsOnceText,
                            width: blockWidth >= 450 ? 700 : "100%",
                          }
                    }
                  >
                    <Text style={{ color: theme.text, paddingLeft: 25 }}>
                      {setting.value}
                    </Text>
                    <Text
                      style={
                        listStyle
                          ? {
                              ...styles.timesContainer,
                              color: theme.text,
                              bottom: 15,
                              right: 5,
                              position: "absolute",
                              fontWeight: "bold",
                            }
                          : {
                              right: 25,
                              position: "absolute",
                              color: theme.text,
                              fontWeight: "bold",
                            }
                      }
                    >
                      {setting.count}
                    </Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
            ) : null
          ) : null
        )}
    </View>
  );
};
export default StatisticsDream;
