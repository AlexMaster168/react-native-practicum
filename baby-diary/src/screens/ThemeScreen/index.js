import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setThemeName } from "../../redux/reducers/appReducer";
import { styles } from "./styles";

const ThemeScreen = () => {
  const theme = useSelector(({ app }) => app.activeTheme);
  const activeThemeName = useSelector(({ app }) => app.activeThemeName);
  const languages = useSelector(({ app }) => app.languages);
  console.log("ACtive theme name", activeThemeName);
  const [themes, setThemes] = useState([
    {
      id: "light",
      name: languages.light,
      selected: activeThemeName === "light",
    },
    {
      id: "dark",
      name: languages.dark,
      selected: activeThemeName === "dark",
    },
    {
      id: "system",
      name: languages.system,
      selected: activeThemeName === "system",
    },
  ]);

  const handleThemeChange = (id) => {
    setThemes((prev) => {
      return prev.map((theme) => {
        if (theme.id === id) {
          theme.selected = true;
          dispatch(setThemeName(theme.id));
        } else {
          theme.selected = false;
        }
        return theme;
      });
    });
  };
  const barStyles = (index, length) => {
    const styles = StyleSheet.create({
      borderColor: index !== length ? theme.borderColor : null,
      borderStyle: index !== length ? "solid" : null,
      borderBottomWidth: index !== length ? 1 : null,
      borderTopRightRadius: !index ? 10 : null,
      borderTopLeftRadius: !index ? 10 : null,
      borderBottomRightRadius: index === length ? 10 : null,
      borderBottomLeftRadius: index === length ? 10 : null,
    });
    return styles;
  };

  const dispatch = useDispatch();

  return (
    <View style={{ backgroundColor: theme.background, ...styles.container }}>
      <View style={{ ...styles.themesContainer }}>
        {themes.map((currTheme, index, { length }) => (
          <TouchableOpacity
            key={currTheme.id}
            onPress={() =>
              !currTheme.selected && handleThemeChange(currTheme.id)
            }
            style={{
              ...styles.theme,
              ...barStyles(index, length - 1),
              backgroundColor: theme.navigator,
            }}
          >
            <Text style={{ color: theme.text }}>{currTheme.name}</Text>
            {currTheme.selected ? (
              <View
                style={{
                  ...styles.selected,
                  backgroundColor: theme.background,
                }}
              >
                <Text style={{ color: theme.text }}>✓</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ThemeScreen;
