import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import moment from "moment";
import { useSelector } from "react-redux";

const DayItem = ({ day, padding, theme, ratioDiagram }) => {
  const date = moment(day);
  const activeLanguage = useSelector(({ app }) => app.activeLanguage);
  const currentTheme = useSelector(({ app }) => app.activeThemeName);

  return (
    <View>
      {ratioDiagram ? (
        <View style={{ ...styles.ratioDiagramDayItem }}>
          <Text style={{ ...styles.ratioDayNumber, color: "#f00" }}>
            {date.locale(activeLanguage).format("MM.DD")}
          </Text>
        </View>
      ) : (
        <View
          style={{
            ...styles.dayItem,
            // paddingHorizontal: padding,
            backgroundColor:
              currentTheme === "light"
                ? "rgba(256, 256, 256, 1)"
                : "rgba(56, 73, 125, 0.8)",
            // backgroundColor: "rgba(256, 256, 256, 1)",
            // backgroundColor: "#fff",
            width: 45,
            height: 45,
            borderRadius: 30,
          }}
        >
          <Text style={{ ...styles.dayNumber, color: theme.text }}>
            {date.date()}
          </Text>
          {/* <Text
            style={{
              ...styles.dayName,
              color: theme.text,
            }}
          >
            {date.locale(activeLanguage).format("ddd")}
          </Text> */}
        </View>
      )}
    </View>
  );
};

export default DayItem;
