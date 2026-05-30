import moment from "moment";
import React, { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { calcTotalSleep, calcWakefulness } from "../../utils/calcStatistics";
import { renderTime } from "../../utils/renderTime";
import { styles } from "./styles";
import Modal from "react-native-modal";
import { ScrollView } from "react-native-gesture-handler";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const renderRatios = ({
  dreams,
  setVisible,
  visible,
  modalTitle,
  setModalTitle,
  day,
  languages,
  theme,
}) => {
  const { daySleep, nightSleep, wakefullness } = getRatioValues(dreams);
  const sum =
    daySleep.totalMinutes + nightSleep.totalMinutes + Math.abs(wakefullness);
  const daySleepRatio = (daySleep.totalMinutes * 100) / sum;
  const nightSleepRatio = (nightSleep.totalMinutes * 100) / sum;
  const wakefulnessRatio = (wakefullness * 100) / sum;

  return (
    <>
      <Modal
        isVisible={visible}
        onBackButtonPress={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
        hideModalContentWhileAnimating
        backdropOpacity={0.4}
        style={{ ...styles.modalContainer }}
      >
        <View
          style={{
            ...styles.modalContent,
            backgroundColor: theme.background,
            width: deviceWidth,
            height: deviceHeight / 4,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: theme.text,
            }}
          >
            {modalTitle.title}
          </Text>
          <Text style={{ opacity: 0.5, fontSize: 16, color: theme.text }}>
            {moment(day).format("DD MMM")}
          </Text>
          <ScrollView
            style={{
              backgroundColor: theme.navigator,
              borderRadius: 10,
              paddingHorizontal: 10,
              marginTop: 10,
            }}
          >
            {dreams.map((dream) =>
              dream.timeOfDay === modalTitle.value ? (
                <Text
                  style={{
                    fontWeight: "bold",
                    marginVertical: 3,
                    color: theme.text,
                  }}
                >
                  {dream.startTime} - {dream.endTime}
                </Text>
              ) : modalTitle.value === "wake" ? (
                <Text style={{ fontWeight: "bold", color: theme.text }}>
                  {Math.abs(dream.wakefulness.inMinutes)} {languages.minutes[1]}
                </Text>
              ) : null
            )}
            <Text style={{ marginTop: 5, color: theme.text }}>
              {languages.overall}:{" "}
              {modalTitle.value === "day"
                ? renderTime(daySleep)
                : modalTitle.value === "night"
                ? renderTime(nightSleep)
                : renderTime(calcWakefulness(dreams), languages)}
            </Text>
          </ScrollView>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
          setModalTitle({ title: languages.day_sleep, value: "day" });
        }}
        style={{
          backgroundColor: "#f38216",
          position: "absolute",
          left: 0,
          width: daySleepRatio + "%",
          height: "100%",
        }}
      ></TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
          setModalTitle({ title: languages.night_sleep, value: "night" });
        }}
        style={{
          backgroundColor: "#023ebb",
          position: "absolute",
          width: nightSleepRatio + "%",
          left: daySleepRatio + "%",
          height: "100%",
        }}
      ></TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
          setModalTitle({ title: languages.awake_time, value: "wake" });
        }}
        style={{
          backgroundColor: "#ff2903",
          width: wakefulnessRatio + "%",
          left: nightSleepRatio + daySleepRatio + "%",
          position: "absolute",
          height: "100%",
        }}
      ></TouchableOpacity>
    </>
  );
};

const calcTime = ({ minutes, hours }) => {
  if (minutes > 59) {
    hours += Math.floor(minutes / 60);
    minutes %= 60;
  }
  return { minutes, hours };
};

const getSum = (dreams) => {
  const { daySleep, nightSleep } = getRatioValues(dreams);
  const wakefulnessObj = calcWakefulness(dreams);
  const sumObj = {
    minutes: daySleep.minutes + nightSleep.minutes + wakefulnessObj.minutes,
    hours: daySleep.hours + nightSleep.hours + wakefulnessObj.hours,
  };
  return renderTime(calcTime(sumObj));
};

const getRatioValues = (dreams) => {
  const daySleep = calcTotalSleep(
    dreams?.filter((dream) => dream.timeOfDay === "day")
  );
  const nightSleep = calcTotalSleep(
    dreams?.filter((dream) => dream.timeOfDay === "night")
  );
  const wakefullness =
    Math.abs(
      dreams.reduce((sum, dream) => sum + dream.wakefulness?.inMinutes, 0)
    ) || 0;
  return {
    wakefullness,
    daySleep,
    nightSleep,
  };
};

const RatioDiagramBar = ({ day, dreams }) => {
  const theme = useSelector(({ app }) => app.activeTheme);
  const languages = useSelector(({ app }) => app.languages);

  const [visible, setVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState({
    title: languages.day_sleep,
    value: "day",
  });

  const { daySleep, nightSleep, wakefullness } = getRatioValues(dreams);
  const sum =
    daySleep.totalMinutes + nightSleep.totalMinutes + Math.abs(wakefullness);
  const wakefulnessRatio = (wakefullness * 100) / sum;

  return (
    <View style={{ ...styles.ratioColumn, width: deviceWidth }}>
      <Text
        style={{
          color: theme.text || "#ffffff",
          flexBasis: "12.5%",
          textAlign: "center",
        }}
      >
        {moment(day).format("DD.MM")}
      </Text>
      <View
        style={{
          flexBasis: "70%",
        }}
      >
        <View
          style={{
            position: "absolute",
            left: 0,
            top: -17,
            flexDirection: "row",
          }}
        >
          {daySleep.totalMinutes > 0 ? (
            <Text style={{ color: "#f38216" }}>
              {renderTime(daySleep, languages)}{" "}
            </Text>
          ) : null}
          {nightSleep.totalMinutes > 0 ? (
            <Text style={{ color: "#023ebb" }}>
              {renderTime(nightSleep, languages)}{" "}
            </Text>
          ) : null}
          {wakefulnessRatio > 0 ? (
            <Text style={{ color: "#ff2903" }}>
              {renderTime(calcWakefulness(dreams), languages)}
            </Text>
          ) : null}
        </View>
        <View
          style={{
            borderRadius: 10,
            height: 40,
            backgroundColor: theme.navigator,
            overflow: "hidden",
          }}
        >
          {dreams?.length ? (
            renderRatios({
              dreams,
              setVisible,
              visible,
              modalTitle,
              setModalTitle,
              languages,
              day,
              theme,
            })
          ) : (
            <Text style={{ ...styles.noData, color: theme.text }}>
              {languages.no_data}
            </Text>
          )}
        </View>
      </View>
      <Text
        style={{
          ...styles.sumText,
          flexBasis: "12.5%",
          textAlign: "center",
          color: theme.text,
        }}
      >
        {dreams?.length ? getSum(dreams) : null}
      </Text>
    </View>
  );
};

export default RatioDiagramBar;
