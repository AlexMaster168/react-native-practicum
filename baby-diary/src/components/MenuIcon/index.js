import React from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";

const MenuIcon = () => {
  const theme = useSelector(({ app }) => app.activeTheme);
  return (
    <Text
      style={{
        color: theme.text,
        padding: 5,
        fontSize: 20,
        marginLeft: 5,
        fontWeight: "bold",
      }}
    >
      ☰
    </Text>
  );
};

export default MenuIcon;
