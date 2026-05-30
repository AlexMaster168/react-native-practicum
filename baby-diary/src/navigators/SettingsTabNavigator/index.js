import React from "react";
import { SettingsGeneralScreen, SettingsStatisticsScreen } from "../../screens";
import { useSelector, useDispatch } from "react-redux";
const { Navigator, Screen } = createStackNavigator();
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import {
  SettingsStatisticsScreenDreams,
  PlacesScreen,
  EventSettingScreen,
  TagsScreen,
  SettingsGrafScreen,
  LanguagesScreen,
} from "../../screens";

import { Text, View, TouchableOpacity } from "react-native";
import {
  setDisableCountEvents,
  setDisableCountEventsDay,
  setDisableCountEventsNight,
} from "../../redux/reducers/directoryReducer";
import {
  setStatisticsDreams,
  setStatisticsSection,
} from "../../redux/reducers/appReducer";
import ThemeScreen from "../../screens/ThemeScreen";
import { MenuIcon } from "../../components";

const screens = (languages, navigation, dispatch, theme) => [
  {
    name: "General",
    component: SettingsGeneralScreen,
    options: {
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MenuIcon />
        </TouchableOpacity>
      ),

      title: `${languages.settings}`,
    },
  },

  {
    name: "TagsScreen",
    component: TagsScreen,
    options: { title: `${languages.tags}` },
  },

  {
    name: "LanguagesScreen",
    component: LanguagesScreen,
    options: { title: languages.language_title },
  },

  {
    name: "ThemeScreen",
    component: ThemeScreen,
    options: { title: languages.color_theme },
  },

  {
    name: "EventSettingScreen",
    component: EventSettingScreen,
    options: {
      title: `${languages.events}`,
      headerRight: () => (
        <View
          style={{
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              dispatch(setDisableCountEvents(true));
              dispatch(setDisableCountEventsDay(true));
              dispatch(setDisableCountEventsNight(true));
            }}
          >
            <Text style={{ color: theme.text, fontSize: 15 }}>
              {languages.reset}
            </Text>
          </TouchableOpacity>
        </View>
      ),
    },
  },
  {
    name: "SettingsStatisticsScreen",
    component: SettingsStatisticsScreen,
    options: {
      title: `${languages.statistics}`,
      headerRight: () => (
        <View
          style={{
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              dispatch(setStatisticsDreams([]));
            }}
          >
            <Text style={{ color: theme.text, fontSize: 15 }}>
              {languages.reset}
            </Text>
          </TouchableOpacity>
        </View>
      ),
    },
  },
  // {
  //   name: 'ChildrenScreen',
  //   component: ChildrenScreen,
  //   options: {
  //     headerTitle: () => (
  //       <Text style={styles.navTitle}>{languages.settings}</Text>
  //     ),
  //   },
  // },
  {
    name: "SettingsStatisticsScreenDreams",
    component: SettingsStatisticsScreenDreams,
    options: {
      title: `${languages.listDays}`,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            dispatch(setStatisticsSection([]));
          }}
          style={{ paddingHorizontal: 10 }}
        >
          <Text style={{ color: theme.text, fontWeight: "bold" }}>
            {languages.reset}
          </Text>
        </TouchableOpacity>
      ),
    },
  },
  {
    name: "SettingsGrafScreen",
    component: SettingsGrafScreen,
    options: {
      title: `${languages.graph}`,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            dispatch(setStatisticsDreams([]));
          }}
          style={{ paddingHorizontal: 10 }}
        >
          <Text style={{ color: theme.text, fontWeight: "bold" }}>
            {languages.reset}
          </Text>
        </TouchableOpacity>
      ),
    },
  },
  // {
  //   name: 'AddChild',
  //   component: AddChild,
  //   options: {
  //     headerTitle: () => (
  //       <Text style={styles.navTitle}>{languages.adding_child}</Text>
  //     ),
  //   },
  // },
  {
    name: "PlacesScreen",
    component: PlacesScreen,
    options: { title: `${languages.sleeping_places}` },
  },
];

const SettingsTabNavigator = () => {
  const languages = useSelector(({ app }) => app.languages);
  const theme = useSelector(({ app }) => app.activeTheme);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <Navigator
      screenOptions={{
        backBehavior: "history",
        headerStyle: {
          backgroundColor: theme.background,
        },
        presentation: "transparentModal",
        headerTintColor: theme.text,
        gestureDirection: "horizontal",
        gestureEnabled: true,
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
  // return navigation;
};

export default SettingsTabNavigator;
