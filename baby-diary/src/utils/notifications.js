import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

// Приложение использует ЛОКАЛЬНЫЕ напоминания (scheduleNotificationAsync),
// поэтому remote push token (getExpoPushTokenAsync) не нужен — он к тому же
// ломает старт в SDK 56 (addPushTokenListener → ошибка без FCM-настройки).
export const registerForPushNotificationsAsync = async (languages) => {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
      bypassDnd: true,
    });
  }

  if (!Device.isDevice) {
    alert(languages.error, languages.token_error_no_device);
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert(languages.error, languages.token_error);
    return null;
  }

  return null;
};
