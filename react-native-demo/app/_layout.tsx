import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';

import { TodoProvider } from '@/context/TodoContext';
import { ThemeModeProvider, useThemeMode } from '@/context/ThemeContext';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import {
  darkTheme,
  lightTheme,
  navigationDarkTheme,
  navigationLightTheme,
} from '@/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'roboto-regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('../assets/fonts/Roboto-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeModeProvider>
        <TodoProvider>
          <ThemedApp />
        </TodoProvider>
      </ThemeModeProvider>
    </GestureHandlerRootView>
  );
}

function ThemedApp() {
  const { mode } = useThemeMode();
  const systemScheme = useColorScheme();
  const isDark = mode === 'system' ? systemScheme === 'dark' : mode === 'dark';

  const paperTheme = isDark ? darkTheme : lightTheme;
  const navTheme = isDark ? navigationDarkTheme : navigationLightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={navTheme}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <Stack
          screenOptions={{
            headerRight: ({ tintColor }) => <ThemeToggleButton color={tintColor} />,
          }}
        >
          <Stack.Screen name="index" options={{ title: 'Мои дела' }} />
          <Stack.Screen name="todo/[id]" options={{ title: 'Задача' }} />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}
