import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import { styles } from "./styles";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const deviceWidth = Dimensions.get("window").width;

const TimeItem = ({
  style,
  type,
  time,
  date: initDate,
  minDate,
  maxDate,
  updateDreamTime,
  theme,
  languages,
  timeOfDay,
}) => {
  const activeLanguage = useSelector(({ app }) => app.activeLanguage);
  // const { navigate } = useNavigation();
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(initDate);
  const [mode, setMode] = useState("time");
  const dispatch = useDispatch();
  // console.log("timeItem date: ", date, type);

  useEffect(() => {
    setDate(initDate);
  }, [initDate]);

  const showModal = (mode) => {
    setMode(mode);
    setShow(true);
  };

  const handleConfirm = (date) => {
    setShow(false);
    const dateType = `${type}${[...mode]
      .map((letter, index) => (index === 0 ? letter.toUpperCase() : letter))
      .join("")}`;
    const dateString =
      mode === "time" ? moment(date).format("HH:mm") : moment(date);
    if (mode === "date") {
      setDate(moment(date));
    }
    updateDreamTime(dateType, dateString);
    // if (mode === 'date') {
    //   dispatch(setDateSuccess(moment(date)));
    // }
  };

  return (
    <View style={{ ...style, ...styles.styledBorder, width: deviceWidth - 40 }}>
      <DateTimePickerModal
        isVisible={show}
        date={new Date(date)}
        minimumDate={minDate || null}
        maximumDate={maxDate || new Date()}
        is24Hour={true}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={() => setShow(false)}
      />
      <TouchableOpacity
        style={{
          width: deviceWidth / 2 - 25,
          backgroundColor: theme.navigator,
          borderRadius: 10,
          padding: 10,
          paddingHorizontal: 0,
        }}
        onPress={() =>
          //   {
          //   navigate('SetTime', {
          //     type: type === 'start' ? 'startTime' : 'endTime',
          //     updateDreamTime,
          //   });
          // }
          showModal("time")
        }
      >
        <Text
          style={[
            { fontSize: 24, color: theme.text, textAlign: "center" },
            !time && styles.disabledText,
          ]}
        >
          {time
            ? typeof time === "object"
              ? time.format("HH:mm")
              : time
            : languages.time}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: deviceWidth / 2 - 25,
          backgroundColor: theme.navigator,
          borderRadius: 10,
          padding: 10,
          paddingHorizontal: 0,
        }}
        onPress={() => showModal("date")}
      >
        <Text
          style={[
            { fontSize: 24, color: theme.text, textAlign: "center" },
            !date && styles.disabledText,
          ]}
        >
          {date ? moment(date).format("DD MMM") : languages.date}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TimeItem;
