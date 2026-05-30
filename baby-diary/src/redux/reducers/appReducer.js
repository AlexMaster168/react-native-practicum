import AsyncStorage from "@react-native-async-storage/async-storage";
import { ru } from "../../translations/ru";
import { en } from "../../translations/en";
import moment from "moment";
import { darkMode } from "../../core/colors";
import { NativeModules, Platform } from "react-native";
import { LANGUAGES } from "../../core/languages";

const SET_IS_LAUNCHED = "app/SET_IS_LAUNCHED";
const SET_REST_VIEW = "app/SET_REST_VIEW";
const SET_REST_DREAMS = "app/SET_REST_DREAMS";
const SET_STATISTICS_VIEW = "app/SET_STATISTICS_VIEW";
const SET_STATISTICS_SECTION = "app/SET_STATISTICS_SECTION";
const SET_STATISTICS_DREAMS = "app/SET_STATISTICS_DREAMS";
const SET_START_NIGHT_SLEEP = "app/SET_START_NIGHT_SLEEP";
const SET_END_NIGHT_SLEEP = "app/SET_END_NIGHT_SLEEP";
const SET_LANGUAGES = "app/SET_LANGUAGES";
const SET_ACTIVE_LANGUAGE = "app/SET_ACTIVE_LANGUAGE";
const SET_ACTIVE_THEME = "app/SET_ACTIVE_THEME";
const SET_ACTIVE_THEME_NAME = "app/SET_ACTIVE_THEME_NAME";
const SET_LAUNCH_NUMBER = "app/SET_LAUNCH_NUMBER";
const SET_ACTIVE_LANGUAGE_NAME = "app/SET_ACTIVE_LANGUAGE_NAME";

let initialState = {
  isLaunched: null,
  statisticsView: [],
  statisticsDreams: [],
  restView: false,
  restDreams: false,
  startNightSleep: moment().set("hour", 20).set("minute", 0).format("HH:mm"),
  endNightSleep: moment().set("hour", 6).set("minute", 0).format("HH:mm"),
  languages: en,
  activeLanguage: "",
  activeLanguageName: "",
  activeTheme: {},
  activeThemeName: "",
  activeLaunchNumber: "",
  rateRemind: true,
  statisticSection: [],
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LAUNCHED: {
      return {
        ...state,
        isLaunched: action.isLaunched,
      };
    }
    case SET_STATISTICS_VIEW: {
      return {
        ...state,
        statisticsView: action.statisticsView,
      };
    }
    case SET_STATISTICS_SECTION: {
      return {
        ...state,
        statisticSection: action.statisticSection,
      };
    }
    case SET_REST_DREAMS: {
      return {
        ...state,
        restDreams: action.isEnable,
      };
    }
    case SET_REST_VIEW: {
      return {
        ...state,
        restView: action.isEnable,
      };
    }
    case SET_STATISTICS_DREAMS: {
      return {
        ...state,
        statisticsDreams: action.statisticsDreams,
      };
    }
    case SET_START_NIGHT_SLEEP: {
      return {
        ...state,
        startNightSleep: action.startNightSleep,
      };
    }
    case SET_END_NIGHT_SLEEP: {
      return {
        ...state,
        endNightSleep: action.endNightSleep,
      };
    }
    case SET_LANGUAGES: {
      return {
        ...state,
        languages: action.languages,
      };
    }
    case SET_ACTIVE_LANGUAGE: {
      return {
        ...state,
        activeLanguage: action.activeLanguage,
      };
    }
    case SET_ACTIVE_THEME:
      return {
        ...state,
        activeTheme: action.themeMode,
      };
    case SET_ACTIVE_THEME_NAME: {
      return {
        ...state,
        activeThemeName: action.themeName,
      };
    }
    case SET_LAUNCH_NUMBER:
      return {
        ...state,
        activeLaunchNumber: action.number,
      };
    case SET_ACTIVE_LANGUAGE_NAME:
      return {
        ...state,
        activeLanguageName: action.activeLanguageName,
      };
    default:
      return state;
  }
};

