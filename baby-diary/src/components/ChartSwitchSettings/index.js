import React, { useState } from "react";
import { View, Text, Dimensions, Switch } from "react-native";
import { styles } from "./styles";
import Modal from "react-native-modal";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const ChartSwitchSettings = ({
  modalVisible,
  setModalVisible,
  chartSettings,
  setChartSettings,
  languages,
}) => {
  const [settings, setSettings] = useState(chartSettings);

  return (
    <React.Fragment>
      <Modal
        animationType="slide"
        hideModalContentWhileAnimating
        visible={modalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
          setChartSettings(settings);
        }}
        backdropOpacity={0.4}
        style={styles.modalContainer}
      >
        <View
          style={{
            ...styles.modalContent,
            width: deviceWidth,
            height: deviceHeight / 2,
          }}
        >
          <View
            style={{
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Text style={styles.currentText}>{languages.graph_settings}</Text>
          </View>
          <View>
            {settings &&
              settings.map((currentSetting, index) => {
                return (
                  <View style={styles.currentSetting} key={index}>
                    <View style={styles.currentSettingItem}>
                      <Text style={styles.currentText}>
                        {languages[currentSetting.nameOfChart]}
                      </Text>
                      <Switch
                        onValueChange={() => {
                          let result = [...settings];
                          result[index].chart = !result[index].chart;
                          result[index].label = false;
                          setSettings(result);
                        }}
                        value={settings[index].chart}
                        trackColor={{
                          true: currentSetting.chartColor,
                          false: "#dcdcde",
                        }}
                        thumbColor={
                          settings[index].chart
                            ? currentSetting.chartColor
                            : "#dcdcde"
                        }
                      />
                    </View>
                    <View style={styles.currentSettingItem}>
                      <Text style={styles.currentText}>
                        {languages.labels_on_the_chart}
                      </Text>
                      <Switch
                        disabled={!settings[index].chart}
                        onValueChange={() => {
                          let result = [...settings];
                          result[index].label = !result[index].label;
                          setSettings(result);
                        }}
                        value={settings[index].label}
                        trackColor={{
                          true: currentSetting.chartColor,
                          false: "#dcdcde",
                        }}
                        thumbColor={
                          settings[index].label
                            ? currentSetting.chartColor
                            : "#dcdcde"
                        }
                      />
                    </View>
                  </View>
                );
              })}
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
};

export default ChartSwitchSettings;
