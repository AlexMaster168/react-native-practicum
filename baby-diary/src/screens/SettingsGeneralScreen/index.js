import React, { useState } from "react";
import {
  Text,
  View,
  Platform,
  TouchableNativeFeedback,
  Image,
  ScrollView,
  Switch,
  StyleSheet,
  Dimensions,
  NativeModules,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { accent } from "../../core/colors";

import { styles } from "./styles";
import moment from "moment";
import {
  connectActionSheet,
  useActionSheet,
} from "@expo/react-native-action-sheet";
import AdBanner from "../../components/AdBanner";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useDispatch, useSelector } from "react-redux";

const deviceWidth = Dimensions.get("window").width;

const settingScreen = (languages) => [
  {
    title: `${languages.listDays}`,
    route: "SettingsStatisticsScreenDreams",
  },
  {
    title: `${languages.event}`,
    route: "EventSettingScreen",
  },
  {
    title: `${languages.statistics}`,
    route: "SettingsStatisticsScreen",
  },
  {
    title: `${languages.graph}`,
    route: "SettingsGrafScreen",
  },
  {
    title: `${languages.sleeping_places}`,
    route: "PlacesScreen",
  },
  {
    title: `${languages.tags}`,
    route: "TagsScreen",
  },
];
const _settingsAdditionals = (languages) => [
  {
    title: `${languages.feeding}`,
    value: "feeding",
  },
  {
    title: `${languages.tags}`,
    value: "tags",
  },
];

const _renderSettings = (setting, theme, enableAdds, index) => {
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleEnableAdds = () => {
    setIsEnabled(!isEnabled);
    enableAdds(setting.value);
  };

  return (
    <View key={index}>
      <View
        style={{
          ...styles.settingStatisticItem,
          paddingVertical: 15,
          backgroundColor: theme.navigator,
        }}
      >
        <Text style={{ color: theme.text }}>{setting.title}</Text>
        <Switch onValueChange={toggleEnableAdds} value={isEnabled}></Switch>
      </View>
    </View>
  );
};

