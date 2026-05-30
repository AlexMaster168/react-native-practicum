import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AddChild, ChildrenScreen } from "../../screens";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MenuIcon } from "../../components";

const { Navigator, Screen } = createStackNavigator();

const screens = (languages, navigation, dispatch, theme) => [
  {
    name: "ChildrenScreen",
    component: ChildrenScreen,
    options: {
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MenuIcon />
        </TouchableOpacity>
      ),
      title: `${languages.children}`,
    },
  },
  {
    name: "AddChild",
    component: AddChild,
    options: { title: `${languages.adding_child}` },
  },
];

const ChildrenNavigator = () => {
  const languages = useSelector(({ app }) => app.languages);
  const theme = useSelector(({ app }) => app.activeTheme);
  const dispatch = useDispatch();
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
      {screens(languages, navigation, dispatch, theme).map((screen, index) => (
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

export default ChildrenNavigator;
