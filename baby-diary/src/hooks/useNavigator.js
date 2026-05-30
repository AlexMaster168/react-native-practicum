import React from "react";
import { Text } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { useSelector } from "react-redux";

const { Navigator, Screen } = createStackNavigator();

export const useNavigator = (screens, headerTitle, screenOptions) => {
  const theme = useSelector(({ app }) => app.activeTheme);
  return (
    <Navigator
      backBehavior="history"
      screenOptions={{
        // animationEnabled: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        // cardOverlayEnabled: true,
        // ...TransitionPresets.ModalPresentationIOS,
        headerTitle: () => (
          <Text
            style={{
              color: theme.text,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            {headerTitle || ""}
          </Text>
        ),
        presentation: "transparentModal",
        headerStyle: {
          backgroundColor: theme.background,
          elevation: 0,
        },
        headerTintColor: theme.text,
      }}
    >
      {screens.map((screen, index) =>
        screen.component ? (
          <Screen
            key={index}
            name={screen.name}
            component={screen.component}
            options={screen.options}
          />
        ) : (
          <Screen
            key={index}
            children={screen.children || null}
            name={screen.name}
            options={screen.options}
          />
        )
      )}
    </Navigator>
  );
};
