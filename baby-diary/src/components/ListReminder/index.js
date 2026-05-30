import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { styles } from "./styles";
import moment from "moment";
import { getValueIfNotZero } from "../../utils/timeValues";

const ListReminder = ({
  onReminderDelete,
  languages,
  reminder,
  theme,
  onConfirmDeleting,
  lastItem,
}) => {
  const [positionY, setPositionY] = useState(null); // save position of component to show modal at the position

  const activeLanguage = useSelector(({ app }) => app.activeLanguage);

  const [rest, setRest] = useState(
    moment(reminder.notifTime).diff(moment()) > 0
      ? moment(reminder.notifTime).diff(moment())
      : 0
  );
  useEffect(() => {
    const id = setInterval(() => {
      const diff = moment(reminder.notifTime).diff(moment());
      if (diff < 0) {
        console.log("deleting", reminder);
        onReminderDelete(reminder.id);
      } else {
        setRest(moment(diff).toDate().getTime());
      }
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const onLongPress = () => {
    if (typeof onConfirmDeleting === "function") {
      onConfirmDeleting({
        visible: true,
        id: reminder.id,
        positionY: positionY,
      });
    }
  };

  const restToString = () => {
    // считает время до уведомления
    const [hh, mm] = moment(rest).utc().format(`HH:mm`).split(":").map(Number);
    return !hh && !mm
      ? languages.less_minute
      : `${getValueIfNotZero(hh, languages.hours[1])} ${getValueIfNotZero(
          mm,
          languages.minutes[1]
        )}`;
  };

  return (
    <TouchableOpacity
      onLayout={(event) => {
        setPositionY(event.nativeEvent.layout.y);
      }}
      style={{ marginBottom: lastItem ? 50 : 10 }}
      onLongPress={onLongPress}
    >
      <View
        style={{
          ...styles.reminder_container,
          backgroundColor: theme.navigator,
        }}
      >
        <View style={styles.reminder}>
          <Text style={{ ...styles.text_reminder, color: theme.text }}>
            {reminder.notificationType}
          </Text>
          <Text
            style={{
              fontStyle: "italic",
              ...styles.text_reminder,
              color: theme.text,
              fontSize: 15,
              opacity: 0.8,
            }}
          >
            {languages.rest}
            {restToString()}
          </Text>
        </View>
        <View>
          <Text
            style={{
              ...styles.text_reminder,
              color: theme.text,
              fontSize: 15,
            }}
          >
            {reminder.time}{" "}
            {!moment(reminder.notifTime).isSame(moment(), "day")
              ? moment(reminder.notifTime)
                  .locale(activeLanguage)
                  .format("DD MMMM")
              : null}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListReminder;
