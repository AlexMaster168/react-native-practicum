import { MD3DarkTheme, MD3LightTheme, configureFonts } from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from 'expo-router';

const MAIN_LIGHT = '#3949AB';
const MAIN_DARK = '#9FA8DA';
const DANGER_LIGHT = '#E53935';
const DANGER_DARK = '#FF6B6B';

const fonts = configureFonts({ config: { fontFamily: 'roboto-regular' } });

export const lightTheme = {
  ...MD3LightTheme,
  fonts,
  colors: {
    ...MD3LightTheme.colors,
    primary: MAIN_LIGHT,
    error: DANGER_LIGHT,
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  fonts,
  colors: {
    ...MD3DarkTheme.colors,
    primary: MAIN_DARK,
    error: DANGER_DARK,
  },
};

export type AppTheme = typeof lightTheme;

export const navigationLightTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: MAIN_LIGHT,
    background: lightTheme.colors.background,
    card: lightTheme.colors.elevation.level2,
    text: lightTheme.colors.onSurface,
    border: lightTheme.colors.outlineVariant,
    notification: lightTheme.colors.error,
  },
};

export const navigationDarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: MAIN_DARK,
    background: darkTheme.colors.background,
    card: darkTheme.colors.elevation.level2,
    text: darkTheme.colors.onSurface,
    border: darkTheme.colors.outlineVariant,
    notification: darkTheme.colors.error,
  },
};
