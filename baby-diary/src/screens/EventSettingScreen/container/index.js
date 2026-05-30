import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import EventSettingScreen from "../index";
import { CenterBlock } from "../../../components";
import { getInfo } from "../../../redux/reducers/directoryReducer";
import { setLanguagesTC } from "../../../redux/reducers/appReducer";
import { useNavigation } from "@react-navigation/native";
import {
  getCurrentDream,
  startDreamTC,
  endDreamTC
} from "../../../redux/reducers/mainReducer";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state"
]);
const mapStateToProps = ({ directory, app, date }) => ({
  places: directory.places,
  eventsStatistic: directory.eventsStatistic,
  tags: directory.tags,
  languages: app.languages,
  theme: app.activeTheme,
  disableEvents: directory.disableEvents,
  disableTimeLineEvents: directory.disableTimeLineEvents,
  disableCountEvents: directory.disableCountEvents,
  disableCountEventsDay: directory.disableCountEventsDay,
  disableCountEventsNight: directory.disableCountEventsNight,
  dreams: date.dreams,
  date: date.date
});

export default connect(mapStateToProps, {
  setLanguagesTC,
  getCurrentDream,
  startDreamTC,
  endDreamTC
})(
  ({
    disableCountEvents,
    disableCountEventsDay,
    disableCountEventsNight,
    setLanguagesTC,
    languages,
    eventsStatistic,
    theme,
    disableTimeLineEvents,
    disableEvents
  }) => {
    const navigation = useNavigation();

    useEffect(() => {
      setLanguagesTC();
    }, [languages]);

    // useEffect(() => {
    //   const unsubscribe = navigation.addListener("focus", () => {
    //     getInfo("places");
    //     getInfo("tags");
    //   });
    //   return unsubscribe;
    // }, [navigation, languages]);

    return (
      <EventSettingScreen
        disableCountEvents={disableCountEvents}
        disableCountEventsDay={disableCountEventsDay}
        disableCountEventsNight={disableCountEventsNight}
        eventsStatistic={eventsStatistic}
        theme={theme}
        languages={languages}
        disableEvents={disableEvents}
        disableTimeLineEvents={disableTimeLineEvents}
      />
    );
  }
);