export const setIsLaunched = (isLaunched) => ({
  type: SET_IS_LAUNCHED,
  isLaunched,
});
export const setRestView = (isEnable) => ({
  type: SET_REST_VIEW,
  isEnable,
});
export const setRestDreams = (isEnable) => ({
  type: SET_REST_DREAMS,
  isEnable,
});
export const setStatisticsView = (statisticsView) => ({
  type: SET_STATISTICS_VIEW,
  statisticsView,
});
export const setStatisticsDreams = (statisticsDreams) => ({
  type: SET_STATISTICS_DREAMS,
  statisticsDreams,
});
export const setStatisticsSection = (statisticSection) => ({
  type: SET_STATISTICS_SECTION,
  statisticSection,
});
export const setStartNightSleep = (startNightSleep) => ({
  type: SET_START_NIGHT_SLEEP,
  startNightSleep,
});
export const setEndNightSleep = (endNightSleep) => ({
  type: SET_END_NIGHT_SLEEP,
  endNightSleep,
});
export const setLanguages = (languages) => ({ type: SET_LANGUAGES, languages });

export const setActiveLanguages = (activeLanguage) => ({
  type: SET_ACTIVE_LANGUAGE,
  activeLanguage,
});
export const setActiveLanguageName = (activeLanguageName) => ({
  type: SET_ACTIVE_LANGUAGE_NAME,
  activeLanguageName,
});
export const setActiveTheme = (themeMode) => ({
  type: SET_ACTIVE_THEME,
  themeMode,
});
export const setActiveThemeName = (themeName) => {
  return {
    type: SET_ACTIVE_THEME_NAME,
    themeName,
  };
};
export const setActiveLaunchNumber = (number) => ({
  type: SET_LAUNCH_NUMBER,
  number,
});

const getPreferredLang = () => {
  let deviceLanguage;
  try {
    if (Platform.OS === "ios") {
      // SettingsManager — iOS-only, на Android его нет (null)
      const settings = NativeModules.SettingsManager?.settings;
      deviceLanguage = settings?.AppleLocale || settings?.AppleLanguages?.[0];
    } else {
      deviceLanguage = NativeModules.I18nManager?.localeIdentifier;
    }
  } catch (e) {
    deviceLanguage = undefined;
  }
  return deviceLanguage?.slice(0, 2) || "en";
};

export const setActiveLanguageTC = (language) => async (dispatch) => {
  let activeLanguage = language;
  let activeLanguageName = language;

  let systemLang = getPreferredLang();
  if (language === "system") {
    if (LANGUAGES.find((lang) => lang.title === systemLang)) {
      activeLanguageName = language;
      activeLanguage = systemLang;
    } else {
      activeLanguageName = "en";
      activeLanguage = "en";
    }
  } else {
    if (
      LANGUAGES.find((lang) => lang.title === systemLang) &&
      systemLang === language
    ) {
      activeLanguageName = "system";
      activeLanguage = systemLang;
    } else {
      activeLanguageName = language;
    }
  }
  await AsyncStorage.setItem("@active_language", activeLanguage);
  await AsyncStorage.setItem("@active_language_name", activeLanguageName);
  dispatch(setActiveLanguages(activeLanguage));
  dispatch(setActiveLanguageName(activeLanguageName));
  moment.locale(activeLanguage);
  dispatch(setLanguagesTC());
};

export const setLanguagesTC = () => async (dispatch) => {
  const activeLanguage = await AsyncStorage.getItem("@active_language");
  console.log(activeLanguage, "🥚🥯");
  dispatch(setActiveLanguages(activeLanguage ? activeLanguage : "en"));
  if (!activeLanguage) {
    await AsyncStorage.setItem("@active_language_name", "system");
    dispatch(setActiveLanguageName("system"));
    const deviceLanguage = getPreferredLang();
    const locale = LANGUAGES.find(
      (language) => language.title === deviceLanguage
    );
    console.log(locale?.title, "set locale");
    await AsyncStorage.setItem(
      "@active_language",
      locale ? locale.title : "en"
    );
    dispatch(setLanguages(locale ? locale.value : en));
  } else {
    const activeLanguageName = await AsyncStorage.getItem(
      "@active_language_name"
    );
    dispatch(setActiveLanguageName(activeLanguageName));
    switch (activeLanguage) {
      case "ru":
        dispatch(setLanguages(ru));
        break;
      case "en":
        dispatch(setLanguages(en));
        break;
      default:
        dispatch(setLanguages(en));
        break;
    }
  }
};

