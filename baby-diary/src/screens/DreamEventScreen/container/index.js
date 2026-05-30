import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import DreamEvent from "../index";
import { getInfo } from "../../../redux/reducers/directoryReducer";
import { setLanguagesTC } from "../../../redux/reducers/appReducer";
import { useNavigation } from "@react-navigation/native";
import {
  getCurrentDream,
  startDreamTC,
  endDreamTC,
} from "../../../redux/reducers/mainReducer";
import { setDate } from "../../../redux/reducers/eventsReducer";
import { LogBox } from "react-native";
import { getEventsByDate } from "../../../redux/reducers/eventsReducer";
import moment from "moment";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
const mapStateToProps = ({ directory, app, events, statistics, child }) => ({
  languages: app.languages,
  activeLanguage: app.activeLanguage,
  theme: app.activeTheme,
  currentTheme: app.activeThemeName,
  startNightSleep: app.startNightSleep,
  endNightSleep: app.endNightSleep,
  eventsStatistic: directory.eventsStatistic,
  disableEvents: directory.disableEvents,
  gesture: statistics.gesture,
  disableCountEvents: directory.disableCountEvents,
  disableCountEventsDay: directory.disableCountEventsDay,
  disableCountEventsNight: directory.disableCountEventsNight,
  disableTimeLineEvents: directory.disableTimeLineEvents,
  date: events.date,
  events: events.events,
  activeChild: child.activeChild,
});

export default connect(mapStateToProps, {
  getInfo,
  setLanguagesTC,
  getCurrentDream,
  startDreamTC,
  endDreamTC,
  setDate,
})(
  ({
    disableCountEvents,
    disableCountEventsDay,
    disableCountEventsNight,
    getInfo,
    eventsStatistic,
    startNightSleep,
    endNightSleep,
    setDate,
    setLanguagesTC,
    languages,
    activeLanguage,
    disableEvents,
    disableTimeLineEvents,
    date,
    dreams,
    gesture,
    dream,
    events,
    theme,
    currentTheme,
    activeChild,
  }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
      setLanguagesTC();
    }, [languages]);

    useEffect(() => {
      console.log("date useEffect", date);
      dispatch(
        getEventsByDate(activeChild.id, moment(date).format("MM/DD/YYYY"))
      );
    }, [date, activeChild]);

    useEffect(() => {
      const unsubscribe = navigation.addListener("focus", () => {});
      return unsubscribe;
    }, [navigation, languages]);

    return (
      <DreamEvent
        disableCountEvents={disableCountEvents}
        disableCountEventsDay={disableCountEventsDay}
        disableCountEventsNight={disableCountEventsNight}
        eventsStatistic={eventsStatistic}
        theme={theme}
        currentTheme={currentTheme}
        languages={languages}
        activeLanguage={activeLanguage}
        date={date}
        setDate={setDate}
        dream={dream}
        events={events}
        startNightSleep={startNightSleep}
        endNightSleep={endNightSleep}
        dreams={dreams}
        gesture={gesture}
        disableEvents={disableEvents}
        disableTimeLineEvents={disableTimeLineEvents}
        activeChild={activeChild}
      />
    );
  }
);
