import React, { useState } from "react";
import { DreamEvent } from "../../screens";
import { useNavigator } from "../../hooks/useNavigator";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  setDisableEvents,
  setDisableTimeLineEvents,
  setDisableCountEvents,
  setDisableCountEventsDay,
  setDisableCountEventsNight,
} from "../../redux/reducers/directoryReducer";
import { _statisticsSection } from "../../components/StatisticsOnce";
import Label from "../../components/Label/index";
import { main, accent } from "../../core/colors";
import { createStackNavigator } from "@react-navigation/stack";
import { EventSettingScreen } from "../../screens";
import ChildSelect from "../../components/ChildSelect";
import { MenuIcon } from "../../components";
const { Navigator, Screen } = createStackNavigator();

const screens = (
  { navigation, dispatch, navigate },
  languages,
  theme,
  setDisableCountEvents,
  setDisableCountEventsDay,
  setDisableCountEventsNight,
  children
) => [
  {
    name: "DreamEvent",
    component: DreamEvent,
    options: {
      headerStyle: {
        backgroundColor: theme.background,
        elevation: 0,
      },
      headerTitle: "",
      headerTintColor: theme.text,
      headerLeft: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MenuIcon />
          </TouchableOpacity>
          {(children && children.length) >= 1 && (
            <View style={{ marginLeft: 5.75 }}>
              <ChildSelect />
            </View>
          )}
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigate("EventSettingScreen")}>
            <Image
              style={{
                tintColor: theme.text,
                width: 25,
                height: 25,
                marginRight: 35,
              }}
              source={require("../../images/icons/ic_settings.png")}
            />
          </TouchableOpacity>
        </View>
      ),
    },
  },
  {
    name: "EventSettingScreen",
    component: EventSettingScreen,
    options: {
      headerTitle: `${languages.events}`,
      headerRight: () => (
        <TouchableOpacity
          style={{ paddingHorizontal: 10 }}
          onPress={() => {
            dispatch(setDisableCountEvents(true));
            dispatch(setDisableCountEventsDay(true));
            dispatch(setDisableCountEventsNight(true));
          }}
        >
          <Text style={{ color: "#fff", fontSize: 15 }}>{languages.reset}</Text>
        </TouchableOpacity>
      ),
    },
  },
];
export const EventsNavigator = ({ navigation }) => {
  const languages = useSelector(({ app }) => app.languages);
  const theme = useSelector(({ app }) => app.activeTheme);
  const children = useSelector(({ child }) => child.children);

  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const navigator = useNavigator(
    screens(
      { navigation, dispatch, navigate },
      languages,
      theme,
      setDisableEvents,
      setDisableTimeLineEvents,
      setDisableCountEvents,
      setDisableCountEventsDay,
      setDisableCountEventsNight,
      children
    )
  );
  return navigator;
};
