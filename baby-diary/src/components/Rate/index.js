import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import Modal from "react-native-modal";
import Rate, { AndroidMarket } from "react-native-rate";
import { useSelector } from "react-redux";
import { styles } from "./styles";

const RateApp = ({ rateVisible, setLaunchNumber, language }) => {
  const [rated, setRated] = useState(false);
  const [isVisible, setIsVisible] = useState(rateVisible);
  const theme = useSelector(({ app }) => app.activeTheme);

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={() => setIsVisible(false)}
      onBackdropPress={() => {
        setIsVisible(false);
        setLaunchNumber();
      }}
      style={{
        alignItems: "center",
      }}
    >
      <View
        style={{ ...styles.modalContainer, backgroundColor: theme.navigator }}
      >
        <Text style={{ color: theme.text || "#fff" }}>
          {language.rate_the_app}
        </Text>
        <Text style={{ color: theme.text || "#fff" }}>
          {language.rate_title}
        </Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonItem}>
            <Button
              style={styles.buttonItem}
              title={language.rate_the_app_button}
              onPress={() => {
                const options = {
                  // AppleAppID:"2193813192",
                  GooglePackageName: "com.babydiary", // AmazonPackageName:"com.mywebsite.myapp", // OtherAndroidURL:"http://www.randomappstore.com/app/47172391",
                  preferredAndroidMarket: AndroidMarket.Google,
                  preferInApp: false,
                  openAppStoreIfInAppFails: true, // fallbackPlatformURL:"http://www.mywebsite.com/myapp.html",
                };
                Rate.rate(options, (success) => {
                  if (success) {
                    // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
                    setRated(true);
                  }
                });
              }}
            />
          </View>
          <View style={styles.buttonItem}>
            <Button
              style={styles.buttonItem}
              title={language.refusal}
              onPress={() => {
                setIsVisible(false);
              }}
            />
          </View>
          <View style={styles.buttonItem}>
            <Button
              title={language.remind_later}
              onPress={() => {
                setLaunchNumber();
                setIsVisible(false);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
    // </View>
  );
};

export default RateApp;
