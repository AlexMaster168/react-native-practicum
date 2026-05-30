import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { calcSumTime } from "../../../utils/calcTime";

import { styles } from "../style";
import { ScrollView } from "react-native-gesture-handler";

const SumCalculator = ({
  state: initDates,
  languages,
  theme,
  setResult,
  setCalculatorValues,
}) => {
  const activeLanguage = useSelector(({ app }) => app.activeLanguage);
  const [dates, setDates] = useState(initDates); // dates array

  const onHideTimeModal = (index) => {
    // changing states on modal hide
    const cloneDates = dates.slice();
    cloneDates[index].show = false;
    setDates(cloneDates);
    setCalculatorValues((prevVals) => ({ ...prevVals, sum: cloneDates }));
  };

  const onShowTimeModal = (index) => {
    // changing states on modal show
    const cloneDates = dates.slice();
    cloneDates[index].show = true;
    setDates(cloneDates);
    setCalculatorValues((prevVals) => ({ ...prevVals, sum: cloneDates }));
  };

  const onTimeSelect = (selectedTime, index) => {
    // changing states on time select
    const cloneDates = dates.slice();
    cloneDates[index].show = false;
    cloneDates[index].value = selectedTime;
    setDates(cloneDates);
    setCalculatorValues((prevVals) => ({ ...prevVals, sum: cloneDates }));
  };

  const onOperationChange = (index) => {
    // changing states on operation (+/-) select
    const cloneDates = dates.slice();
    cloneDates[index].operation =
      cloneDates[index].operation === "+" ? "-" : "+";
    setDates(cloneDates);
    setCalculatorValues((prevVals) => ({ ...prevVals, sum: cloneDates }));
  };

  const onAddNewTime = () => {
    // add new input
    const newVals = dates.concat({
      id: Date.now(),
      value: dates.length ? new Date(98, 1) : new Date(),
      operation: "+",
      show: false,
    });
    setDates(newVals);
    setCalculatorValues((prevVals) => ({
      ...prevVals,
      sum: newVals,
    }));
  };

  const onRemoveTime = (indexOfItemToRemove) => {
    // remove specific input
    const filteredVals = dates.filter(
      (_, index) => index !== indexOfItemToRemove
    );
    setDates(filteredVals);
    setCalculatorValues((prevVals) => ({
      ...prevVals,
      sum: filteredVals,
    }));
  };

  useEffect(() => {
    console.log(calcSumTime(dates));
    setResult(calcSumTime(dates));
  }, [dates]); // rerender on dates change
  return (
    <ScrollView style={{ height: "70%" }}>
      {dates.map((date, index) => (
        <View key={date.id}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <DateTimePickerModal
              isVisible={date.show}
              date={date.value}
              mode="time"
              is24Hour={true}
              confirmTextIOS={languages.confirm}
              cancelTextIOS={languages.cancel}
              onConfirm={(time) => onTimeSelect(time, index)}
              onCancel={() => onHideTimeModal(index)}
            />
            <TouchableOpacity
              style={{
                ...styles.button,
                flexBasis: "90%",
                backgroundColor: theme.navigator,
                color: theme.text,
              }}
              onPress={() => onShowTimeModal(index)}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: theme.text,
                }}
              >
                {date.value
                  ? moment(date.value).local(activeLanguage).format("HH:mm")
                  : languages.time}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onRemoveTime(index)}>
              <Text
                style={{
                  color: theme.text,
                  position: "relative",
                  padding: 5,
                  top: 5,
                }}
              >
                —
              </Text>
            </TouchableOpacity>
          </View>
          {index !== dates.length - 1 ? (
            <View>
              <TouchableOpacity onPress={() => onOperationChange(index)}>
                <Text
                  style={{
                    color: theme.text,
                    fontSize: 30,
                    textAlign: "center",
                  }}
                >
                  {date.operation}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      ))}
      <View>
        <TouchableOpacity onPress={onAddNewTime}>
          <Text
            style={{
              ...styles.text,
              color: "#e0a658",
              textAlign: "center",
              fontSize: 14,
            }}
          >
            {languages.add}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SumCalculator;
