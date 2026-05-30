import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as ReduxProvider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';

import { store } from '@/store';
import { useAppSelector } from '@/store/hooks';
import { selectThemeMode } from '@/store/uiSlice';
import { initDb } from '@/db/posts';
import {
  darkTheme,
  lightTheme,
  navigationDarkTheme,
  navigationLightTheme,
} from '@/theme';

// Держим сплэш на экране, пока не загрузятся шрифты и не поднимется БД.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'open-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
    'open-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
  });
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    initDb()
      .catch((e) => console.error('Ошибка инициализации БД:', e))
      .finally(() => setDbReady(true));
  }, []);

  useEffect(() => {
    if ((fontsLoaded || fontError) && dbReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, dbReady]);

  if ((!fontsLoaded && !fontError) || !dbReady) {
    return null;
  }

  return (
    <ReduxProvider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemedApp />
      </GestureHandlerRootView>
    </ReduxProvider>
  );
}

function ThemedApp() {
  const mode = useAppSelector(selectThemeMode);
  const systemScheme = useColorScheme();
  const isDark = mode === 'system' ? systemScheme === 'dark' : mode === 'dark';

  const paperTheme = isDark ? darkTheme : lightTheme;
  const navTheme = isDark ? navigationDarkTheme : navigationLightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={navTheme}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <Stack>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="post/[id]" options={{ title: 'Пост' }} />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}
