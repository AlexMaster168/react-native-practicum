import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";
import { styles } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";
import plus from "../../images/icons/ic_plus.png";
import { Button, AdBanner } from "../../components";

import MultiSlider from "@ptomasroos/react-native-multi-slider";
const deviceWidth = Dimensions.get("window").width;
import { accent } from "../../core/colors";
import { setRecomendtationRest } from "../../redux/reducers/directoryReducer";
import { SafeAreaView } from "react-native-safe-area-context";

const Recommendations = () => {
  const formatTime = (seconds) => {
    if (seconds === undefined) return "";
    let m = Math.floor((seconds / 60) % 60).toString();
    let h = Math.floor((seconds / 60 / 60) % 60).toString();
    return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
  };
  const theme = useSelector(({ app }) => app.activeTheme);

  const recomendtationRest = useSelector(
    ({ directory }) => directory.recomendtationRest
  );
  console.log(recomendtationRest);
  const formatAge = (age) => {
    if (age === undefined) return "";
    else if (age < 12) return `${age} ${languages.month}`;
    else if (age >= 12 && age < 24)
      return `1 ${languages.year[0]} ${age - 12} ${languages.month}`;
    else if (age >= 24 && age < 36)
      return `2 ${languages.year[0]} ${age - 24} ${languages.month}`;
    else if (age === 36) return `3 ${languages.year[0]}`;
  };
  const addedRecomendation = () => {
    const recomendtatin = {
      age: `${languages.of} ${formatAge(ageBaby[0])} ${
        languages.to
      } ${formatAge(ageBaby[1])}`,
      nightSleep: `${formatTime(nightSleep[0])}-${formatTime(nightSleep[1])} `,
      daySleep: `${formatTime(daySleep[0])}-${formatTime(daySleep[1])} `,
      countSleep: `${sumDaySleep[0]}-${sumDaySleep[1]}`,
      awaikTime: `${formatTime(awaikTime[0])}-${formatTime(awaikTime[1])} `,
      range_age: ageBaby,
    };

    setRecommendationList([..._recommendationList, recomendtatin]);

    setVisibleModal(!visibleModal);
  };
  const dispatch = useDispatch();
  const { params } = useRoute();
  const languages = useSelector(({ app }) => app.languages);
  const constRecomendation = [
    {
      age: `${languages.of} 0 ${languages.to} 1 ${languages.month}  `,
      nightSleep: `8 - 9  `,
      daySleep: "7 - 9  ",
      countSleep: "3 - 6",
      range_age: [0, 1],
    },
    {
      age: `1 ${languages.month} `,
      nightSleep: "8 - 9  ",
      daySleep: "7 - 9  ",
      countSleep: "3 - 6",
      range_age: [1, 1],
    },
    {
      age: `2 ${languages.month} `,
      nightSleep: "8 - 9  ",
      daySleep: "7 - 9  ",
      countSleep: "3 - 6",
      range_age: [2, 2],
    },
    {
      age: `3 ${languages.month} `,
      nightSleep: "9 - 10  ",
      daySleep: "4 - 5  ",
      countSleep: "3 - 5",
      range_age: [3, 3],
    },
    {
      age: `4 ${languages.month} `,
      nightSleep: "10 - 11  ",
      daySleep: "4 - 5  ",
      countSleep: "2 - 3",
      range_age: [4, 4],
    },
    {
      age: `5 ${languages.month} `,
      nightSleep: "10 - 12  ",
      daySleep: "3 - 4  ",
      countSleep: "2 - 3",
      range_age: [5, 5],
    },
    {
      age: `6 ${languages.month} `,
      nightSleep: "10 - 12  ",
      daySleep: "3 - 4  ",
      countSleep: "2 - 3",
      range_age: [6, 6],
    },
    {
      age: `7 ${languages.month} `,
      nightSleep: "10 - 12  ",
      daySleep: "3 - 3,5  ",
      countSleep: "2 - 3",
      range_age: [7, 7],
    },
    {
      age: `8 ${languages.month} `,
      nightSleep: "10 - 12  ",
      daySleep: "3 - 3,5  ",
      countSleep: "2 - 3",
      range_age: [8, 8],
    },
    {
      age: `9 ${languages.month} `,
      nightSleep: "10 - 12  ",
      daySleep: "2 - 3  ",
      countSleep: "2 - 3",
      range_age: [9, 9],
    },
    {
      age: ` ${languages.of} 10 ${languages.month}  ${languages.to} 1 ${languages.year[0]} `,
      nightSleep: "10 - 12  ",
      daySleep: "2 - 3 часа",
      countSleep: "2",
      range_age: [10, 12],
    },
    {
      age: ` ${languages.of} 1 ${languages.year[0]}  ${languages.to} 1 ${languages.year[0]} 6 ${languages.month}`,
      nightSleep: "10 - 12  ",
      daySleep: "1,5 - 3  ",
      countSleep: "1 - 2",
      range_age: [12, 18],
    },
    {
      age: ` ${languages.of} 1 ${languages.year[0]} 6 ${languages.month}  ${languages.to} 3  ${languages.year[1]}`,
      nightSleep: "10 - 11  ",
      daySleep: "1,5 - 2  ",
      countSleep: "1",
      range_age: [18, 36],
    },
  ];

  const [_recommendationList, setRecommendationList] =
    useState(constRecomendation);
  const [visibleModal, setVisibleModal] = useState(false);
  const [ageBaby, setAgeBaby] = useState([0, 36]);
  const [nightSleep, setNightSleep] = useState([0, 86400]);
  const [daySleep, setDaySleep] = useState([0, 86400]);
  const [sumDaySleep, setSumDaySleep] = useState([0, 10]);
  const [awaikTime, setAwaikTime] = useState([0, 86400]);
  const [val, setVal] = useState(false);
  useEffect(() => {
    if (recomendtationRest) {
      setRecommendationList(constRecomendation);
      dispatch(setRecomendtationRest(false));
    }
  }, [recomendtationRest, theme]);
  const [listSliders, setListSliders] = useState();
  useEffect(() => {
    setListSliders(
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ ...styles.text, color: theme.text }}>
            {languages.age_baby}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setAgeBaby([0, 36]);
            }}
          >
            <Text style={{ ...styles.text, color: theme.text }}>
              {languages.reset}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{
              ...styles.container_slider,
              backgroundColor: theme.navigator,
            }}
          >
            <MultiSlider
              trackStyle={{ backgroundColor: accent }}
              selectedStyle={{ backgroundColor: "#ebcc34" }}
              max={36}
              values={[ageBaby[0], ageBaby[1]]}
              isMarkersSeparated={true}
              onValuesChange={(value) => {
                setAgeBaby(value);
              }}
              customMarkerLeft={(e) => (
                <View
                  style={{
                    borderRadius: 50,
                    height: 20,
                    width: 20,
                    borderWidth: 0.5,
                    borderColor: "#fff",
                    backgroundColor: "#bd6d1c",
                  }}
                ></View>
              )}
              customMarkerRight={(e) => (
                <View
                  style={{
                    borderRadius: 50,
                    height: 20,
                    width: 20,
                    borderWidth: 0.5,
                    borderColor: "#fff",
                    backgroundColor: "#ebcc34",
                  }}
                ></View>
              )}
              minMarkerOverlapDistance={3}
              sliderLength={deviceWidth - 60}
            />
            {ageBaby[0] !== 0 ? (
              <Text style={{ ...styles.text, color: theme.text }}>
                {languages.of} {formatAge(ageBaby[0])} {languages.to}{" "}
                {formatAge(ageBaby[1])}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ ...styles.text, color: theme.text }}>
              {languages.duration_night_sleep}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setNightSleep([0, 86400]);
              }}
            >
              <Text style={{ ...styles.text, color: theme.text }}>
                {languages.reset}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              ...styles.container_slider,
              backgroundColor: theme.navigator,
            }}
          >
            <MultiSlider
              trackStyle={{ backgroundColor: accent }}
              selectedStyle={{ backgroundColor: "#a5db7f" }}
              min={0}
              max={86400}
              values={[nightSleep[0], nightSleep[1]]}
              isMarkersSeparated={true}
              onValuesChange={(value) => setNightSleep(value)}
              customMarkerLeft={(e) => (
                <View
                  style={{
                    borderRadius: 50,
                    height: 20,
                    width: 20,
                    backgroundColor: "#bd6d1c",
                  }}
                ></View>
              )}
              customMarkerRight={(e) => (
                <View
                  style={{
                    borderRadius: 50,
                    height: 20,
                    width: 20,
                    backgroundColor: "#ebcc34",
                  }}
                ></View>
              )}
              minMarkerOverlapDistance={3}
              sliderLength={deviceWidth - 60}
            />
            {nightSleep[0] !== 0 ? (
              <Text style={{ ...styles.text, color: theme.text }}>
                {languages.of} {formatTime(nightSleep[0])} {languages.to}{" "}
                {formatTime(nightSleep[1])}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ ...styles.text, color: theme.text }}>
              {languages.duration_day_sleep}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setDaySleep([0, 86400]);
              }}
            >
              <Text style={{ ...styles.text, color: theme.text }}>
                {languages.reset}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              ...styles.container_slider,
              backgroundColor: theme.navigator,
            }}
          >
            <MultiSlider
              trackStyle={{ backgroundColor: accent }}
              selectedStyle={{ backgroundColor: "#a5db7f" }}
              max={86400}
              values={[daySleep[0], daySleep[1]]}
              onValuesChange={(value) => setDaySleep(value)}
              isMarkersSeparated={true}
              customMarkerLeft={(e) => (
                <View
                  style={{
                    borderRadius: 50,
                    height: 20,
                    width: 20,
                    backgroundColor: "#bd6d1c",
                  }}
                ></View>
              )}
              customMarkerRight={(e) => (
                <View
                  style={{
                    borderRadius: 50,
                    height: 20,
                    width: 20,
                    backgroundColor: "#ebcc34",
                  }}
                ></View>
              )}
              minMarkerOverlapDistance={3}
              sliderLength={deviceWidth - 60}
            />
            {daySleep[0] !== 0 ? (
              <Text style={{ ...styles.text, color: theme.text }}>
                {languages.of} {formatTime(daySleep[0])} {languages.to}{" "}
                {formatTime(daySleep[1])}
              </Text>
            ) : null}
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ ...styles.text, color: theme.text }}>
              {languages.count_day_sleep}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSumDaySleep([0, 10]);
              }}
            >
              <Text style={{ ...styles.text, color: theme.text }}>
                {languages.reset}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              ...styles.container_slider,
              backgroundColor: theme.navigator,
            }}
          >
            <MultiSlider
              trackStyle={{ backgroundColor: accent }}
              selectedStyle={{ backgroundColor: "#a5db7f" }}
              max={10}
              values={[sumDaySleep[0], sumDaySleep[1]]}
              step={1}
              onValuesChange={(value) => setSumDaySleep(value)}
              isMarkersSeparated={true}
              customMarkerLeft={(e) => (
                <View
                  style={{
                    borderRadius: 50,
                    height: 20,
                    width: 20,
                    backgroundColor: "#bd6d1c",
                  }}
                ></View>
              )}
              customMarkerRight={(e) => (
                <View
                  style={{
                    borderRadius: 50,
                    height: 20,
                    width: 20,
                    backgroundColor: "#ebcc34",
                  }}
                ></View>
              )}
              minMarkerOverlapDistance={3}
              sliderLength={deviceWidth - 60}
            />
            {sumDaySleep[0] !== 0 ? (
              <Text style={{ ...styles.text, color: theme.text }}>
                {languages.of} {sumDaySleep[0]} {languages.to} {sumDaySleep[1]}
              </Text>
            ) : null}
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ ...styles.text, color: theme.text }}>
              {languages.duration_wakefulness}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setAwaikTime([0, 86400]);
              }}
            >
              <Text style={{ ...styles.text, color: theme.text, fontSize: 13 }}>
                {languages.reset}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              ...styles.container_slider,
              backgroundColor: theme.navigator,
            }}
          >
            <MultiSlider
              trackStyle={{ backgroundColor: accent }}
              selectedStyle={{ backgroundColor: "#a5db7f" }}
              min={0}
              max={86400}
              values={[0, 86400]}
              onValuesChange={(value) => setAwaikTime(value)}
              isMarkersSeparated={true}
              customMarkerLeft={(e) => (
                <View
                  style={{
                    borderRadius: 50,
                    height: 20,
                    width: 20,
                    backgroundColor: "#bd6d1c",
                  }}
                ></View>
              )}
              customMarkerRight={(e) => (
                <View
                  style={{
                    borderRadius: 50,
                    height: 20,
                    width: 20,
                    backgroundColor: "#ebcc34",
                  }}
                ></View>
              )}
              minMarkerOverlapDistance={3}
              sliderLength={deviceWidth - 60}
            />
            {awaikTime[0] !== 0 ? (
              <Text style={{ ...styles.text, color: theme.text }}>
                {languages.of} {formatTime(awaikTime[0])} {languages.to}{" "}
                {formatTime(awaikTime[1])}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    );
  }, [
    theme,
    visibleModal,
    ageBaby,
    nightSleep,
    daySleep,
    sumDaySleep,
    awaikTime,
    val,
  ]);
  return (
    <React.Fragment>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.background,
          paddingVertical: 10,
        }}
      >
        <View>
          <ScrollView style={{ padding: 10 }}>
            {_recommendationList.map((recommendation, index) => (
              <View
                style={{
                  ...styles.recommendationItem,
                  backgroundColor: theme.navigator,
                }}
                key={index}
              >
                <Text
                  style={{
                    ...styles.recommendationTitle,
                    color: theme.text,
                  }}
                >
                  <Text
                    style={{
                      ...{ ...styles.recommendationValue, color: theme.text },
                      color: accent,
                    }}
                  >
                    {recommendation.age}
                  </Text>
                </Text>
                <Text
                  style={{
                    ...styles.recommendationTitle,
                    fontSize: 11,
                    color: theme.text,
                  }}
                >
                  {languages.duration_night_sleep}:{"  "}
                  <Text
                    style={{
                      ...styles.recommendationValue,
                      color: theme.text,
                    }}
                  >
                    {recommendation.nightSleep}
                    {languages.hours[1]}
                  </Text>
                </Text>
                <Text
                  style={{
                    ...styles.recommendationTitle,
                    fontSize: 11,
                    color: theme.text,
                  }}
                >
                  {languages.duration_day_sleep}:{"  "}
                  <Text
                    style={{
                      ...styles.recommendationValue,
                      color: theme.text,
                    }}
                  >
                    {recommendation.daySleep} {languages.hours[1]}
                  </Text>
                </Text>
                <Text
                  style={{
                    ...styles.recommendationTitle,
                    fontSize: 11,
                    color: theme.text,
                  }}
                >
                  {languages.day_sleep_count}:{"  "}
                  <Text
                    style={{
                      ...styles.recommendationValue,
                      color: theme.text,
                    }}
                  >
                    {recommendation.countSleep}
                  </Text>
                </Text>
                {recommendation.awaikTime ? (
                  <Text
                    style={{
                      ...styles.recommendationTitle,
                      color: theme && theme.text,
                    }}
                  >
                    {languages.wakefulness}:{" "}
                    <Text
                      style={{
                        ...styles.recommendationValue,
                        color: theme.text,
                      }}
                    >
                      {recommendation.awaikTime}
                    </Text>
                  </Text>
                ) : null}
              </View>
            ))}
            <View
              style={{
                ...styles.recommendationItem,
                backgroundColor: theme.navigator,
                marginBottom: 30,
                padding: 20,
              }}
            >
              <Text
                style={{ color: theme.text, textAlign: "left", fontSize: 12 }}
              >
                {languages.info}
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      <View style={{ width: "100%" }}>
        <TouchableOpacity
          style={{
            padding: 5,
            right: 10,
            top: -80,
            zIndex: 1,
            position: "absolute",
          }}
          onPress={() => setVisibleModal(!visibleModal)}
        >
          <Image
            source={plus}
            style={{
              borderRadius: 5,
              backgroundColor: "#ebcc34",
              width: 32,
              height: 32,
              alignSelf: "flex-end",
              tintColor: accent,
            }}
          />
        </TouchableOpacity>
      </View>
      <Modal
        visible={visibleModal}
        flex={1}
        onRequestClose={() => setVisibleModal(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: theme.background,
          }}
        >
          <View
            style={{
              paddingTop: 25,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: theme.background,
              }}
              onPress={() => setVisibleModal(false)}
            >
              <Image
                source={require("../../images/icons/ic_arrow_left.png")}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: theme.text,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                ...{ ...styles.recommendationValue, color: theme.text },
                marginLeft: 5,
              }}
            >
              Редактор норм
            </Text>
          </View>
          <View
            style={{
              paddingBottom: 60,
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            {listSliders}

            <Button
              buttonText={languages.save}
              pressHandler={addedRecomendation}
            />
          </View>
        </View>
      </Modal>
      <AdBanner />
    </React.Fragment>
  );
};

export default Recommendations;
const style = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center",
  },
});
