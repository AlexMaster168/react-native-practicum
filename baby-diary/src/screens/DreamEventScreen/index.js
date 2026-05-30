import React, { useState, useEffect, useRef } from "react";
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
  Alert,
} from "react-native";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { calcTimeEvents } from "../../utils/calcTime";
import { connectTimeAndDate } from "../../utils/timeValues";
import { getMillisecondsByDateAndTime } from "../../utils/timeValues";
import { useNavigation } from "@react-navigation/native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import GestureRecognizer from "react-native-swipe-gestures";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button, Label, DateNumber, EventItem } from "../../components";
import AdBanner from "../../components/AdBanner";
import moment from "moment";
import StatisticsDream from "../../components/StatisticEvent";
import Modal from "react-native-modal";
import { accent } from "../../core/colors";
import {
  createEvent,
  deleteEvent,
  updateEvent,
} from "../../redux/reducers/eventsReducer";
import useDeviceWidth from "../../hooks/useDeviceWidth";

const DreamEvent = ({
  eventsStatistic,
  isNew,
  gesture,
  dream,
  theme,
  languages,
  activeLanguage,
  date,
  events,
  setDate,
  dreams,
  startNightSleep,
  endNightSleep,
  disableCountEvents,
  disableCountEventsDay,
  disableCountEventsNight,
  disableTimeLineEvents,
  activeChild,
  currentTheme,
}) => {
  const dispatch = useDispatch();
  const places = languages.type_event;
  const [listStyle, setListStyle] = useState(true);
  const [buttonEdit, setButtonEdit] = useState(false);
  const [visible, setVisible] = useState({ visible: false, type: "" });
  const [activeEventType, setActiveEventType] = useState(
    languages.type_event[0]
  );
  const [commentEvent, setComment] = useState("");
  // Time and date state
  const [startEventTime, setStartTimeEvent] = useState(null);
  const [startEventDate, setStartDateEvent] = useState(null);
  const [endEventTime, setEndTimeEvent] = useState(null);
  const [endEventDate, setEndDateEvent] = useState(null);
  //
  const [listEvent, setListEvent] = useState();
  const [idEvent, setIdEvent] = useState(0);
  const [mode, setMode] = useState("time");
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  //
  const { blockWidth } = useDeviceWidth();

  const { showActionSheetWithOptions } = useActionSheet();
  const EventPlaceRef = useRef("");

  // If isToday is true then The Add button will be shown
  const isToday =
    moment(date).format("D") === moment().format("D") &&
    moment(date).format("M") === moment().format("M") &&
    moment(date).format("YYYY") === moment().format("YYYY");

  const _handleCommentChange = (value) => setComment(value);

  // set all values in default when an event was created or updated
  const setDefault = () => {
    setActiveEventType(languages.type_event[0]); // set type of event to default
    setEndTimeEvent(null); // set endTime of an event to default
    setEndDateEvent(null); // set endTime of an event to default
    setButtonEdit(false); // set to default edit button
    setIdEvent(""); // reset id of the event that was edited
    setComment(""); // reset comment
  };

  const verifyEventDates = () => {
    // checks if event is longer than 5 hours or start time is bigger than end time else returns true
    const FIVE_HOUR_IN_MS = 1.8e7;

    const startTimeMoment = moment(startEventTime).format("HH:mm");
    const startDateMoment = moment(startEventDate)
      .locale(activeLanguage)
      .format("DD MMM");
    const endTimeMoment =
      moment(endEventTime).isValid() && moment(endEventTime).format("HH:mm");
    const endDateMoment =
      moment(endEventTime).isValid() &&
      moment(endEventDate).locale(activeLanguage).format("DD MMM");

    const startTime = getMillisecondsByDateAndTime(
      startTimeMoment,
      startDateMoment
    );
    const endTime = getMillisecondsByDateAndTime(endTimeMoment, endDateMoment);

    if (startTime < endTime || !Boolean(endTime)) {
      if (endTime - startTime > FIVE_HOUR_IN_MS) {
        Alert.alert(languages.error, languages.more_than_five);
        return false;
      } else {
        return true;
      }
    } else {
      Alert.alert(languages.error, languages.start_more_than_end);
      return false;
    }
  };

  // on new event create
  const _handleAddEventPlace = () => {
    // Validation data
    const startTime = connectTimeAndDate(startEventTime, startEventDate);
    const endTime = connectTimeAndDate(endEventTime, endEventDate);
    if (verifyEventDates()) {
      setVisible({ ...visible, visible: false });
      // in first case: "+" button is pressed
      // in second case: "Add event" button is pressed
      if (visible.type === "selectEvents") {
        const new_event = {
          id: Date.now(),
          commentEvent,
          activeEventType,
          startTime,
          endTime,
        };
        dispatch(createEvent(activeChild.id, new_event));
      } else {
        const new_event = {
          id: Date.now(),
          commentEvent: null,
          activeEventType: EventPlaceRef.current,
          startTime,
          endTime,
        };
        dispatch(createEvent(activeChild.id, new_event));
      }
      setDefault();
    }
  };

  // handle edit event
  const _handleEditEventButton = () => {
    const startTime = connectTimeAndDate(startEventTime, startEventDate);
    const endTime = connectTimeAndDate(endEventTime, endEventDate);
    if (verifyEventDates()) {
      setVisible({ ...visible, visible: false });
      const index = events.findIndex((el) => el.id === idEvent);
      const payload = Object.assign({}, events[index], {
        commentEvent,
        activeEventType,
        startTime,
        endTime,
      });
      dispatch(updateEvent(activeChild.id, events[index].startTime, payload));
      setDefault();
    }
  };

  const updateDreamTime = (type, time) => {
    switch (type) {
      case "startEventTime":
        setShowStart(() => false);
        setStartTimeEvent(time);
        break;
      case "startEventDate":
        setShowStart(() => false);
        setStartDateEvent(time);
        break;
      case "endEventTime":
        setShowEnd(() => false);
        setEndTimeEvent(time);
        break;
      case "endEventDate":
        setShowEnd(() => false);
        setEndDateEvent(time);
        break;
      default:
        break;
    }
  };

  const itemIcons = [
    require("../../images/icons/alarm-clock.png"),
    require("../../images/icons/babyBottle.png"),
    require("../../images/icons/ic_calendar.png"),
  ];

  const onSwipe = (side) => {
    if (side === "left") {
      if (date.format("DD MMM YYYY") !== moment().format("DD MMM YYYY")) {
        setDate(moment(date.add(1, "days")));
      }
    } else {
      setDate(moment(date.subtract(1, "days")));
    }
  };

  const onChange = (selectedDate) => {
    if (mode === "time")
      showStart
        ? updateDreamTime("startEventTime", selectedDate)
        : updateDreamTime("endEventTime", selectedDate);
    else
      showStart
        ? updateDreamTime("startEventDate", selectedDate)
        : updateDreamTime("endEventDate", selectedDate);
  };

  const showMode = (currentMode, position) => {
    position === "start" ? setShowStart(true) : setShowEnd(true);
    setMode(currentMode);
  };

  useEffect(() => {
    setListEvent(
      <ScrollView>
        {events && events.length > 0 && (
          <EventItem
            events={events}
            languages={languages}
            activeLanguage={activeLanguage}
            theme={theme}
            activeChild={activeChild}
            setIdEvent={setIdEvent}
            setButtonEdit={setButtonEdit}
            setVisible={setVisible}
            setComment={setComment}
            setActiveEventType={setActiveEventType}
            setStartTimeEvent={setStartTimeEvent}
            setStartDateEvent={setStartDateEvent}
            setEndTimeEvent={setEndTimeEvent}
            setEndDateEvent={setEndDateEvent}
            disableTimeLineEvents={disableTimeLineEvents}
          />
        )}
        {!!events.length && events && (
          <View
            style={{
              marginBottom: 150,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: blockWidth >= 450 ? 700 : "95%",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <Text style={{ ...styles.statisticsText, color: theme.text }}>
                {languages.statistics}
              </Text>
              <View style={styles.changeStyleBtnContainer}>
                <TouchableOpacity
                  style={styles.changeStyleBtn}
                  onPress={() => setListStyle(false)}
                >
                  <Image
                    style={{
                      ...styles.icon,
                      tintColor: !listStyle
                        ? currentTheme === "light"
                          ? accent
                          : "#ebcc34"
                        : theme.text,
                    }}
                    source={require("../../images/icons/listmenu.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.changeStyleBtn}
                  onPress={() => setListStyle(true)}
                >
                  <Image
                    style={{
                      ...styles.icon,
                      tintColor: listStyle
                        ? currentTheme === "light"
                          ? accent
                          : "#ebcc34"
                        : theme.text,
                    }}
                    source={require("../../images/icons/tabmenu.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                width: blockWidth >= 450 ? 700 : "100%",
              }}
            >
              <StatisticsDream
                disableCountEvents={disableCountEvents}
                disableCountEventsDay={disableCountEventsDay}
                disableCountEventsNight={disableCountEventsNight}
                events={events}
                languages={languages}
                theme={theme}
                listStyle={listStyle}
                startNightSleep={startNightSleep}
                endNightSleep={endNightSleep}
                eventsStatistic={eventsStatistic}
              />
            </View>
          </View>
        )}
      </ScrollView>
    );
  }, [
    theme,
    listStyle,
    events,
    disableTimeLineEvents,
    disableCountEvents,
    disableCountEventsDay,
    disableCountEventsNight,
    eventsStatistic,
  ]);

  return (
    <GestureRecognizer
      onSwipeLeft={() => onSwipe("left")}
      onSwipeRight={() => onSwipe("right")}
      style={{ ...styles.main, backgroundColor: theme.background }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <DateNumber
          date={moment(date)}
          maxDate={new Date()}
          setDate={setDate}
          theme={theme}
        />
      </View>
      {listEvent}
      <View>
        <View
          style={{
            marginTop: 50,
            ...styles.buttonBlock,
          }}
        >
          {isToday && (
            <Button
              style={{ ...styles.addEventButton }}
              buttonText={languages.add_event}
              pressHandler={() => {
                setStartTimeEvent(moment().toDate());
                setStartDateEvent(moment(date).toDate());
                setEndTimeEvent(null);
                setEndDateEvent(null);
                setVisible({ visible: true, type: "createEvent" });
              }}
            />
          )}
          <TouchableOpacity
            onPress={() => {
              setStartTimeEvent(moment().toDate());
              setStartDateEvent(moment(date).toDate());
              setEndTimeEvent(null);
              setEndDateEvent(null);
              setVisible({ visible: true, type: "selectEvents" });
            }}
            style={{ alignSelf: "flex-end", flex: 1 }}
          >
            <Image
              source={require("../../images/icons/ic_plus.png")}
              style={{
                borderRadius: 20,
                backgroundColor: "#ebcc34",
                width: 37,
                height: 37,
                alignSelf: "flex-end",
                tintColor: "#000024",
              }}
            />
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={visible.visible}
          animationType="slide"
          onBackButtonPress={() => {
            setDefault();
            setVisible({ visible: false, type: "" });
          }}
          onBackdropPress={() => {
            setDefault();
            setVisible({ visible: false, type: "" });
          }}
          style={{
            justifyContent: "flex-end",
            margin: 0,
          }}
          onOrientationChange={() => setVisible({ visible: false, type: "" })}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
          >
            <View
              style={{
                maxHeight: 500,
                ...styles.modalView,
                width: "100%",
                backgroundColor:
                  visible.type === "selectEvents"
                    ? theme.background
                    : theme.navigator,
              }}
            >
              <View style={{ ...styles.iconContainer }}>
                <Text style={{ ...styles.headerText, color: theme.text }}>
                  {languages.new_event}
                </Text>
              </View>
              {visible.type === "selectEvents" ? (
                <ScrollView style={{ height: "100%" }}>
                  <View>
                    <Text style={{ ...styles.heading, color: theme.text }}>
                      {languages.start_time_event}
                    </Text>
                    <View style={{ ...styles.timeBlock }}>
                      <TouchableOpacity
                        style={{
                          ...styles.time,
                          backgroundColor: theme.navigator,
                        }}
                        onPress={() => {
                          showMode("time", "start");
                        }}
                      >
                        <Text
                          style={{
                            ...styles.text,
                            color: theme.text,
                            paddingVertical: 10,
                          }}
                        >
                          {moment(startEventTime).format("HH:mm")}
                        </Text>
                      </TouchableOpacity>
                      <View>
                        <DateTimePickerModal
                          isVisible={showStart}
                          testID="dateTimePicker"
                          mode={mode}
                          date={startEventTime}
                          maximumDate={moment().add(1, "days").toDate()}
                          is24Hour={true}
                          onConfirm={(date) => {
                            setShowStart(false);
                            onChange(date);
                          }}
                          onCancel={() => setShowStart(false)}
                        />
                      </View>
                      <TouchableOpacity
                        style={{
                          ...styles.time,
                          backgroundColor: theme.navigator,
                        }}
                        onPress={() => {
                          showMode("date", "start");
                        }}
                      >
                        <Text
                          style={{
                            ...styles.text,
                            color: theme.text,
                            paddingVertical: 10,
                          }}
                        >
                          {moment(startEventDate)
                            .locale(activeLanguage)
                            .format("DD MMM")}
                        </Text>
                      </TouchableOpacity>
                      <View>
                        <DateTimePickerModal
                          isVisible={showStart && mode === "date"}
                          testID="dateTimePicker"
                          mode={mode}
                          date={startEventDate}
                          maximumDate={new Date()}
                          onConfirm={(date) => {
                            setShowStart(false);
                            onChange(date);
                          }}
                          onCancel={() => setShowStart(false)}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 30,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.heading,
                          color: theme.text,
                        }}
                      >
                        {languages.end_time_event}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setEndDateEvent(null);
                          setEndTimeEvent(null);
                        }}
                      >
                        <Text
                          style={{
                            ...styles.heading,
                            color: "#E67E22",
                            paddingHorizontal: 10,
                            marginTop: 10,
                            marginRight: 20,
                          }}
                        >
                          {languages.reset}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ ...styles.timeBlock }}>
                      <TouchableOpacity
                        style={{
                          ...styles.time,
                          backgroundColor: theme.navigator,
                        }}
                        onPress={() => {
                          showMode("time", "end");
                        }}
                      >
                        <Text
                          style={{
                            ...styles.text,
                            color: theme.text,
                            paddingVertical: 10,
                          }}
                        >
                          {endEventTime
                            ? moment(endEventTime).format("HH:mm")
                            : languages.time}
                        </Text>
                      </TouchableOpacity>
                      <DateTimePickerModal
                        isVisible={showEnd}
                        testID="dateTimePicker"
                        date={
                          endEventTime ? endEventTime : moment(date).toDate()
                        }
                        maximumDate={moment().add(1, "days").toDate()}
                        mode={mode}
                        is24Hour={true}
                        onConfirm={(date) => {
                          setShowEnd(false);
                          if (!endEventDate) {
                            updateDreamTime(
                              "endEventDate",
                              moment(date).toDate()
                            );
                          }
                          onChange(date);
                        }}
                        onCancel={() => setShowEnd(false)}
                      />
                      <TouchableOpacity
                        style={{
                          ...styles.time,
                          backgroundColor: theme.navigator,
                        }}
                        onPress={() => {
                          showMode("date", "end");
                        }}
                      >
                        <Text
                          style={{
                            ...styles.text,
                            color: theme.text,
                            paddingVertical: 10,
                          }}
                        >
                          {endEventDate
                            ? moment(endEventDate)
                                .locale(activeLanguage)
                                .format("DD MMM")
                            : languages.date}
                        </Text>
                      </TouchableOpacity>
                      <View>
                        <DateTimePickerModal
                          isVisible={showEnd && mode === "date"}
                          testID="dateTimePicker"
                          mode={mode}
                          date={
                            endEventDate ? endEventDate : moment(date).toDate()
                          }
                          maximumDate={new Date()}
                          onConfirm={(date) => {
                            setShowEnd(false);
                            if (!endEventTime) {
                              updateDreamTime(
                                "endEventTime",
                                moment().toDate()
                              );
                            }
                            onChange(date);
                          }}
                          onCancel={() => setShowEnd(false)}
                        />
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setEndTimeEvent(moment().toDate());
                        setEndDateEvent(moment().toDate());
                      }}
                    >
                      <Text
                        style={{
                          ...styles.heading,
                          color: "#E67E22",
                          paddingHorizontal: 10,
                          marginTop: 10,
                          marginRight: 20,
                          textAlign: "right",
                        }}
                      >
                        {languages.now}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text
                      style={{
                        ...styles.textAreaLabel,
                        color: theme.text,
                        marginTop: 20,
                      }}
                    >
                      {languages.comment_event}
                    </Text>
                    <TextInput
                      // onFocus={() => {
                      //   // setIsFocused(true);
                      //   setComment("");
                      // }}
                      value={commentEvent}
                      onChangeText={_handleCommentChange}
                      // onBlur={_updateDreamComment}
                      multiline={true}
                      blurOnSubmit
                      style={{
                        ...styles.textAreaStyle,
                        backgroundColor: theme.navigator,
                        color: theme.text,
                      }}
                    />
                  </View>

                  <View style={{ ...styles.placesBlock, marginTop: 40 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.textAreaLabel,
                          color: theme.text,
                        }}
                      >
                        {languages.eventType}
                      </Text>
                    </View>
                    <View
                      style={{ ...styles.places, paddingVertical: 10 }}
                      horizontal={true}
                    >
                      {places.map((place, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setActiveEventType(place);
                          }}
                        >
                          <Label
                            style={styles.label}
                            focused={place === activeEventType}
                          >
                            {place}
                          </Label>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                  {buttonEdit ? (
                    <Button
                      style={{
                        paddingVertical: 10,
                        borderRadius: 8,
                      }}
                      buttonText={languages.edit}
                      pressHandler={_handleEditEventButton}
                    />
                  ) : (
                    <Button
                      style={{
                        marginTop: 10,
                        marginBottom: 10,
                        borderRadius: 8,
                      }}
                      buttonText={languages.add_eventModal}
                      pressHandler={_handleAddEventPlace}
                    />
                  )}
                </ScrollView>
              ) : (
                <View
                  style={{
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    backgroundColor: theme.navigator,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                  }}
                >
                  {places.map((place, index) => (
                    <TouchableOpacity
                      style={{ marginLeft: 20, marginBottom: 20 }}
                      key={index}
                      onPress={() => {
                        EventPlaceRef.current = place;
                        if (!buttonEdit) {
                          _handleAddEventPlace();
                          return;
                        } else {
                          _handleEditEventButton();
                        }
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: 30,
                            height: 30,
                            tintColor: "#fff",
                            marginRight: 10,
                          }}
                          source={itemIcons[index]}
                        />
                        <Label style={{ ...styles.label }}>{place}</Label>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
      <AdBanner />
    </GestureRecognizer>
  );
};

export default DreamEvent;