export const setLaunchTC = () => async (dispatch) => {
  // const appLaunched = await AsyncStorage.getItem('@appLaunched_key');
  const children = JSON.parse(await AsyncStorage.getItem("@children"));

  if (children?.length) {
    await AsyncStorage.setItem("@appLaunched_key", "true");
    dispatch(setIsLaunched(true));
  } else {
    dispatch(setIsLaunched(false));
  }
};

export const setStatisticsViewTC = (statisticsView) => async (dispatch) => {
  // await AsyncStorage.removeItem('@statisticsView')
  const storageStatisticsView = JSON.parse(
    await AsyncStorage.getItem("@statisticsView")
  );
  console.log("storageStatisticsView", storageStatisticsView);
  console.log("statisticsView", statisticsView);

  if (!storageStatisticsView) {
    await AsyncStorage.setItem(
      "@statisticsView",
      JSON.stringify([statisticsView])
    );
  } else {
    const isExist = !!storageStatisticsView.find(
      ({ value }) => value === statisticsView.value
    );
    console.log("isExist");
    if (isExist) {
      const updatedSettings = storageStatisticsView.filter(
        ({ value }) => value !== statisticsView.value
      );
      // console.log("updatedSettings", updatedSettings);

      await AsyncStorage.setItem(
        "@statisticsView",
        JSON.stringify(updatedSettings)
      );
    } else {
      await AsyncStorage.setItem(
        "@statisticsView",
        JSON.stringify(storageStatisticsView.concat(statisticsView))
      );
    }
  }
  dispatch(
    setStatisticsView(
      JSON.parse(await AsyncStorage.getItem("@statisticsView"))
    ) || []
  );
};
export const setStatisticsSectionTC =
  (statisticSection) => async (dispatch) => {
    // await AsyncStorage.removeItem('@statisticsView')
    const storagestatisticSection = JSON.parse(
      await AsyncStorage.getItem("@statisticSection")
    );
    console.log("storageStatisticsSection", storagestatisticSection);
    console.log("statisticSection", statisticSection);

    if (!storagestatisticSection) {
      await AsyncStorage.setItem(
        "@statisticSection",
        JSON.stringify([statisticSection])
      );
    } else {
      const isExist = !!storagestatisticSection.find(
        ({ id }) => id === statisticSection.id
      );
      console.log("isExist");
      if (isExist) {
        const updatedSettings = storagestatisticSection.filter(
          ({ id }) => id !== statisticSection.id
        );
        // console.log("updatedSettings", updatedSettings);

        await AsyncStorage.setItem(
          "@statisticSection",
          JSON.stringify(updatedSettings)
        );
      } else {
        await AsyncStorage.setItem(
          "@statisticSection",
          JSON.stringify(storagestatisticSection.concat(statisticSection))
        );
      }
    }
    dispatch(
      setStatisticsSection(
        JSON.parse(await AsyncStorage.getItem("@statisticSection"))
      ) || []
    );
  };
