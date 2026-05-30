import React, { useState } from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { styles } from "./styles";
import { accent } from "../../core/colors";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import { setChartRanges } from "../../redux/reducers/statisticsReducer";

const SwitchMonth = ({
  setMinDateLimit,
  setMaxDateLimit,
  tableMode,
  theme,
}) => {
  const activeLanguage = useSelector(({ app }) => app.activeLanguage);
  const chartRanges = useSelector(({ statistics }) => statistics.chartRanges);
  // const [dateStart, setDateStart] = useState(prevActiveDate.toDate());
  // const [dateEnd, setDateEnd] = useState(nextActiveDate.toDate());
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setDateStart(prevActiveDate.toDate());
  //   setDateEnd(nextActiveDate.toDate());
  // }, [prevActiveDate, nextActiveDate]);

  const handleConfirmStart = (selectedDate) => {
    // dispatch(setPrevActiveDate(moment(date)));
    console.log(moment(selectedDate).utc().toDate(), "INVALID 💊");
    dispatch(
      setChartRanges({
        ...chartRanges,
        [tableMode]: {
          ...chartRanges[tableMode],
          start:
            moment(selectedDate).format("L") ===
            moment(chartRanges[tableMode].end).format("L")
              ? moment(selectedDate).subtract(1, "day").toDate()
              : selectedDate,
        },
      })
    );
    // dispatch(setWeeksTC(selectedDate, dateEnd));
    // setDateStart(selectedDate);
    setShowStart(false);
  };

  const handleConfirmEnd = (selectedDate) => {
    // dispatch(setNextActiveDate(moment(date)));
    // console.log(selectedDate, 'INVALID 💊');
    dispatch(
      setChartRanges({
        ...chartRanges,
        [tableMode]: {
          ...chartRanges[tableMode],
          end: selectedDate,
        },
      })
    );
    // dispatch(setWeeksTC(dateStart, date));
    // setDateEnd(date);
    setShowEnd(false);
  };

  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  // const daysRange = moment(endingDate).format("DD") - moment(startingDate).format("DD");

  // const onChange = (selectedDate) => {
  //   const currentDate = selectedDate;
  //   const daysRange =
  //     moment().local().format('DD') - moment(currentDate).format('DD');
  //   console.log(daysRange);
  //   setWeeksTC(daysRange);
  // };

  // *******************************************************************

  // let _startDay;
  // if (weeks.length > 7) {
  //   _startDay = moment(weeks[24]).format('DD');
  // } else {
  //   _startDay = moment(weeks[0]).format('DD');
  // }

  // const _endDay = moment(weeks[weeks.length - 1]).format('DD');

  const handlePress = (type) => {
    const { start: dateStart, end: dateEnd } = chartRanges[tableMode];
    const difference = moment(dateEnd).diff(dateStart);
    let start, end;
    if (type === "prev") {
      start = moment(moment(dateStart).diff(difference));
      end = moment(moment(dateEnd).diff(difference));
    } else {
      start = moment(moment(dateStart).add(difference, "millisecond"));
      const resultEnd = moment(moment(dateEnd).add(difference, "millisecond"));
      if (resultEnd.toDate() > new Date()) {
        end = moment(new Date());
      } else {
        end = moment(moment(dateEnd).add(difference, "millisecond"));
      }
    }
    // setDateStart(start.toDate());
    // setDateEnd(end.toDate());
    // dispatch(setPrevActiveDate(start));
    // dispatch(setNextActiveDate(end));
    // dispatch(setWeeksTC(start.toDate(), end.toDate()));
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
  const range = chartRanges[tableMode];
  return (
    <View style={{ ...styles.switchMonth, backgroundColor: theme.background }}>
      <TouchableOpacity onPress={() => handlePress("prev")}>
        <Image
          style={style.Icon}
          source={require("../../images/icons/ic_arrow_left.png")}
        />
      </TouchableOpacity>

      <View
        style={{
          marginTop: 5,
          alignItems: "center",
          backgroundColor: theme.navigator,
          width: "40%",
          borderRadius: 10,
          paddingVertical: 10,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
          onPress={() => {
            setShowStart(true);
          }}
        >
          <Text
            style={{
              ...styles.weekdays,
              color: theme.text,
              paddingBottom: 0,
              marginBottom: 0,
              fontWeight: "bold",
              marginRight: 5,
            }}
          >
            {moment(range.start).format("DD")}
          </Text>
          <Text style={{ ...styles.month, color: theme.text }}>
            {moment(range.start).locale(activeLanguage).format("MMMM")}
          </Text>
        </TouchableOpacity>
        <View>
          {/* START */}
          <DateTimePickerModal
            isVisible={showStart}
            testID="dateTimePicker"
            mode="date"
            date={setMinDateLimit(range.start, range.end, false)}
            minimumDate={setMinDateLimit(range.start, range.end)}
            maximumDate={setMinDateLimit(range.start, range.end, false)}
            onConfirm={handleConfirmStart}
            onCancel={() => setShowStart(false)}
          />
        </View>
      </View>

      <View
        style={{
          marginTop: 5,
          alignItems: "center",
          backgroundColor: theme.navigator,
          width: "40%",
          borderRadius: 10,
          paddingVertical: 10,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => {
            setShowEnd(true);
          }}
        >
          <Text
            style={{
              ...styles.weekdays,
              color: theme.text,
              fontWeight: "bold",
              marginRight: 5,
            }}
          >
            {moment(range.end).format("DD")}
          </Text>
          <Text style={{ ...styles.month, color: theme.text }}>
            {moment(range.end).locale(activeLanguage).format("MMMM")}
          </Text>
        </TouchableOpacity>
        <View>
          {/* END */}
          <DateTimePickerModal
            isVisible={showEnd}
            testID="dateTimePicker"
            mode="date"
            minimumDate={setMaxDateLimit(range.start, range.end)}
            maximumDate={setMaxDateLimit(range.start, range.end, false)}
            onConfirm={handleConfirmEnd}
            onCancel={() => setShowEnd(false)}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => handlePress("next")}
        disabled={
          moment(range.end).format("DD MMM") === moment().format("DD MMM")
        }
      >
        <Image
          style={[
            style.Icon,
            {
              transform: [{ rotate: "180deg" }],
            },
          ]}
          source={require("../../images/icons/ic_arrow_left.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SwitchMonth;
const style = StyleSheet.create({
  Icon: {
    width: 24,
    height: 24,
    tintColor: accent,
  },
});
