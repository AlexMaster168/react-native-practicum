import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { calcTimeAndDateFromPeriod } from "../../../utils/calcTime";
import { getDateFromTimeAndDate } from "../../../utils/timeValues";
import { styles } from "../style";

const DateAndTimeCalculator = ({
  languages,
  theme,
  state,
  setResult,
  setCalculatorValues,
}) => {
  const [time, setTime] = useState(state.time); // time
  const [date, setDate] = useState(state.date); // date
  const [period, setPeriod] = useState(state.period); // time offset

  const [showTime, setShowTime] = useState(false); // boolean to show time modal
  const [showDate, setShowDate] = useState(false); // boolean to show date modal
  const [showPeriod, setShowPeriod] = useState(false); // boolean to show period modal

  const onTimeChange = (selectedTime) => {
    // changing states on time change
    setShowTime(false);
    setTime(selectedTime);
    setCalculatorValues((prevValues) => ({
      ...prevValues,
      dateAndTime: {
        ...prevValues.dateAndTime,
        time: selectedTime,
      },
    }));
  };
  const onDateChange = (selectedDate) => {
    // changing states on date change
    setShowDate(false);
    setDate(selectedDate);
    setCalculatorValues((prevValues) => ({
      ...prevValues,
      dateAndTime: {
        ...prevValues.dateAndTime,
        date: selectedDate,
      },
    }));
  };
  const onPeriodChange = (selectedPeriod) => {
    // changing states on period change
    setShowPeriod(false);
    setPeriod(selectedPeriod);
    setCalculatorValues((prevValues) => ({
      ...prevValues,
      dateAndTime: {
        ...prevValues.dateAndTime,
        period: selectedPeriod,
      },
    }));
  };

  useEffect(() => {
    // any state changes => recount
    const newDate = getDateFromTimeAndDate(time, date);
    setResult(
      calcTimeAndDateFromPeriod(
        newDate,
        moment(period).format("HH:mm").split(":")
      )
    );
  }, [time, date, period]);

  return (
    <View>
      <DateTimePickerModal
        isVisible={showTime}
        testID="timePicker"
        date={time}
        mode="time"
        confirmTextIOS={languages.confirm}
        cancelTextIOS={languages.cancel}
        is24Hour={true}
        onConfirm={onTimeChange}
        onCancel={() => setShowTime(false)}
      />
      <DateTimePickerModal
        isVisible={showDate}
        testID="datePicker"
        date={date}
        mode="date"
        confirmTextIOS={languages.confirm}
        cancelTextIOS={languages.cancel}
        onConfirm={onDateChange}
        onCancel={() => setShowDate(false)}
      />

      <DateTimePickerModal
        isVisible={showPeriod}
        testID="periodPicker"
        date={period}
        mode="time"
        confirmTextIOS={languages.confirm}
        cancelTextIOS={languages.cancel}
        is24Hour={true}
        onConfirm={onPeriodChange}
        onCancel={() => setShowPeriod(false)}
      />

      <Text
        style={{
          fontSize: 18,
          color: theme.text,
        }}
      >
        {languages.of}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: theme.navigator,
            color: theme.text,
          }}
          onPress={() => setShowTime(true)}
        >
          <Text
            style={{
              fontSize: 18,
              color: theme.text,
            }}
          >{`${moment(time).format("HH:mm")}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: theme.navigator,
            color: theme.text,
          }}
          onPress={() => setShowDate(true)}
        >
          <Text
            style={{
              fontSize: 18,
              color: theme.text,
            }}
          >{`${moment(date).format("DD MMMM")}`}</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ ...styles.text, color: theme.text }}>
        {languages.period}
      </Text>
      <TouchableOpacity
        style={{
          ...styles.button,
          width: "90%",
          alignSelf: "center",
          backgroundColor: theme.navigator,
          color: theme.text,
        }}
        onPress={() => setShowPeriod(true)}
      >
        <Text
          style={{
            fontSize: 18,
            color: theme.text,
          }}
        >{`${moment(period).format("HH:mm")}`}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DateAndTimeCalculator;
