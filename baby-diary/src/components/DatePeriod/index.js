import moment from "moment";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import { accent } from "../../core/colors";
import { setChartRanges } from "../../redux/reducers/statisticsReducer";
import { styles } from "./styles";

const DatePeriod = ({ tableMode }) => {
  // компонент для статистики типа "Сводка"
  const [show, setShow] = useState(false);
  // const [date, setDate] = useState(weeks[weeks.length - 1]);
  const chartRanges = useSelector(({ statistics }) => statistics.chartRanges);
  const theme = useSelector(({ app }) => app.activeTheme);
  const currentTheme = useSelector(({ app }) => app.activeThemeName);
  const activeLanguage = useSelector(({ app }) => app.activeLanguage);

  const dispatch = useDispatch();

  const handleConfirm = (selectedDate) => {
    setShow(false);
    const start = moment(selectedDate).subtract(6, "day").toDate();

    dispatch(
      setChartRanges({
        ...chartRanges,
        [tableMode]: {
          start,
          end: selectedDate,
        },
      })
    );
  };

  const handleArrowPress = (type) => {
    const { start: dateStart, end: dateEnd } = chartRanges[tableMode];
    const difference = moment(dateEnd).diff(dateStart);
    let start, end;
    if (type === "prev") {
      start = moment(moment(dateStart).diff(difference));
      end = moment(moment(dateEnd).diff(difference));
    } else {
      const resultEnd = moment(moment(dateEnd).add(difference, "millisecond"));
      if (resultEnd.toDate() > new Date()) {
        start = moment().subtract(6, "day");
        end = moment();
      } else {
        start = moment(dateStart).add(difference, "millisecond");
        end = moment(dateEnd).add(difference, "millisecond");
      }
    }
    dispatch(
      setChartRanges({
        ...chartRanges,
        [tableMode]: {
          start: start.toDate(),
          end: end.toDate(),
        },
      })
    );
  };
  return (
    <View
      style={{
        ...styles.date,
        marginTop: 20,
      }}
    >
      <Image
        style={{ zIndex: -1, position: "absolute", left: "15%" }}
        source={require("../../images/clouds.png")}
      />
      <Image
        style={{
          zIndex: -1,
          position: "absolute",
          position: "absolute",
          left: "15%",
        }}
        source={require("../../images/sky_stars.png")}
      />
      <DateTimePickerModal
        mode="date"
        value={chartRanges[tableMode].end}
        isVisible={show}
        maximumDate={new Date()}
        onConfirm={(date) => handleConfirm(date)}
        onCancel={() => setShow(false)}
      />
      <TouchableOpacity
        style={{ width: 30, height: 30, paddingTop: 10, paddingRight: 10 }}
        onPress={() => handleArrowPress("prev")}
      >
        <Image
          style={{
            tintColor: currentTheme === "light" ? accent : "",
          }}
          source={require("../../images/icons/ic_arrow_left.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...styles.textDate,
          backgroundColor:
            currentTheme === "light"
              ? "rgba(256, 256, 256, 0.8)"
              : "rgba(56, 73, 125, 0.5)",
          padding: 10,
          paddingVertical: 3,
          borderRadius: 25,
        }}
        onPress={() => setShow(true)}
      >
        <Text style={{ ...styles.textDay, color: theme.text }}>
          {moment(chartRanges[tableMode].start)
            .locale(activeLanguage)
            .format("DD")}{" "}
          -{" "}
          {moment(chartRanges[tableMode].end)
            .locale(activeLanguage)
            .format("DD")}
        </Text>
        <Text style={{ color: theme && theme.text }}>
          {moment(chartRanges[tableMode].end)
            .locale(activeLanguage)
            .format("MMM") !==
            moment(chartRanges[tableMode].start)
              .locale(activeLanguage)
              .format("MMM") &&
            `${moment(chartRanges[tableMode].start)
              .locale(activeLanguage)
              .format("MMM")} - `}
          {moment(chartRanges[tableMode].end)
            .locale(activeLanguage)
            .format("MMM")}
        </Text>
      </TouchableOpacity>
      <View style={styles.buttonsRight}>
        <TouchableOpacity
          style={{ width: 30, height: 30, paddingTop: 10, paddingLeft: 10 }}
          disabled={
            moment(chartRanges[tableMode].end)
              .locale(activeLanguage)
              .format("DD MMM") ===
            moment().locale(activeLanguage).format("DD MMM")
          }
          onPress={() => handleArrowPress("next")}
        >
          <Image
            style={{
              tintColor: currentTheme === "light" ? accent : "",

              // ...styles.icon,
              // backgroundColor: currentTheme === "dark" ? "red" : "#9180a8",
              transform: [{ rotate: "180deg" }],
            }}
            source={require("../../images/icons/ic_arrow_left.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default DatePeriod;
