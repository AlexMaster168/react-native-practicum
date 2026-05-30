import React, { useState } from "react";
import {
  Text,
  Switch,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { styles } from "./styles";

import {
  setTimeLineDreams,
  setDreamColorIndicator,
} from "../../redux/reducers/statisticsReducer";
import { useDispatch } from "react-redux";
import { AdBanner } from "../../components";
import { updatedStatistics } from "../../redux/reducers/appReducer";
import {
  calcAverage,
  calcTotalSleep,
  calcWakefulness,
  getDreamByType,
} from "../../utils/calcStatistics";
import { renderTime } from "../../utils/renderTime";

import DraggableFlatList from "react-native-draggable-flatlist";
import Swipeable from "react-native-gesture-handler/Swipeable";
const deviceWidth = Dimensions.get("window").width;
const _settingsStatisticsDreams = (dreamDay, dreamNight, dreams, languages) => [
  {
    id: "total_sleep",
    title: `${languages.total_sleep} `,
    value: renderTime(calcTotalSleep(dreams), languages),
  },
  {
    id: "average_sleep",
    title: `${languages.average_sleep} `,
    value: renderTime(
      calcAverage(calcTotalSleep(dreams), dreams.length),
      languages
    ),
  },
  {
    id: "total_day_sleep",
    title: `${languages.day_sleep} `,
    value: renderTime(calcTotalSleep(dreamDay), languages),
  },
  {
    id: "average_day_sleep",
    title: `${languages.average_day_sleep} `,
    value: renderTime(
      calcAverage(calcTotalSleep(dreamDay), dreamDay.length),
      languages
    ),
  },
  {
    id: "total_night_sleep",
    title: `${languages.night_sleep} `,
    value: renderTime(calcTotalSleep(dreamNight), languages),
  },
  {
    id: "average_night_sleep",
    title: `${languages.average_night_sleep} `,
    value: renderTime(
      calcAverage(calcTotalSleep(dreamNight), dreamNight.length),
      languages
    ),
  },
  {
    id: "day_sleep_count",
    title: `${languages.day_sleep_count} `,
    value: dreamDay.length,
  },
  {
    id: "night_sleep_count",
    title: `${languages.night_sleep_count} `,
    value: dreamNight.length,
  },
  {
    id: "total_wakefulness",
    title: `${languages.total_wakefulness} `,
    value: renderTime(calcWakefulness(dreams), languages),
  },
];

const render = (
  dispatch,
  statisticSection,
  _settingsStatisticsDreams,
  _handleSettingsUpdateDreams,
  dreamDay,
  dreamNight,
  dreams,
  languages,
  theme
) => {
  console.log("render list");
  const swipeRef = React.useRef([]);
  const renderItem = ({ item, index, drag }) => (
    <TouchableOpacity style={{ marginBottom: 10 }} onLongPress={drag}>
      <Swipeable
        ref={(el) => (swipeRef.current[item.id] = el)}
        key={item.id}
        renderLeftActions={() => renderLeftActions(item)}
      >
        <View
          style={{
            ...styles.settingStatisticItem,
            width: "100%",
            flexGrow: 1,
            flex: 1,
            backgroundColor: theme.navigator,
            borderRadius: 14,
          }}
        >
          <Text style={{ color: theme.text, paddingVertical: 4 }}>
            {item.title}
          </Text>
        </View>
      </Swipeable>
    </TouchableOpacity>
  );
  const _toggleEnable = (item) => {
    console.log(item);
    _handleSettingsUpdateDreams(item.id);
  };
  const renderLeftActions = (item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          _toggleEnable(item);
          swipeRef.current[item.id].close();
        }}
        style={{
          borderRadius: 10,
          ...styles.settingStatisticItem,
          backgroundColor: "red",
          flexGrow: 3,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: theme.text,
          }}
        >
          {languages.delete}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView horizontal={true}>
      <DraggableFlatList
        data={
          statisticSection.length < 1
            ? _settingsStatisticsDreams(dreamDay, dreamNight, dreams, languages)
            : statisticSection
        }
        contentContainerStyle={{ width: deviceWidth - 40 }}
        getItemLayout={(data, index) => ({
          length: 25,
          offset: 25 * index,
          index,
        })}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onDragEnd={({ data }) =>
          dispatch(updatedStatistics("statisticSection", data))
        }
      />
    </ScrollView>
  );
};

