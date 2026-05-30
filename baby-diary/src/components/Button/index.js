import { Text, View, Platform, TouchableNativeFeedback } from "react-native";
import React from "react";

import { styles } from "./styles";

const Button = ({ style, pressHandler, buttonText }) => {
  return (
    <TouchableNativeFeedback
      background={
        Platform.OS === "android"
          ? TouchableNativeFeedback.SelectableBackground()
          : ""
      }
      onPress={pressHandler}
    >
      <View style={{ ...styles.button, ...style }}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Button;
