import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import plus from "../../images/icons/ic_plus.png";
import delet from "../../images/icons/ic_delete.png";
import { accent } from "../../core/colors";
import { styles } from "./styles";
import { Label, Button, CenterBlock } from "../../components";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import AdBanner from "../../components/AdBanner";
import ListReminder from "../../components/ListReminder";
import { ConfirmDelete } from "../../components/ConfirmDeleteModal";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../../utils/notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  addReminder,
  removeReminder,
  setReminders,
  setReminders as setStoreReminders,
} from "../../redux/reducers/directoryReducer";

const deviceWidth = Dimensions.get("window").width;

const RemindersScreen = ({ languages, theme, reminders }) => {
  const dispatch = useDispatch();

  const [rem, setRem] = useState(reminders);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync(languages).then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  const [visibleModal, setVisibleModal] = useState(false);
  const notificationType = [
    { title: languages.babys_bedtime, value: "bedtime" },
    { title: languages.babys_wakingUp, value: "wakeUP" },
  ];
  const alarmType = [
    { title: languages.interval, value: "interval" },
    { title: languages.time, value: "time" },
  ];

  const [activeNotification, setActiveNotification] = useState(
    notificationType[0].value
  );
  const [activeAlarm, setActiveAlarm] = useState(alarmType[0].value);

  const activeLanguage = useSelector(({ app }) => app.activeLanguage);
  const [time, setTime] = useState(new Date()); // interval
  const [intervalTime, setIntervalTime] = useState(new Date()); // interval time
  const [showTime, setShowTime] = useState(false); // boolean to show interval modal

  const [date, setDate] = useState(new Date()); // date
  const [showDate, setShowDate] = useState(false); // boolean to show date modal

  const [dateTime, setDateTime] = useState(new Date()); // datetime
  const [showDateTime, setShowDateTime] = useState(false); // boolean to show time modal

  const [confirmDeleting, setConfirmDeleting] = useState({
    visible: false,
    id: null,
    positionY: null,
  }); // show modal to exebt
  const [scrolled, setScrolled] = useState(0);
  const _onChangeDateTime = (selectedDateTime) => {
    // handle time change
    setShowDateTime(false);
    setDateTime(selectedDateTime);
  };
  const _onChangeDate = (selectedDate) => {
    // handle date change
    setShowDate(false);
    setDate(selectedDate);
  };
  const _onChangeTime = (selectedTime) => {
    // handle interval change
    setShowTime(false);
    setIntervalTime(selectedTime);
    const momentTime = moment(selectedTime);
    const time = moment()
      .add(momentTime.minute(), "minute")
      .add(momentTime.hour(), "hour")
      .toDate()
      .getTime();

    setTime(time);
  };

  const getDateTimeFromTimeAndDate = () => {
    // returns reminder time
    const dateTimeMoment = moment(+dateTime);
    const dateMoment = moment(+date);

    return moment()
      .set("date", dateMoment.date())
      .set("year", dateMoment.year())
      .set("month", dateMoment.month())
      .set("hour", dateTimeMoment.hour())
      .set("minute", dateTimeMoment.minute())
      .set("second", 0)
      .toDate()
      .getTime();
  };

  const isNow = (time) => {
    return (
      new Date(new Date(time).setSeconds(0)).setMilliseconds(0) ===
      new Date(new Date().setSeconds(0)).setMilliseconds(0)
    );
  };

  const handleAdd = async () => {
    // handle add reminder
    let scheduleTime;
    if (activeAlarm === "interval") {
      if (isNow(time)) {
        Alert.alert(languages.wrong_input, languages.input_time_less, [
          {
            style: "default",
            text: "OK",
          },
        ]);
        return;
      }
      scheduleTime = +time;
    } else {
      scheduleTime = getDateTimeFromTimeAndDate();
      if (scheduleTime < new Date()) {
        Alert.alert(languages.wrong_input, languages.input_time_less, [
          {
            style: "default",
            text: "OK",
          },
        ]);
        return;
      }
    }
    console.log("👕👕👔", scheduleTime);
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title:
          activeNotification === "bedtime"
            ? languages.sleep_reminder
            : languages.waking_up_reminder,
        body:
          activeNotification === "bedtime"
            ? languages.time_to_put_bed
            : languages.time_to_wake_up,
        data: { data: "Big data hehe" },
        priority: "high",
      },
      trigger: scheduleTime,
    });
    const date = Date.now();

    const newReminder = {
      id: date,
      notificationType:
        activeNotification === "bedtime"
          ? languages.time_to_put_bed
          : languages.time_to_wake_up,
      time: moment(scheduleTime).format("HH:mm"),
      date: moment(scheduleTime).format("DD MMMM"),
      type: activeAlarm,
      notifTime: scheduleTime,
    };
    await AsyncStorage.setItem(
      date + "_notification",
      JSON.stringify(newReminder)
    );

    setVisibleModal(false);
    setRem((rem) => [...rem, newReminder]);
    dispatch(setReminders([...rem, newReminder]));
  };
  useEffect(() => {
    if (!reminders.length) {
      setRem([]);
    }
  }, [reminders]);

  const handleDelete = async (id, positionY) => {
    const notificationKey = id + "_notification";
    const notificationId = await AsyncStorage.getItem(notificationKey);
    await AsyncStorage.removeItem(notificationKey);
    const newReminders = rem.filter((reminder) => reminder.id !== id) || [];
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    dispatch(setReminders(newReminders));
    setRem((rem) => rem.filter((reminder) => reminder.id !== id) || []);
  };

  return (
    <React.Fragment>
      <ConfirmDelete
        setConfirmDeleting={setConfirmDeleting}
        confirmDeleting={confirmDeleting}
        handleDelete={handleDelete}
        scrolled={scrolled}
        theme={theme}
        languages={languages}
        reminder={rem.find((item) => item.id === confirmDeleting.id)}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
          padding: 10,
        }}
      >
        {rem.length ? (
          <ScrollView
            onScroll={(event) => setScrolled(event.nativeEvent.contentOffset.y)}
          >
            {rem
              .sort((a, b) => a.notifTime - b.notifTIme)
              .map((reminder, index) => (
                <ListReminder
                  theme={theme}
                  reminder={reminder}
                  languages={languages}
                  onReminderDelete={handleDelete}
                  onConfirmDeleting={setConfirmDeleting}
                  lastItem={rem.length - 1 === index}
                  key={reminder.id}
                />
              ))}
          </ScrollView>
        ) : (
          <CenterBlock>
            <Text style={{ color: theme.text }}>
              {languages.emty_reminders}
            </Text>
          </CenterBlock>
        )}
        <Modal
          transparent
          hideModalContentWhileAnimating
          isVisible={visibleModal}
          onBackButtonPress={() => setVisibleModal(false)}
          onBackdropPress={() => setVisibleModal(false)}
          style={{ margin: 0 }}
        >
          <View
            style={{
              ...styles.container_module,
              backgroundColor: theme.navigator,
            }}
          >
            <View style={styles.header_modal}>
              <Text style={{ ...styles.text, color: theme.text }}>
                {languages.new_reminders}
              </Text>
            </View>
            <Text
              style={{
                ...styles.text,
                fontSize: 15,
                color: theme.text,
                opacity: 0.8,
                marginVertical: 5,
              }}
            >
              {languages.type_reminders}
            </Text>
            <View style={{ flexDirection: "row", marginVertical: 5 }}>
              {notificationType.map(({ value, title }, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setActiveNotification(value)}
                >
                  <Label
                    style={{
                      fontSize: 18,
                      textAlign: "center",
                      color: theme.text,
                      width: deviceWidth / 2 - 20,
                    }}
                    focused={value === activeNotification}
                    place={title}
                  ></Label>
                </TouchableOpacity>
              ))}
            </View>
            <Text
              style={{
                ...styles.text,
                fontSize: 15,
                color: theme.text,
                opacity: 0.8,
                marginVertical: 5,
              }}
            >
              {languages.alarm_type}
            </Text>
            <View style={{ flexDirection: "row", marginVertical: 5 }}>
              {alarmType.map(({ value, title }, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setActiveAlarm(value)}
                >
                  <Label
                    style={{
                      fontSize: 18,
                      textAlign: "center",
                      width: deviceWidth / 2 - 20,
                    }}
                    focused={value === activeAlarm}
                    place={title}
                  ></Label>
                </TouchableOpacity>
              ))}
            </View>
            <Text
              style={{
                ...styles.text,
                fontSize: 15,
                color: theme.text,
                opacity: 0.8,
                marginVertical: 5,
              }}
            >
              {activeAlarm === "interval"
                ? languages.work_reminder_interval
                : languages.work_reminder_time}
            </Text>
            <View
              style={{
                paddingVertical: 10,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <DateTimePickerModal
                isVisible={showTime}
                testID="timePicker"
                date={new Date(intervalTime)}
                locale="en_GB"
                mode="time"
                is24Hour={true}
                onConfirm={_onChangeTime}
                onCancel={() => setShowTime(false)}
              />
              <DateTimePickerModal
                isVisible={showDateTime}
                testID="dateTimePicker"
                date={dateTime}
                mode="time"
                is24Hour={true}
                onConfirm={_onChangeDateTime}
                onCancel={() => setShowDateTime(false)}
              />
              <DateTimePickerModal
                isVisible={showDate}
                testID="datePicker"
                date={date}
                mode="date"
                is24Hour={true}
                onConfirm={_onChangeDate}
                onCancel={() => setShowDate(false)}
              />
              {activeAlarm === "time" ? (
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: accent,
                      borderRadius: 5,
                      width: deviceWidth / 2 - 30,
                    }}
                    onPress={() => {
                      setShowDateTime(true);
                    }}
                  >
                    <Text
                      style={{
                        ...styles.text,
                        color: theme.text,
                        textAlign: "center",
                      }}
                    >{`${moment(dateTime).format("HH:mm")}`}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: accent,
                      borderRadius: 5,
                      width: deviceWidth / 2 - 30,
                    }}
                    onPress={() => {
                      setShowDate(true);
                    }}
                  >
                    <Text
                      style={{
                        ...styles.text,
                        color: theme.text,
                        textAlign: "center",
                      }}
                    >{`${moment(date)
                      .locale(activeLanguage)
                      .format("D MMM")}`}</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: accent,
                    borderRadius: 5,
                    width: deviceWidth / 2 - 20,
                  }}
                  onPress={() => {
                    setShowTime(true);
                  }}
                >
                  <Text
                    style={{
                      ...styles.text,
                      color: theme.text,
                      textAlign: "center",
                    }}
                  >{`${moment(intervalTime).format("HH:mm")}`}</Text>
                </TouchableOpacity>
              )}
            </View>

            <View>
              <Button buttonText={languages.add} pressHandler={handleAdd} />
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={{
            color: theme.text,
            alignSelf: "flex-end",
            position: "absolute",
            bottom: 0,
            padding: 20,
          }}
          onPress={() => setVisibleModal(!visibleModal)}
        >
          <Image source={plus} style={styles.img_plus} />
        </TouchableOpacity>
      </View>
      <AdBanner />
    </React.Fragment>
  );
};
export default RemindersScreen;
