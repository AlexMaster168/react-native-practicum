import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { setReminders } from "../../redux/reducers/directoryReducer";
import * as Notifications from "expo-notifications";
import { RemindersScreen } from "../../screens";
import { MenuIcon } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const { Navigator, Screen } = createStackNavigator();

const screens = (languages, navigation, theme, dispatch, reminders) => [
  {
    name: "RemindersScreen",
    component: RemindersScreen,
    options: {
      headerStyle: {
        backgroundColor: theme.background,
      },

      headerTintColor: theme.text,
      title: languages.reminders,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MenuIcon />
        </TouchableOpacity>
      ),
      headerRight: () => {
        return reminders.length ? (
          <TouchableOpacity
            onPress={async () => {
              await Notifications.cancelAllScheduledNotificationsAsync();
              for (const reminder of reminders) {
                await AsyncStorage.removeItem(reminder.id + "_notification");
              }
              dispatch(setReminders([]));
            }}
            style={{
              backgroundColor: theme.background,
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ color: theme.text }}>{languages.cancel_all}</Text>
          </TouchableOpacity>
        ) : null;
      },
    },
  },
];

const RemindersNavigator = () => {
  const languages = useSelector(({ app }) => app.languages);
  const theme = useSelector(({ app }) => app.activeTheme);
  const reminders = useSelector(({ directory }) => directory.reminders);
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
      {screens(languages, navigation, theme, dispatch, reminders).map(
        (screen, index) => (
          <Screen
            key={index}
            name={screen.name}
            component={screen.component}
            options={screen.options}
          />
        )
      )}
    </Navigator>
  );
};

export default RemindersNavigator;