const SettingsGeneralScreen = ({
  endNightSleep,
  startNightSleep,
  setNightTimeTC,
  languages,
  activeLanguage,
  setActiveLanguageTC,
  theme,
  enableAdds,
}) => {
  const activeLanguageName = useSelector(({ app }) => app.activeLanguageName);
  const { showActionSheetWithOptions } = useActionSheet();
  let date = new Date();
  const startTime = date.setHours(20, 0);
  const endTime = date.setHours(6, 0);
  const dispatch = useDispatch();
  // const _handleLanguagePress = (value) => {
  //   setActiveLanguageTC(value);
  // };
  const { navigate } = useNavigation();
  const [updatedDream, setUpdatedDream] = useState({});
  const [startNight, setStartNight] = useState([]);
  const [endNight, setEndNight] = useState(endNightSleep);
  const activeThemeName = useSelector(({ app }) => app.activeThemeName);
  const updateDreamTime = (type, time) => {
    switch (type) {
      case "start":
        setNightTimeTC(type, time);
        break;
      case "end":
        setNightTimeTC(type, time);
      default:
        break;
    }
  };
  const changeNightTime = (value) => {
    setNightTimeTC("start", formatTime(value[1]));
    setNightTimeTC("end", formatTime(value[0]));
  };

  const renderLanguageNameText = () => {
    switch (activeLanguageName) {
      case "en":
        return "English";
      case "ru":
        return languages.language_ru;
      default:
        return languages.system;
    }
  };

  const renderThemeNameText = () => {
    switch (activeThemeName) {
      case "light":
        return languages.light;
      case "dark":
        return languages.dark;
      default:
        return languages.system;
    }
  };

  return (
    <React.Fragment>
      <ScrollView
        style={{
          ...styles.settingStatisticsContainer,
          backgroundColor: theme.background,
        }}
      >
        <View>
          <TouchableNativeFeedback
            background={
              Platform.OS === "android"
                ? TouchableNativeFeedback.SelectableBackground()
                : ""
            }
            onPress={() => navigate("LanguagesScreen")}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                ...styles.settingStatisticItem,
                padding: 15,
                marginHorizontal: 10,
                backgroundColor: theme.navigator,
                marginBottom: 20,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: theme.text,
                }}
              >
                {languages.selectedLanguage}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    opacity: 0.4,
                    color: theme.text,
                    marginRight: 20,
                  }}
                >
                  {languages.all_language[activeLanguageName]}
                </Text>
                <Text
                  style={{
                    color: theme.text,
                  }}
                >
                  &gt;
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>

        <View style={{ marginHorizontal: 10, marginTop: 25 }}>
          <TouchableNativeFeedback
            background={
              Platform.OS === "android"
                ? TouchableNativeFeedback.SelectableBackground()
                : ""
            }
            onPress={() => navigate("ThemeScreen")}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                ...styles.settingStatisticItem,
                padding: 15,
                backgroundColor: theme.navigator,
                marginBottom: 20,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: theme.text }}>
                {languages.selected_theme}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ opacity: 0.4, color: theme.text, marginRight: 20 }}
                >
                  {renderThemeNameText()}
                </Text>
                <Text style={{ opacity: 1, color: theme.text }}> &#62;</Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={{ marginHorizontal: 10, marginTop: 25 }}>
          <Text
            style={{
              ...styles.settingsSectionTitle,
              color: theme.text,
              marginBottom: 15,
            }}
          >
            {languages.settings}
          </Text>
          <View style={{ backgroundColor: theme.navigator, borderRadius: 10 }}>
            {settingScreen(languages).map((screen, index) => {
              return (
                <TouchableNativeFeedback
                  key={index}
                  onPress={() => {
                    navigate(screen.route);
                  }}
                >
                  <View
                    style={{
                      ...styles.settingStatisticItem,
                      paddingVertical: 10,
                      borderRadius: 10,
                      backgroundColor: theme.navigator,
                      borderBottomColor: theme.background,
                      borderBottomWidth: 1,
                    }}
                  >
                    <Text
                      style={{
                        color: theme.text,
                      }}
                    >
                      {screen.title}
                    </Text>
                    <Text
                      style={{
                        color: theme.text,
                      }}
                    >
                      &gt;
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              );
            })}
          </View>
        </View>
        <View style={{ marginHorizontal: 10, marginTop: 40 }}>
          <Text
            style={{
              ...styles.settingsSectionTitle,
              color: theme.text,
              marginBottom: 15,
              marginHorizontal: 20,
            }}
          >
            {languages.day_sleep}
          </Text>

          <View
            style={{
              ...styles.settingsNightTime,

              paddingBottom: 5,
              backgroundColor: theme.navigator,
            }}
          >
            <MultiSlider
              selectedStyle={{ backgroundColor: "#bd6d1c" }}
              trackStyle={{ backgroundColor: "#444C5C" }}
              min={0}
              max={86400}
              values={[21600, 72000]}
              isMarkersSeparated={true}
              onValuesChange={(value) => {
                setStartNight(value);
                changeNightTime(value);
              }}
              customMarkerLeft={(e) => (
                <View
                  style={{
                    borderRadius: 50,
                    height: 15,
                    width: 15,
                    backgroundColor: accent,
                  }}
                ></View>
              )}
              customMarkerRight={(e) => (
                <View
                  style={{
                    borderRadius: 50,
                    height: 15,
                    width: 15,
                    backgroundColor: accent,
                  }}
                ></View>
              )}
              minMarkerOverlapDistance={3}
              sliderLength={deviceWidth - 60}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "90%",
              }}
            >
              <Text style={{ ...styles.time, color: theme.text, fontSize: 14 }}>
                {endNightSleep || moment(endNight)}
              </Text>
              <Text style={{ ...styles.time, color: theme.text, fontSize: 14 }}>
                {startNightSleep || moment(endNight)}
              </Text>
            </View>
          </View>
          <Text style={{ ...styles.settingsDescription, color: theme.text }}>
            {languages.setting_general_desc}
          </Text>
        </View>
      </ScrollView>
      <AdBanner />
    </React.Fragment>
  );
};

export default connectActionSheet(SettingsGeneralScreen);
const style = StyleSheet.create({
  tabBarIcon: {
    width: 24,
    height: 24,
    tintColor: "#9180a8",
  },
});
