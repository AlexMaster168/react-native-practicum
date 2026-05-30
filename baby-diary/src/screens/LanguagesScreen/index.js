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

import {
  setNightTimeTC,
  getNightTimeTC,
  setLanguagesTC,
  setActiveLanguageTC,
} from "../../redux/reducers/appReducer";

import { connect, useSelector } from "react-redux";
import { styles } from "./styles";

const LanguagesScreen = ({
  languages,
  activeLanguage,
  setActiveLanguageTC,
  theme,
}) => {
  const activeLanguageName = useSelector(({ app }) => app.activeLanguageName);
  const _handleLanguagePress = (value) => {
    setActiveLanguageTC(value);
    console.log("Changed lang");
  };

  const languagesSettings = (languages) => [
    {
      value: "system",
      title: languages.system,
    },
    {
      value: "en",
      title: languages.language_us,
    },
    {
      value: "ru",
      title: languages.language_ru,
    },
  ];

  return (
    <View
      style={{
        marginTop: 20,
        marginBottom: 20,
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: theme.background,
      }}
    >
      <View
        style={{
          backgroundColor: theme.navigator,
          borderRadius: 8,
          width: "90%",
          height: "25%",
        }}
      >
        {languagesSettings(languages).map((language, index) => (
          <TouchableNativeFeedback
            background={
              Platform.OS === "android"
                ? TouchableNativeFeedback.SelectableBackground()
                : ""
            }
            key={index}
            onPress={() => _handleLanguagePress(language.value)}
          >
            <View
              style={{
                margin: 1,
                ...styles.settingStatisticItem,
                paddingVertical: 15,
                backgroundColor: theme.navigator,
                borderBottomColor: theme.text,
                borderBottomWidth: 1,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: theme.text }}>{language.title}</Text>
              {language.value === activeLanguageName && (
                <View>
                  <Image
                    style={{ ...style.tabBarIcon }}
                    source={require("../../images/icons/ic_check.png")}
                  />
                </View>
              )}
            </View>
          </TouchableNativeFeedback>
        ))}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  tabBarIcon: {
    width: 24,
    height: 24,
    tintColor: "#9180a8",
  },
});

const mapStateToProps = ({ app }) => {
  return {
    startNightSleep: app.startNightSleep,
    endNightSleep: app.endNightSleep,
    languages: app.languages,
    activeLanguage: app.activeLanguage,
    theme: app.activeTheme,
  };
};

export default connect(mapStateToProps, {
  setNightTimeTC,
  getNightTimeTC,
  setLanguagesTC,
  setActiveLanguageTC,
})(({ setActiveLanguageTC, languages, theme, activeLanguage }) => {
  return (
    <LanguagesScreen
      setActiveLanguageTC={setActiveLanguageTC}
      languages={languages}
      theme={theme}
      activeLanguage={activeLanguage}
    />
  );
});
