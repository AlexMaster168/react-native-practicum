import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import PlacesScreen from "../index";
import { CenterBlock } from "../../../components";
import { getInfo } from "../../../redux/reducers/directoryReducer";
import { setLanguagesTC } from "../../../redux/reducers/appReducer";
import { useNavigation } from "@react-navigation/native";
import {
  getCurrentDream,
  startDreamTC,
  endDreamTC
} from "../../../redux/reducers/mainReducer";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state"
]);
const mapStateToProps = ({ directory, app, date }) => ({
  places: directory.places,
  tags: directory.tags,
  languages: app.languages,
  theme: app.activeTheme,
  disableTags: directory.disableTags,
  disablePlaces: directory.disablePlaces,
  dreams: date.dreams,
  date: date.date
});

export default connect(mapStateToProps, {
  getInfo,
  setLanguagesTC,
  getCurrentDream,
  startDreamTC,
  endDreamTC
})(
  ({
    dream,
    date,
    isNew,
    getInfo,
    places,
    tags,
    setLanguagesTC,
    languages,
    startDreamTC,
    endDreamTC,
    theme,
    disableTags,
    disablePlaces,
    dreams
  }) => {
    const navigation = useNavigation();

    useEffect(() => {
      setLanguagesTC();
    }, [languages]);

    useEffect(() => {
      const unsubscribe = navigation.addListener("focus", () => {
        getInfo("places");
        getInfo("tags");
      });
      return unsubscribe;
    }, [navigation, languages]);

    return (
      <PlacesScreen
        theme={theme}
        languages={languages}
        disablePlaces={disablePlaces}
        placess={places}
      />
    );
  }
);
