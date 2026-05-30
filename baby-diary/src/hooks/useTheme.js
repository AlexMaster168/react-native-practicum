import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { darkMode, lightMode } from "../core/colors";
import { setTheme } from "../redux/reducers/appReducer";

export const useColorTheme = () => {
  const activeThemeName = useSelector(({ app }) => app.activeThemeName);
  const activeTheme = useSelector(({ app }) => app.activeTheme);
  const systemPrefferedTheme = useColorScheme();
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeThemeName === "dark") {
      dispatch(setTheme(darkMode));
    } else if (activeThemeName === "light") {
      dispatch(setTheme(lightMode));
    } else if (activeThemeName === "system") {
      dispatch(
        setTheme(systemPrefferedTheme === "dark" ? darkMode : lightMode)
      );
    }
  }, [activeThemeName]);
  useEffect(() => {
    if (activeThemeName === "system") {
      dispatch(
        setTheme(systemPrefferedTheme === "dark" ? darkMode : lightMode)
      );
    }
  }, [systemPrefferedTheme]);

  return activeTheme;
};
