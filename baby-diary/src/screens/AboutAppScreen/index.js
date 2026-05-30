import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import AdBanner from "../../components/AdBanner";
import { accent } from "../../core/colors";

const AboutAppScreen = () => {
  const { params } = useRoute();
  const languages = useSelector(({ app }) => app.languages);
  const theme = useSelector(({ app }) => app.activeTheme);

  const _sendEmail = async () => {
    const targetEmail = "obeycats18@gmail.com";
    const subject = "Дневник малыша: Сон";
    const url = `mailto:${targetEmail}?subject=${subject}`;

    if (await Linking.canOpenURL(url)) {
      await Linking.openURL(url);
    } else {
      Alert.alert(languages.rate_alert[0], languages.rate_alert[1]);
    }
  };

  // rate app in appStore or Play Market
  const _onRate = async () => {
    const packageId =
      Platform.OS !== "ios"
        ? "sleep.children.dream.baby.diary.babyDiary.night"
        : "id1636333703";
    const urlAndroid = `market://details?id=${packageId}`;
    const urlIos = `itms://itunes.apple.com/in/app/apple-store/${packageId}`;
    const url = Platform.OS !== "ios" ? urlAndroid : urlIos;
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log(error);
      alert(languages.rate_alert[0], languages.rate_alert[1]);
    }
  };

  return (
    <React.Fragment>
      <View
        style={{
          ...styles.about_container,
          backgroundColor: theme.background,
        }}
      >
        <Text style={{ ...styles.baby_diary, color: theme.text }}>
          {languages.baby_diary}
        </Text>
        <Text style={{ ...styles.version, color: theme.text }}>
          {languages.version}: 2020.06.24
        </Text>
        <Text style={{ ...styles.about_app_desc, color: theme.text }}>
          {languages.about_app_desc}
        </Text>
        <View style={{ ...styles.buttonsBlock }}>
          <TouchableOpacity
            style={{ ...styles.aboutButton, backgroundColor: theme.navigator }}
            onPress={_onRate}
          >
            <Image
              style={styles.aboutButtonIcon}
              source={require("../../images/icons/ic_rate.png")}
              tintColor={accent || "#ffffff"}
            />
            <Text style={{ color: theme.text }}>{languages.rate_app}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.aboutButton, backgroundColor: theme.navigator }}
            onPress={_sendEmail}
          >
            <Image
              style={styles.aboutButtonIcon}
              source={require("../../images/icons/ic_feedback.png")}
              tintColor={accent || "#ffffff"}
            />
            <Text style={{ color: theme.text }}>{languages.send_feedback}</Text>
          </TouchableOpacity>
          <View
            style={{ ...styles.aboutButton, backgroundColor: theme.navigator }}
          >
            <Image
              source={require("../../images/icons/ic_tab_about.png")}
              style={styles.aboutButtonIcon}
              tintColor={accent || "#ffffff"}
            />
            <Text style={{ color: theme.text }}>{languages.resurs_link}</Text>
          </View>
        </View>
      </View>
      <AdBanner />
    </React.Fragment>
  );
};

export default AboutAppScreen;
