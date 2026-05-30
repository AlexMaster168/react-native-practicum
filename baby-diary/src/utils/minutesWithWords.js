import React from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";

export const timeWithWords = (languages, time, type, br = " ", theme) => {
  const sTime = time.toString();
  if (sTime.startsWith("0") && sTime.endsWith("0")) return "";
  if (sTime.endsWith("1")) {
    return (
      <>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 11,
            color: theme.text,
          }}
        >
          {time}
        </Text>
        <Text style={{ color: theme.text, fontSize: 8 }}>
          {languages[type][0]}
        </Text>
      </>
    );
  } else if (sTime.endsWith("2") || sTime.endsWith("3") || sTime.endsWith("4"))
    return (
      <>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 11,
            color: theme.text,
          }}
        >
          {time}
        </Text>
        <Text style={{ color: theme.text, fontSize: 8 }}>
          {languages[type][1]}
        </Text>
      </>
    );
  else
    return (
      <>
        <Text style={{ fontWeight: "bold", fontSize: 11, color: theme.text }}>
          {time}
        </Text>
        <Text style={{ color: theme.text, fontSize: 8 }}>
          {languages[type][1]}
        </Text>
      </>
    );
};
