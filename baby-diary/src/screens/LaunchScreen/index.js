import React from "react";
import DrawerNavigator from "../../navigators/DrawerNavigator";
import { CreateChild } from "../../screens";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, StatusBar } from "react-native";
import { useSelector } from "react-redux";
import { CenterBlock } from "../../components";

export default function LaunchScreen({ isLaunched, setLaunchTC }) {
  const theme = useSelector(({ app }) => app.activeTheme);

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={theme.background}
        barStyle={theme.text === "#ffffff" ? "light-content" : "dark-content"}
      />
      {Object.keys(theme).length !== 0 ? (
        isLaunched ? (
          <DrawerNavigator />
        ) : (
          <CreateChild setLaunchTC={setLaunchTC} />
        )
      ) : (
        <CenterBlock>
          <ActivityIndicator size="large" color="#1768AF" />
        </CenterBlock>
      )}
    </NavigationContainer>
  );
}
