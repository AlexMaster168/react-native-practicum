import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { setReminders } from "../../redux/reducers/directoryReducer";
import * as Notifications from "expo-notifications";
import { CalculatorScreen } from "../../screens";
import { MenuIcon } from "../../components";

export const { Navigator, Screen } = createStackNavigator();

const screens = (languages, navigation, theme) => [
  {
    name: "CalculatorScreen",
    component: CalculatorScreen,
    options: {
      headerStyle: {
        backgroundColor: theme.background,
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MenuIcon />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
          {languages.calculator}
        </Text>
      ),
    },
  },
];

const CalculatorNavigation = () => {
  const languages = useSelector(({ app }) => app.languages);
  const theme = useSelector(({ app }) => app.activeTheme);
  const navigation = useNavigation();

  return (
    <Navigator
      backBehavior="history"
      screenOptions={{
        presentation: "transparentModal",
        gestureEnabled: true,
        gestureDirection: "horizontal",
        backBehavior: "history",
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.text,
      }}
    >
      {screens(languages, navigation, theme).map((screen, index) => (
        <Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Navigator>
  );
};

export default CalculatorNavigation;
