import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent } from "../../redux/reducers/eventsReducer";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  TouchableNativeFeedback,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { calcTimeEvents } from "../../utils/calcTime";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { styles } from "./styles";
import moment from "moment";
const windowWidth = Dimensions.get("window").width;
const renderIcon = (type) => {
  switch (type) {
    case "Wake up":
    case "Просыпание":
      return (
        <Image
          style={{ width: 26, height: 26 }}
          source={require("../../images/icons/alarm-clock.png")}
        />
      );
      break;
    case "Feeding":
    case "Кормление":
      return (
        <Image
          style={{ width: 26, height: 26 }}
          source={require("../../images/icons/babyBottle.png")}
        />
      );
      break;
    case "Other":
    case "Другое":
      return (
        <Image
          style={{ width: 26, height: 26, tintColor: "#1ABC9C" }}
          source={require("../../images/icons/ic_calendar.png")}
        />
      );
      break;

    default:
      break;
  }
};

const EventItem = ({
  events,
  activeChild,
  languages,
  activeLanguage,
  theme,
  setIdEvent,
  setButtonEdit,
  setVisible,
  setComment,
  setActiveEventType,
  setStartTimeEvent,
  setStartDateEvent,
  setEndTimeEvent,
  setEndDateEvent,
  disableTimeLineEvents,
}) => {
  const dispatch = useDispatch();
  const { showActionSheetWithOptions } = useActionSheet();

  const _onOpenActionSheet = (currentEvent) => {
    const options = [languages.edit, languages.delete];
    const cancelButtonIndex = 2;
    const title = `${currentEvent.activeEventType}: ${moment(
      currentEvent.startTime
    )
      .locale(activeLanguage)
      .format("DD MMM. HH:mm")}`;
    let icons = [
      <Image
        style={styles.actionSheetIcon}
        source={require("../../images/icons/ic_edit.png")}
        tintColor="#7c708c"
      />,
      <Image
        style={styles.actionSheetIcon}
        source={require("../../images/icons/ic_delete.png")}
        tintColor="#FF0000"
      />,
    ];
    const containerStyle = { backgroundColor: theme.navigator || "#fff" };
    const titleTextStyle = { color: theme.text, fontSize: 18 };
    const textStyle = { color: theme.text };

    const changeEvent = (currentEvent) => {
      const endTime = currentEvent?.endTime
        ? moment(currentEvent.endTime).toDate()
        : null;
      setComment(currentEvent.commentEvent);
      setActiveEventType(currentEvent.activeEventType);
      setStartTimeEvent(moment(currentEvent.startTime).toDate());
      setStartDateEvent(moment(currentEvent.startTime).toDate());
      setEndTimeEvent(endTime);
      setEndDateEvent(endTime);
      setVisible({ visible: true, type: "selectEvents" });
    };
    showActionSheetWithOptions(
      {
        currentEvent,
        options,
        cancelButtonIndex,
        icons,
        title,
        containerStyle,
        titleTextStyle,
        textStyle,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            {
              setButtonEdit(true);
              changeEvent(currentEvent);
              setIdEvent(currentEvent.id);
            }
            break;
          case 1:
            {
              dispatch(deleteEvent(activeChild.id, currentEvent));
            }
            break;
          case 2:
            break;
        }
      }
    );
  };

  // calculate time between event
  const calculateTimeBetweenEvent = (currentEvent, previousEvent) => {
    const previousTime =
      Boolean(previousEvent?.endTime) &&
      previousEvent.endTime < currentEvent.startTime
        ? previousEvent.endTime
        : previousEvent.startTime;
    moment(previousTime).format("HH:mm");
    return calcTimeEvents(
      languages,
      moment(previousTime).format("HH:mm"),
      moment(currentEvent.startTime).format("HH:mm")
    );
  };

  const calculateEventTime = (event) => {
    if (event.endTime) {
      const start = moment(event.startTime);
      const end = moment(event.endTime);
      const different = end.diff(start);
      const hh = Math.floor(different / 1000 / 60 / 60);
      const mm = Math.floor(different / 1000 / 60) - hh * 60;
      return `${event.activeEventType}: ${
        hh ? hh + " " + languages.hours[0] : ""
      } ${mm + " " + languages.minutes[0]} `;
    }
    return `${event.activeEventType}`;
  };

  return (
    <View
      style={{
        paddingVertical: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {events
        .sort((a, b) => a.startTime < b.startTime)
        .map((event, index, array) => {
          return (
            <View
              style={{ paddingHorizontal: 5, width: windowWidth - 20 }}
              key={event.id}
            >
              <View style={styles.timeAndRow}>
                <Text style={{ color: theme.text }}>
                  {event.endTime
                    ? moment(event.endTime).format("HH:mm")
                    : moment(event.startTime).format("HH:mm")}
                </Text>
                <View style={styles.row}></View>
              </View>
              <TouchableNativeFeedback
                background={
                  Platform.OS === "android"
                    ? TouchableNativeFeedback.SelectableBackground()
                    : ""
                }
                onPress={() => _onOpenActionSheet(event)}
              >
                <View
                  style={{
                    ...styles.eventItem,
                    backgroundColor: theme.navigator,
                  }}
                >
                  {renderIcon(event.activeEventType)}
                  <View
                    style={{ alignItems: "flex-start", paddingHorizontal: 10 }}
                  >
                    <Text
                      style={{
                        ...styles.itemType,
                        color: theme.text,
                      }}
                    >
                      {calculateEventTime(event)}
                    </Text>
                    {event.commentEvent && (
                      <Text
                        style={{
                          ...styles.itemComment,
                          color: theme.text,
                        }}
                      >
                        {event.commentEvent}
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableNativeFeedback>
              <View style={styles.timeAndRow}>
                <Text style={{ color: theme.text }}>
                  {event.endTime && moment(event.startTime).format("HH:mm")}
                </Text>
                <View style={styles.row}></View>
                <Text style={{ marginLeft: 5, color: "white", fontSize: 12 }}>
                  12:00
                </Text>
              </View>

              <View style={{ paddingVertical: 5 }}>
                {disableTimeLineEvents && index !== array.length - 1 && (
                  <Text
                    style={{
                      color: theme.text,
                      fontSize: 10,
                      textAlign: "right",
                    }}
                  >
                    {calculateTimeBetweenEvent(event, array[index + 1])}
                  </Text>
                )}
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default EventItem;
