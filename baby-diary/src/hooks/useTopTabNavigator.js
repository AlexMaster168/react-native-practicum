import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { main, accent } from "../core/colors";

const { Navigator, Screen } = createMaterialTopTabNavigator();
import { useSelector } from "react-redux";

export const useTopTabNavigator = (screens, tabBarOptions, initRoute) => {
  const theme = useSelector(({ app }) => app.activeTheme);
  return (
    <Navigator
      initialRouteName={initRoute || screens[0].name}
      tabBarPosition="top"
      screenOptions={{
        ...tabBarOptions,
        tabBarActiveTintColor: accent,

        tabBarStyle: {
          backgroundColor: theme.navigator,
          borderColor: theme.navigator,
          borderWidth: 1
        }
      }}>
      {screens.map((screen, index) => {
        if (typeof screen.component === "function") {
          return (
            <Screen key={index} name={screen.name} options={screen.options}>
              {screen.component}
            </Screen>
          );
        }

        return (
          <Screen
            key={index}
            name={screen.name}
            component={screen.component}
            options={screen.options}
          />
        );
      })}
    </Navigator>
  );
};