export const getInfo = (type) => async (dispatch) => {
  const storageInfo = JSON.parse(await AsyncStorage.getItem(`@${type}`));
  if (storageInfo) {
    switch (type) {
      case "statisticsDreams":
        dispatch(setStatisticsDreams(storageInfo));
        break;
      case "statisticsView":
        dispatch(setStatisticsView(storageInfo));
      case "statisticSection":
        dispatch(setStatisticsSection(storageInfo));
      default:
        break;
    }
  } else {
    dispatch(setStatisticsView([]));
    dispatch(setStatisticsDreams([]));
    dispatch(setStatisticsSection([]));
  }
};
export const updatedStatistics = (type, value) => async (dispatch) => {
  await AsyncStorage.removeItem(`@${type}`);

  await AsyncStorage.setItem(`@${type}`, JSON.stringify(value));

  dispatch(getInfo(`${type}`));
};
export const setStatisticsDreamsTC = (statisticsDreams) => async (dispatch) => {
  // await AsyncStorage.removeItem('@statisticsView')
  const storageStatisticsDreams = JSON.parse(
    await AsyncStorage.getItem("@statisticsDreams")
  );
  console.log("storageStatisticsDreams", storageStatisticsDreams);
  console.log("statisticsDreams", statisticsDreams);

  if (!storageStatisticsDreams) {
    await AsyncStorage.setItem(
      "@statisticsDreams",
      JSON.stringify([statisticsDreams])
    );
  } else {
    const isExist = !!storageStatisticsDreams.find(
      ({ value }) => value === statisticsDreams.value
    );
    console.log("isExist");
    if (isExist) {
      const updatedSettings = storageStatisticsDreams.filter(
        ({ value }) => value !== statisticsDreams.value
      );
      // console.log("updatedSettings", updatedSettings);

      await AsyncStorage.setItem(
        "@statisticsDreams",
        JSON.stringify(updatedSettings)
      );
    } else {
      await AsyncStorage.setItem(
        "@statisticsDreams",
        JSON.stringify(storageStatisticsDreams.concat(statisticsDreams))
      );
    }
  }
  dispatch(
    setStatisticsDreams(
      JSON.parse(await AsyncStorage.getItem("@statisticsDreams"))
    ) || []
  );
};

export const setNightTimeTC = (type, time) => async (dispatch, getState) => {
  // await AsyncStorage.removeItem(`@${type}NightSleep`)
  const t = time
    ? time
    : type === "start"
    ? getState().app.startNightSleep
    : getState().app.endNightSleep;

  await AsyncStorage.setItem(`@${type}NightSleep`, JSON.stringify(t));
  type === "start"
    ? dispatch(setStartNightSleep(t))
    : dispatch(setEndNightSleep(t));
};
export const getNightTimeTC = (type) => async (dispatch) => {
  const nightTime = JSON.parse(
    await AsyncStorage.getItem(`@${type}NightSleep`)
  );

  type === "start"
    ? dispatch(setStartNightSleep(nightTime))
    : dispatch(setEndNightSleep(nightTime));
};
export const getStatisticsSectionTC = () => async (dispatch) => {
  const storageStatisticsSection = await AsyncStorage.getItem(
    "@statisticsSection"
  );
  dispatch(setStatisticsSection(JSON.parse(storageStatisticsSection) || []));
};
export const getStatisticsDreamsTC = () => async (dispatch) => {
  const storageStatisticsDreams = await AsyncStorage.getItem(
    "@statisticsDreams"
  );
  dispatch(setStatisticsDreams(JSON.parse(storageStatisticsDreams) || []));
};

export const setTheme = (mode) => async (dispatch) => {
  if (!mode) {
    const initialThemeName = JSON.parse(
      await AsyncStorage.getItem(`@themeName`)
    );
    if (!initialThemeName) {
      dispatch(setThemeName("system"));
    } else {
      const initialThemeMode = JSON.parse(
        await AsyncStorage.getItem(`@themeMode`)
      );
      dispatch(setActiveThemeName(initialThemeName));
      dispatch(setActiveTheme(initialThemeMode));
    }
  } else {
    await AsyncStorage.setItem(`@themeMode`, JSON.stringify(mode));
    dispatch(setActiveTheme(mode));
  }
};

export const setThemeName = (themeName) => async (dispatch) => {
  await AsyncStorage.setItem(`@themeName`, JSON.stringify(themeName));
  dispatch(setActiveThemeName(themeName));
};

export const setLaunchNumber = () => async (dispatch) => {
  let number = await AsyncStorage.getItem("@launchNumber");
  number = number ? +number + 1 : 0;
  if (number > 10 || number == null) {
    number = 0;
  }
  await AsyncStorage.setItem("@launchNumber", JSON.stringify(number));
  dispatch(setActiveLaunchNumber(number));
};
