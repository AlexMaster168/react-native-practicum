import React from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";
import { styles } from "./styles";

const _styles = (focused, style, tag) => {
  return {
    ...style,
    ...styles.placeLabel,
    ...(focused && styles.focused),
    ...(tag && { backgroundColor: tag }),
  };
};

const Label = ({ style, place, focused, children, tag, languages, feed }) => {
  const theme = useSelector(({ app }) => app.activeTheme);
  return (
    <Text
      style={{
        backgroundColor: !focused ? theme.navigator : tag ? tag : "#DCCFFF",
        ..._styles(focused, style, tag),
        color: focused && !tag ? "#333" : theme.text,
        textAlign: "center",
      }}
    >
      {feed && languages.count_feeding + ": "}
      {children && children}
      {place && languages?.sleeping_places_value[place.toLowerCase()]
        ? languages.sleeping_places_value[place.toLowerCase()]
        : place}
    </Text>
  );
};

export default Label;
