import React from "react";
import { Text, TouchableOpacity, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { Recommendations } from "../../screens";
import { createStackNavigator } from "@react-navigation/stack";
import { setRecomendtationRest } from "../../redux/reducers/directoryReducer";
import { MenuIcon } from "../../components";

export const { Navigator, Screen } = createStackNavigator();

const _createAlert = (languages) =>
  Alert.alert(languages.reference, languages.reference_text, [{ text: "OK" }], {
    cancelable: true,
  });

const screens = (languages, navigation, theme, dispatch) => [
  {
    name: "RecommendationsScreen",
    component: Recommendations,
    options: {
      headerStyle: {
        backgroundColor: theme.background,
      },

      headerTintColor: theme.text,
      title: languages.sleep_standart,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MenuIcon />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            dispatch(setRecomendtationRest(true));
          }}
          style={{
            backgroundColor: theme.background,
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ color: theme.text }}>{languages.reset}</Text>
        </TouchableOpacity>
      ),
    },
  },
];

const RecommendationsNavigator = () => {
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
      {screens(languages, navigation, theme, dispatch).map((screen, index) => (
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

export default RecommendationsNavigator;
