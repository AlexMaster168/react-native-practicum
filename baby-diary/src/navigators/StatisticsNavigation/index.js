import React, { useEffect } from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Statistics } from "../../screens";
import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { accent } from "../../core/colors";
import {
  connectActionSheet,
  useActionSheet,
} from "@expo/react-native-action-sheet";
import { setStatisticsDreams } from "../../redux/reducers/appReducer";
import { SettingsStatisticsScreen, SettingsGrafScreen } from "../../screens";
import ChildSelect from "../../components/ChildSelect";
import {
  setLoading,
  setTableMode,
} from "../../redux/reducers/statisticsReducer";
import { MenuIcon } from "../../components";

const { Navigator, Screen } = createStackNavigator();
const styles = StyleSheet.create({
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  shareImage: {
    width: 25,
    height: 25,
    marginRight: 17.5,
  },
});

export const StatisticsNavigation = ({ navigation }) => {
  const languages = useSelector(({ app }) => app.languages);
  const theme = useSelector(({ app }) => app.activeTheme);
  const children = useSelector(({ child }) => child.children);
  const { showActionSheetWithOptions } = useActionSheet();
  const { navigate } = navigation;
  const dispatch = useDispatch();
  const tableMode = useSelector(({ statistics }) => statistics.tableMode);
  useEffect(() => {
    dispatch(setTableMode({ value: "table", title: languages.table }));
  }, [languages]);

  return (
    <Navigator
      initialRouteName={"Statistics"}
      screenOptions={{
        // presentation: 'modal',
        gestureEnabled: true,
        // cardOverlayEnabled: true,
        // ...TransitionPresets.ModalPresentationIOS,
        gestureDirection: "horizontal",
        presentation: "transparentModal",
        gestureEnabled: true,
        headerTitle: "",
        headerTintColor: theme.text,
        headerStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Screen
        name="Statistics"
        component={Statistics}
        options={{
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
                <View style={{ marginLeft: 10.8 }}>
                  <ChildSelect />
                </View>
              )}
            </View>
          ),

          headerRight: () => (
            <View style={styles.headerButtons}>
              <TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() =>
                  _onOpenActionSheet(
                    { showActionSheetWithOptions, dispatch },
                    languages,
                    theme
                  )
                }
              >
                <Text
                  style={{
                    color: theme.text,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  {tableMode.title}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => navigation.navigate("DreamEvent")}

                onPress={() =>
                  tableMode.value !== "graph"
                    ? navigate("SettingsStatisticsScreen")
                    : navigate("SettingsGrafScreen")
                }
              >
                <Image
                  style={{ ...styles.shareImage, tintColor: theme.text }}
                  source={require("../../images/icons/ic_settings.png")}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      ></Screen>
      <Screen
        name="SettingsStatisticsScreen"
        component={SettingsStatisticsScreen}
        options={{
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
          headerTitle: `${languages.statistics}`,
        }}
      />
      <Screen
        name="SettingsGrafScreen"
        component={SettingsGrafScreen}
        options={{
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
          headerTitle: `${languages.graph}`,
        }}
      />
    </Navigator>
  );
};

const _onOpenActionSheet = (
  { showActionSheetWithOptions, dispatch },
  languages,
  theme
) => {
  const options = [
    languages.summary,
    languages.table,
    languages.diagram,
    languages.event_diagram,
    languages.ratio_diagram,
    languages.graph,
  ];
  const title = languages.select_statistics_display_mode;
  const cancelButtonIndex = 6;
  const containerStyle = { backgroundColor: theme.navigator || "#000" };
  const titleTextStyle = { color: accent, fontSize: 18 };
  const textStyle = { color: theme.text };

  showActionSheetWithOptions(
    {
      options,
      title,
      cancelButtonIndex,
      containerStyle,
      titleTextStyle,
      textStyle,
    },
    (buttonIndex) => {
      // Do something here depending on the button index selected

      if (buttonIndex === 0) {
        dispatch(setLoading(true));
        dispatch(setTableMode({ value: "summary", title: options[0] }));
      }
      if (buttonIndex === 1)
        dispatch(setTableMode({ value: "table", title: options[1] }));
      if (buttonIndex === 2)
        dispatch(setTableMode({ value: "diagram", title: options[2] }));
      if (buttonIndex === 3)
        dispatch(setTableMode({ value: "event_diagram", title: options[3] }));
      if (buttonIndex === 4)
        dispatch(setTableMode({ value: "ratio_diagram", title: options[4] }));
      if (buttonIndex === 5) {
        dispatch(setLoading(true));
        dispatch(setTableMode({ value: "graph", title: options[5] }));
      }
    }
  );
};

export default connectActionSheet(StatisticsNavigation);
