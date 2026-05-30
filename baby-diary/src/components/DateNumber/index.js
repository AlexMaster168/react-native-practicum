import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import moment from "moment";
import { useSelector } from "react-redux";
import { styles } from "./style";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { accent } from "../../core/colors";
import useDeviceWidth from "../../hooks/useDeviceWidth";

const DateNumber = ({ date, setDate, theme, maxDate }) => {
  const { blockWidth } = useDeviceWidth();
  const languages = useSelector(({ app }) => app.languages);
  const activeLanguage = useSelector(({ app }) => app.activeLanguage);
  const currentTheme = useSelector(({ app }) => app.activeThemeName);
  const [show, setShow] = useState(false);
  // console.log(date, '🖤');
  const _changeDate = (type) => {
    // изменяет дату на 1 день в зависимости от type (prev || next)
    if (type === "next") {
      //if (!(date.format("DD MMM") === moment().local().format("DD MMM"))) {

      setDate(moment(date.add(1, "days")));
      //}
    } else {
      setDate(moment(date.subtract(1, "days")));
    }
  };

  return (
    <View
      style={{
        ...styles.date,
        marginTop: 10,
        width: blockWidth >= 450 ? 700 : "100%",
      }}
    >
      <View
        style={{
          top: "-25%",
          left: "20%",
          width: blockWidth,
          height: 300,
          position: "absolute",
          zIndex: -10,
        }}
      >
        <Image
          style={{
            width: blockWidth >= 450 ? 250 : 203,
            zIndex: -10,
            position: "absolute",
            top: `${(-10 / blockWidth) * 100}%`,
            left: `${
              blockWidth >= 450
                ? (50 / blockWidth) * 100
                : (10 / blockWidth) * 100
            }%`,
          }}
          source={require("../../images/clouds.png")}
        />
        <Image
          style={{
            zIndex: -10,
            position: "absolute",
            top: `${
              blockWidth >= 450
                ? (-20 / blockWidth) * 100
                : (-30 / blockWidth) * 100
            }%`,
            left: `${
              blockWidth >= 450
                ? (50 / blockWidth) * 100
                : (-65 / blockWidth) * 100
            }%`,
          }}
          source={require("../../images/sky_stars.png")}
        />
      </View>

      <DateTimePickerModal
        isVisible={show}
        date={new Date(date)}
        maximumDate={maxDate}
        mode="date"
        onConfirm={(date) => {
          setShow(false);
          setDate(date);
        }}
        onCancel={() => setShow(false)}
      />
      <TouchableOpacity
        style={{ width: 30, height: 30, paddingTop: 10, marginLeft: 20 }}
        onPress={() => _changeDate("prev")}
      >
        <Image
          // style={{ ...style.Icon, tintColor: theme.text }}
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
              ? "rgba(256, 256, 256, 0.6)"
              : "rgba(56, 73, 125, 0.8)",
        }}
        onPress={() => setShow(true)}
      >
        <Text
          style={{
            color: theme && theme.text,
            fontWeight: "bold",
            fontSize: 15,
            textAlign: "center",
            width: 100,
          }}
        >
          {date.locale(activeLanguage).format("DD") ===
          moment().local().format("DD")
            ? languages.today
            : date.locale(activeLanguage).format("DD") ===
              moment().local().add(1, "days").format("DD")
            ? languages.tomorrow
            : date.locale(activeLanguage).format("DD") ===
              moment().local().subtract(1, "days").format("DD")
            ? languages.yesterday
            : date.locale(activeLanguage).format("dddd")}
        </Text>
        <Text style={{ ...styles.textDay, color: theme && theme.text }}>
          {date.locale(activeLanguage).format("DD MMMM")}
        </Text>
      </TouchableOpacity>
      <View style={styles.buttonsRight}>
        <TouchableOpacity
          disabled={moment(date).add(1, "day").toDate() > maxDate}
          onPress={() => _changeDate("next")}
          style={{ width: 30, height: 30, paddingTop: 10 }}
        >
          <Image
            style={[
              // style.Icon,
              {
                tintColor: currentTheme === "light" ? accent : "",
                transform: [{ rotate: "180deg" }],
              },
              // {
              //   tintColor: theme.text,
              // },
            ]}
            source={require("../../images/icons/ic_arrow_left.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DateNumber;
const style = StyleSheet.create({
  Icon: {
    width: 32,
    height: 32,
    tintColor: "#fff",
  },
});

// { date.locale(activeLanguage).format("dddd") === moment().local(activeLanguage).format("dddd") ? date.locale(activeLanguage).format("dddd") : console.log(moment().local().format("DD MMM")) }
