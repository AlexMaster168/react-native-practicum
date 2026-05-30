import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { calcTimePeriod, periodToString } from "../../../utils/calcTime";
import { getDateFromTimeAndDate } from "../../../utils/timeValues";
import { styles } from "../style";

const PeriodCalculator = ({
  setResult,
  state,
  languages,
  theme,
  setCalculatorValues,
}) => {
  const [timeStart, setTimeStart] = useState(state.timeStart); // start time
  const [dateStart, setDateStart] = useState(state.dateStart); // start date
  const [timeEnd, setTimeEnd] = useState(state.timeEnd); // end time
  const [dateEnd, setDateEnd] = useState(state.dateEnd); // end date

  const [showTimeStart, setShowTimeStart] = useState(false); // boolean to show start time modal
  const [showDateStart, setShowDateStart] = useState(false); // boolean to show start date modal
  const [showTimeEnd, setShowTimeEnd] = useState(false); // boolean to show end time modal
  const [showDateEnd, setShowDateEnd] = useState(false); // boolean to show end date modal

  const onChangeStartTime = (selectedDate) => {
    // changing states on start time change
    setShowTimeStart(false);
    setTimeStart(selectedDate);
    setCalculatorValues((prevValues) => ({
      ...prevValues,
      period: {
        ...prevValues.period,
        timeStart: selectedDate,
      },
    }));
  };
  const onChangeStartDate = (selectedDate) => {
    // changing states on start date change
    setShowDateStart(false);
    setDateStart(selectedDate);
    setCalculatorValues((prevValues) => ({
      ...prevValues,
      period: {
        ...prevValues.period,
        dateStart: selectedDate,
      },
    }));
  };

  const onChangeEndTime = (selectedDate) => {
    // changing states on end time change
    setShowTimeEnd(false);
    setTimeEnd(selectedDate);
    setCalculatorValues((prevValues) => ({
      ...prevValues,
      period: {
        ...prevValues.period,
        timeEnd: selectedDate,
      },
    }));
  };
  const onChangeEndDate = (selectedDate) => {
    // changing states on end date change
    setShowDateEnd(false);
    setDateEnd(selectedDate);
    setCalculatorValues((prevValues) => ({
      ...prevValues,
      period: {
        ...prevValues.period,
        dateEnd: selectedDate,
      },
    }));
  };

  useEffect(() => {
    // any state changes => recount
    const startDate = getDateFromTimeAndDate(timeStart, dateStart);
    const endDate = getDateFromTimeAndDate(timeEnd, dateEnd);

    const timePeriod = calcTimePeriod(languages, startDate, endDate);

    setResult(
      typeof timePeriod === "string"
        ? timePeriod
        : periodToString(timePeriod, languages)
    );
  }, [timeStart, timeEnd, dateStart, dateEnd]);

  return (
    <View>
      <DateTimePickerModal
        isVisible={showTimeStart}
        testID="timeStartPicker"
        date={timeStart}
        mode="time"
        is24Hour={true}
        confirmTextIOS={languages.confirm}
        cancelTextIOS={languages.cancel}
        onConfirm={onChangeStartTime}
        onCancel={() => setShowTimeStart(false)}
      />
      <DateTimePickerModal
        isVisible={showDateStart}
        testID="dateStartPicker"
        date={dateStart}
        mode="date"
        confirmTextIOS={languages.confirm}
        cancelTextIOS={languages.cancel}
        onConfirm={onChangeStartDate}
        onCancel={() => setShowDateStart(false)}
      />

      <DateTimePickerModal
        isVisible={showTimeEnd}
        testID="timeEndPicker"
        date={timeEnd}
        mode="time"
        confirmTextIOS={languages.confirm}
        cancelTextIOS={languages.cancel}
        is24Hour={true}
        onConfirm={onChangeEndTime}
        onCancel={() => setShowTimeEnd(false)}
      />
      <DateTimePickerModal
        isVisible={showDateEnd}
        testID="dateEndPicker"
        date={dateEnd}
        confirmTextIOS={languages.confirm}
        cancelTextIOS={languages.cancel}
        mode="date"
        onConfirm={onChangeEndDate}
        onCancel={() => setShowDateEnd(false)}
      />

      <Text style={{ ...styles.text, color: theme.text }}>{languages.of}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: theme.navigator,
            color: theme.text,
          }}
          onPress={() => {
            setShowTimeStart(true);
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: theme.text,
            }}
          >{`${moment(timeStart).format("HH:mm")}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: theme.navigator,
            color: theme.text,
          }}
          onPress={() => {
            setShowDateStart(true);
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: theme.text,
            }}
          >{`${moment(dateStart).format("DD MMMM")}`}</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ ...styles.text, color: theme.text }}>{languages.to}</Text>
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
          onPress={() => {
            setShowTimeEnd(true);
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: theme.text,
            }}
          >{`${moment(timeEnd).format("HH:mm")}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: theme.navigator,
            color: theme.text,
          }}
          onPress={() => {
            setShowDateEnd(true);
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: theme.text,
            }}
          >{`${moment(dateEnd).format("DD MMMM")}`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PeriodCalculator;
