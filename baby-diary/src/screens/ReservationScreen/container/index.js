import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  setDaysTC,
  addInfo,
  addDreams
} from "../../../redux/reducers/backupReducer";
import ReservationScreen from "../index";

const mapStateToProps = ({ app, backup, child, directory, date }) => ({
  dreams: backup.dreams,
  loading: backup.loading,
  theme: app.activeTheme,
  languages: app.languages,
  children: child.children,
  tags: directory.tags,
  places: directory.places,
  date: date.date
});

export default connect(mapStateToProps, {
  setDaysTC,
  addInfo,
  addDreams
})(
  ({
    dreams,
    loading,
    theme,
    languages,
    setDaysTC,
    children,
    tags,
    places,
    addInfo,
    date,
    addDreams
  }) => {
    const navigation = useNavigation();
    useEffect(() => {
      const unsubscribe = navigation.addListener("focus", () => {});
      return unsubscribe;
    });

    return (
      <ReservationScreen
        dreams={dreams}
        loading={loading}
        theme={theme}
        languages={languages}
        children={children}
        tags={tags}
        places={places}
        addInfo={addInfo}
        setDaysTC={setDaysTC}
        date={date}
        addDreams={addDreams}
      />
    );
  }
);
