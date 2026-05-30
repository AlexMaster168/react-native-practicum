import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  Switch,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import DraggableFlatList from "react-native-draggable-flatlist";

import {
  createDefaultInfo,
  setDisableEvents,
  setDisableTimeLineEvents,
  setDisableCountEvents,
  setDisableCountEventsDay,
  setDisableCountEventsNight,
  updatedInfo,
  setEventsStat,
} from "../../redux/reducers/directoryReducer";
import { styles } from "./style";
import Swipeable from "react-native-gesture-handler/Swipeable";
import AdBanner from "../../components/AdBanner";

const EventSettingScreen = ({
  eventsStatistic,
  theme,
  languages,
  disableEvents,
  disableTimeLineEvents,
  disableCountEvents,
  disableCountEventsDay,
  disableCountEventsNight,
}) => {
  const [listSettings, setListSettings] = useState([]);
  useEffect(() => {
    dispatch(updatedInfo("events_statistic", listSettings));
  }, [listSettings]);

  const renderItem = ({ item, index, drag, isActive }) => (
    <TouchableOpacity onLongPress={drag}>
      {item.disable ? (
        <Swipeable
          key={item.id}
          renderLeftActions={(progress) =>
            renderLeftActions(progress, item.value)
          }
        >
          <View
            style={{
              ...styles.settingStatisticItem,
              backgroundColor: theme.navigator,
              paddingVertical: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: theme.text }}>{item.value}</Text>
          </View>
        </Swipeable>
      ) : null}
    </TouchableOpacity>
  );
  const disableStatistic = (type) => {
    switch (type) {
      case languages.count_dream:
        dispatch(setDisableCountEvents(false));
        break;

      case languages.count_dream_per_day:
        dispatch(setDisableCountEventsDay(false));
        break;

      case languages.count_dream_per_night:
        dispatch(setDisableCountEventsNight(false));
        break;

      default:
        break;
    }
  };

  const renderLeftActions = (progress, value) => {
    return (
      <TouchableOpacity
        onPress={() => disableStatistic(value)}
        style={{
          ...styles.settingStatisticItem,
          backgroundColor: "red",
          paddingVertical: 10,
          marginBottom: 10,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: theme.text,
          }}
        >
          {languages.turn_off}
        </Text>
      </TouchableOpacity>
    );
  };
  const [listStatistic, setListStatistic] = useState(
    <DraggableFlatList
      data={listSettings}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      onDragEnd={({ data }) => setListSettings([...data])}
    />
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setListStatistic(
      <DraggableFlatList
        data={listSettings}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onDragEnd={({ data }) => setListSettings([...data])}
      />
    );
  }, [listSettings]);
  useEffect(() => {
    setListSettings([
      { value: languages.count_dream, id: 0, disable: disableCountEvents },
      {
        value: languages.count_dream_per_day,
        id: 1,
        disable: disableCountEventsDay,
      },
      {
        value: languages.count_dream_per_night,
        id: 2,
        disable: disableCountEventsNight,
      },
    ]);
  }, [disableCountEvents, disableCountEventsDay, disableCountEventsNight]);
  return (
    <React.Fragment>
      <View style={{ backgroundColor: theme.background, flex: 1, padding: 10 }}>
        <View style={{ borderRadius: 10, backgroundColor: theme.navigator }}>
          <View
            style={{
              ...styles.settingStatisticItem,
              borderBottomWidth: 1,
              borderColor: theme.background,
              backgroundColor: theme.navigator,
            }}
          >
            <Text style={{ color: theme.text }}>{languages.on}</Text>
            <Switch
              onValueChange={() => dispatch(setDisableEvents(!disableEvents))}
              value={disableEvents}
            ></Switch>
          </View>
          <View
            style={{
              ...styles.settingStatisticItem,
              backgroundColor: theme.navigator,
            }}
          >
            <Text style={{ color: theme.text }}>
              {languages.time_line_events}
            </Text>
            <Switch
              onValueChange={() =>
                dispatch(setDisableTimeLineEvents(!disableTimeLineEvents))
              }
              value={disableTimeLineEvents}
            ></Switch>
          </View>
        </View>
        <View style={{ ...styles.settingsDescription }}>
          <Text style={{ color: theme.text, opacity: 0.8 }}>
            {languages.events_instruct[0]}
          </Text>
          <Text style={{ color: theme.text, opacity: 0.8 }}>
            {languages.events_instruct[1]}
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>{listStatistic}</View>
      </View>
      <AdBanner />
    </React.Fragment>
  );
};
export default EventSettingScreen;
