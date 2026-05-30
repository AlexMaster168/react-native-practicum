import React, { useEffect, useState } from "react";
import { Image, Text } from "react-native";
//Navigators
import { HomeNavigator } from "../HomeNavigator";
import { StatisticsNavigation } from "../StatisticsNavigation";
import { EventsNavigator } from "../EventsNavigator";
//Screens
import { useSelector } from "react-redux";

import { accent } from "../../core/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const { Navigator, Screen } = createMaterialTopTabNavigator();
export const TabsNavigator = () => {
  const languages = useSelector(({ app }) => app.languages);
  const theme = useSelector(({ app }) => app.activeTheme);
  const currentTheme = useSelector(({ app }) => app.activeThemeName);
  const disableEvents = useSelector(({ directory }) => directory.disableEvents);

  const getIconStylesForTheme = (focused) => {
    let iconStyle =
      currentTheme === "light"
        ? focused
          ? styles.tabBarIconFocused
          : styles.tabBarIconUnFocused
        : currentTheme === "dark"
        ? focused
          ? styles.tabBarIconFocusedDark
          : styles.tabBarIconUnFocusedDark
        : null;
    return iconStyle;
  };

  const getLabelStylesForTheme = (focused) => {
    let labelStyle =
      currentTheme === "light"
        ? focused
          ? styles.tabBarLabelFocused
          : styles.tabBarLabelUnFocused
        : currentTheme === "dark"
        ? focused
          ? styles.tabBarLabelFocusedDark
          : styles.tabBarLabelUnFocusedDark
        : null;
    return labelStyle;
  };

  return (
    <Navigator
      tabBarPosition="bottom"
      backBehavior="history"
      screenOptions={{
        // lazy: true,
        swipeEnabled: false,
        gestureEnabled: true,
        tabBarIcon: { opacity: 1 },
        headerShown: false,
        tabBarIndicatorStyle: {
          height: 0,
        },
        tabBarIndicator: null,
        tabBarStyle: {
          padding: 0,
          backgroundColor: theme.background,
          borderColor: theme.navigator,
          borderWidth: 1,
        },
        labelStyle: {
          // paddingVertical: 5,
        },
      }}
    >
      {disableEvents && (
        <Screen
          name="EventsNavigator"
          component={EventsNavigator}
          options={{
            tabBarLabel: ({ focused }) => {
              let labelStyle = getLabelStylesForTheme(focused);
              return (
                <Text style={{ ...styles.tabBarLabel, ...labelStyle }}>
                  {languages.event}
                </Text>
              );
            },
            tabBarIcon: ({ focused }) => {
              let iconStyle = getIconStylesForTheme(focused);
              return (
                <Image
                  style={{ ...styles.tabBarIcon, ...iconStyle }}
                  source={require("../../images/icons/event.png")}
                />
              );
            },
          }}
        />
      )}
      <Screen
        name="Main"
        component={HomeNavigator}
        options={{
          tabBarLabel: ({ focused }) => {
            let labelStyle = getLabelStylesForTheme(focused);
            return (
              <Text style={{ ...styles.tabBarLabel, ...labelStyle }}>
                {languages.dreams}
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => {
            let iconStyle = getIconStylesForTheme(focused);
            return (
              <Image
                style={{ ...styles.tabBarIcon, ...iconStyle }}
                source={require("../../images/icons/ic_tab_sleep.png")}
              />
            );
          },
        }}
      />

      <Screen
        name="StatisticsNavigation"
        component={StatisticsNavigation}
        options={{
          tabBarLabel: ({ focused }) => {
            let labelStyle = getLabelStylesForTheme(focused);
            return (
              <Text style={{ ...styles.tabBarLabel, ...labelStyle }}>
                {languages.statistics}
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => {
            let iconStyle = getIconStylesForTheme(focused);
            return (
              <Image
                style={{ ...styles.tabBarIcon, ...iconStyle }}
                source={require("../../images/icons/ic_tab_stats.png")}
              />
            );
          },
        }}
      />
    </Navigator>
  );
};

const styles = {
  tabBarIcon: {
    width: 24,
    height: 24,
  },
  tabBarIconFocused: {
    opacity: 1,
    tintColor: accent,
  },
  tabBarIconUnFocused: {
    opacity: 0.5,
    tintColor: "#6e668a",
  },
  tabBarLabelFocused: {
    opacity: 1,
    color: accent,
  },
  tabBarLabelUnFocused: {
    opacity: 0.5,
    color: "#6e668a",
  },

  tabBarIconFocusedDark: {
    opacity: 1,
    tintColor: "#FFEE6D",
  },
  tabBarIconUnFocusedDark: {
    opacity: 0.5,
    tintColor: "#FFF07F",
  },
  tabBarLabelFocusedDark: {
    opacity: 1,
    color: "#FFEE6D",
  },
  tabBarLabelUnFocusedDark: {
    opacity: 0.5,
    color: "#FFF07F",
  },
};
