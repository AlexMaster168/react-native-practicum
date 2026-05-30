import React, { useState, useEffect, useCallback } from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store/store";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ReduxNetworkProvider } from "react-native-offline";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LaunchScreen } from "./src/screens";
import "react-native-reanimated";
import { SheetProvider } from "react-native-actions-sheet";
import "./src/components/ActionSheet/sheets";
import * as Notifications from "expo-notifications";

try {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
} catch (e) {
  console.warn("setNotificationHandler failed:", e?.message);
}

// Держим сплэш до готовности приложения
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({});
      } catch (e) {
        console.warn(e);
      } finally {
        setReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      await SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <Provider store={store}>
          <ReduxNetworkProvider>
            <SheetProvider>
              <ActionSheetProvider>
                <LaunchScreen />
              </ActionSheetProvider>
            </SheetProvider>
          </ReduxNetworkProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