const toggleColorIndicator = (
  gesture,
  indicator,
  dispatch,
  dreamColor,
  setDreamColor,
  statisticColor,
  setStatisticColor,
  setStatisticColorStatistic,
  setDreamColorStatistic
) => {
  setDreamColor(!dreamColor);
  setDreamColorIndicator(!dreamColor);
  dispatch(setDreamColorIndicator(!dreamColor));
};

const toggleGestures = (gestur, setGesture, setGestureActive) => {
  setGesture(!gestur);
  setGestureActive(!gestur);
};
const toggletimeLine = (dispatch, timeLineDreams) => {
  dispatch(setTimeLineDreams(!timeLineDreams));
};

const SettingsStatisticsScreenDreams = ({
  timeLineDreams,
  dreams,
  setStatisticsSectionTC,
  statisticSection,
  StatisticIndicator,
  DreamIndicator,
  gesture,
  languages,
  indicator,
  theme,
  setDreamColorStatistic,
  setStatisticColorStatistic,
}) => {
  console.log("render SettingsStatisticsScreenDreams");
  const dreamDay = getDreamByType("day", dreams);
  const dreamNight = getDreamByType("night", dreams);

  const [dreamColor, setDreamColor] = useState(DreamIndicator ? true : false);
  const [statisticColor, setStatisticColor] = useState(
    StatisticIndicator ? true : false
  );
  const [gestur, setGesture] = useState(gesture ? true : false);
  const dispatch = useDispatch();

  const _handleSettingsUpdateDreams = (settingValue) => {
    const updatedSettings =
      statisticSection.length === 0
        ? _settingsStatisticsDreams(
            dreamDay,
            dreamNight,
            dreams,
            languages
          ).find(({ id }) => id === settingValue)
        : statisticSection.find(({ id }) => id === settingValue);
    console.log("settingValue", settingValue);
    setStatisticsSectionTC(updatedSettings);
  };

  return (
    <React.Fragment>
      <ScrollView
        style={{
          ...styles.settingStatisticsContainer,
          backgroundColor: theme.background,
        }}
      >
        <View
          style={{
            paddingHorizontal: 5,
            // padding: 20,
            marginTop: 10,
            borderRadius: 20,
            backgroundColor: theme.navigator,
          }}
        >
          <View
            style={{
              ...styles.settingStatisticItem,
              marginTop: 0,
              borderColor: theme.background,

              borderStyle: "solid",
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ color: theme.text }}>
              {languages.show_indicator}
            </Text>
            <Switch
              onValueChange={() =>
                toggleColorIndicator(
                  gestur,
                  indicator,
                  dispatch,
                  dreamColor,
                  setDreamColor,
                  statisticColor,
                  setStatisticColor,
                  setDreamColorStatistic,
                  setStatisticColorStatistic
                )
              }
              value={dreamColor}
            />
          </View>
          <View
            style={{
              ...styles.settingStatisticItem,
              marginTop: 0,
            }}
          >
            <Text style={{ color: theme.text }}>
              {languages.time_line_dreams}
            </Text>
            <Switch
              onValueChange={() => dispatch(setTimeLineDreams(!timeLineDreams))}
              value={timeLineDreams}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            marginVertical: 10,
            paddingHorizontal: 5,
          }}
        >
          <Text
            style={{
              fontSize: 9,
              opacity: 0.7,
              color: theme.text,
            }}
          >
            {languages.events_instruct[0]}
          </Text>
          <Text
            style={{
              fontSize: 9,
              opacity: 0.7,
              color: "#fff",
            }}
          >
            {languages.events_instruct[1]}
          </Text>
        </View>

        <View style={{ paddingBottom: 30 }}>
          {render(
            dispatch,
            statisticSection,
            _settingsStatisticsDreams,
            _handleSettingsUpdateDreams,
            dreamDay,
            dreamNight,
            dreams,
            languages,
            theme
          )}
        </View>
      </ScrollView>
      <AdBanner />
    </React.Fragment>
  );
};
export default SettingsStatisticsScreenDreams;
