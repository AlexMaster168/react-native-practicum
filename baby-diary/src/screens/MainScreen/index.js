import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataTC,
  setDateSuccess,
  setDream as setCurrentDreams,
} from "../../redux/reducers/mainReducer";
import {
  DateNumber,
  EmptyBlock,
  StatisticsOnce,
  Button,
  DreamItem,
  CenterBlock,
  RateApp,
} from "../../components";
import { styles } from "./styles";
import { accent } from "../../core/colors";
import { calcTimeEvents } from "../../utils/calcTime";
import AdBanner from "../../components/AdBanner";
import plus from "../../images/icons/ic_plus.png";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import useDeviceWidth from "../../hooks/useDeviceWidth";

const _renderDreams = (
  dreams,
  languages,
  date,
  theme,
  // activeDream,
  wake,
  isPlanned
) =>
  dreams.map((dream, index) => {
    return (
      <React.Fragment key={index}>
        {dream && (
          <DreamItem
            dreams={dreams}
            isPlanned={isPlanned}
            wake={wake ? wake[dreams.length - index - 1] : null}
            languages={languages}
            dream={dream}
            date={date}
            theme={theme}
            // activeDream={activeDream}
          />
        )}
      </React.Fragment>
    );
  });

const sortDreamsByTime = (dreams) => {
  return dreams.sort((a, b) => {
    const [aHour, aMinute] = a.startTime.split(":");
    const [bHour, bMinute] = b.startTime.split(":");
    const dateA = moment(a.startDate)
      .set("hour", aHour)
      .set("minute", aMinute)
      .toDate();
    const dateB = moment(b.startDate)
      .set("hour", bHour)
      .set("minute", bMinute)
      .toDate();
    return dateB - dateA;
  });
};

const Main = ({
  dreams,
  date,
  statisticSection,
  yesterdayDreams,
  tomorrowDreams,
  startDreamTC,
  endDreamTC,
  activeChild,
  theme,
  setLaunchNumber,
  indicator,
  gesture,
  curTime,
  currentRecommendation,
  activeLaunchNumber,
}) => {
  // const activeDream = dreams.find((dream) => dream.started);
  const languages = useSelector(({ app }) => app.languages);
  const currentTheme = useSelector(({ app }) => app.activeTheme);
  const currentDreams = useSelector(({ date }) => date.currentDream);

  const dispatch = useDispatch();
  const [rateVisible, setRateVisible] = useState(activeLaunchNumber === 10);
  const [listStyle, setListStyle] = useState(true);
  const { navigate } = useNavigation();
  const { blockWidth } = useDeviceWidth();

  const handleStartEndDream = () => {
    if (!currentDreams.length) {
      // !activeDream &&
      startDreamTC(moment(date), null, true, true);
    } else {
      // if (activeDream) {
      //   endDreamTC(moment(date), activeDream);
      // } else {
      console.log("🍖🍖", currentDreams);
      endDreamTC(
        moment(currentDreams[0].startDate),
        currentDreams[0],
        currentDreams[0].timeOfDay === "night" &&
          !moment(currentDreams[0].startDate).isSame(moment(), "day")
      );
      // }
    }
  };

  const getData = (date) => {
    dispatch(setDateSuccess(moment.isMoment(date) ? date : moment(date)));
    dispatch(getDataTC(moment.isMoment(date) ? date : moment(date)));
  };

  const onSwipe = (side) => {
    if (gesture) {
      if (side === "left") {
        if (!(date.format("DD MMM") === moment().format("DD MMM"))) {
          getData(moment(date.add(1, "days")));
        }
      } else {
        getData(moment(date.subtract(1, "days")));
      }
    }
  };

  const [dream, setDream] = useState([]);
  const [plannedDreams, setPlannedDreams] = useState([]);
  const [plannedChange, setPlannedChange] = useState(0);

  function _renderWakefulness(dreams, languages) {
    let arr = new Array();
    if (dreams.length >= 2)
      for (let i = dreams.length - 1; i > 0; i--)
        arr.push(
          calcTimeEvents(languages, dreams[i].endTime, dreams[i - 1].startTime)
        );
    return arr;
  }
  const checkIfPlanned = (startTime, startDate) => {
    const [startHours, startMinutes] = startTime.split(":");
    const date = moment(startDate)
      .set("hour", startHours)
      .set("minute", startMinutes)
      .set("second", 0);

    return new Date() < date.toDate();
  };

  useEffect(() => {
    const notFinishedYesterdayNightDreams = yesterdayDreams.filter(
      (dream) => moment(dream.endDate).isSame(date, "day") && !dream.endTime
    );

    const ongoingDreams = dreams.filter((dream) => {
      return (
        !dream.endTime &&
        moment(dream.startTime, "HH:mm").set("second", 0).toDate() <= new Date()
      );
    });
    dispatch(
      setCurrentDreams(notFinishedYesterdayNightDreams.concat(ongoingDreams))
    );
    console.log("EFFECT SET CURRENT", ongoingDreams);
  }, [dreams, plannedChange]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlannedDreams((prev) => {
        const newPlannedDreams = _renderDreams(
          dreams.filter((dream) =>
            checkIfPlanned(dream.startTime, dream.startDate)
          ),
          languages,
          date,
          theme,
          // activeChild,
          null,
          true
        );
        if (newPlannedDreams.length !== prev.length) {
          setPlannedChange((prev) => prev + 1);

          if (
            newPlannedDreams.length < prev.length &&
            currentDreams.length > 0
          ) {
            endDreamTC(
              moment(currentDreams[0].startDate),
              currentDreams[0],
              currentDreams[0].timeOfDay === "night"
            );
          }
        }
        return newPlannedDreams;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dreams]); // activeDream,
  useEffect(() => {
    const filtered = yesterdayDreams.filter((dream) =>
      moment(dream.endDate).isSame(date, "day")
    );
    const resultDreams = dreams
      .filter((dream) => !checkIfPlanned(dream.startTime, dream.startDate))
      .concat(filtered);
    setDream(
      _renderDreams(
        sortDreamsByTime(resultDreams),
        languages,
        date,
        theme,
        // activeDream,
        _renderWakefulness(resultDreams, languages),
        false
      )
    );
  }, [dreams, yesterdayDreams, plannedChange]); // activeDream,
  // console.log('DREAMS 👺👺👺👺');
  return (
    <View
      style={{
        ...styles.main,
        backgroundColor: theme && theme.background,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <DateNumber
          maxDate={moment().add(1, "day").toDate()}
          date={date}
          setDate={getData}
          theme={theme}
        />
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView>
          {moment(date).isSame(moment(new Date()), "day") ||
          (moment(date).isSame(moment(new Date()).add(1, "day"), "day") &&
            plannedDreams.length) ? (
            <View>{plannedDreams}</View>
          ) : null}
          {date.isSame(new Date(), "day") && (
            <TouchableOpacity
              onPress={handleStartEndDream}
              style={{
                marginVertical: 4,
                paddingBottom: 15,
                flexDirection: "row",
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 16, height: 16 }}
                source={
                  //!activeDream &&
                  currentDreams.length === 0
                    ? require("../../images/icons/play.png")
                    : require("../../images/icons/pause.png")
                }
              />
              <Text style={{ color: "#ebcc34", marginLeft: 5, fontSize: 16 }}>
                {
                  // !activeDream &&
                  currentDreams.length === 0
                    ? languages.start_sleep
                    : languages.end_sleep
                }
              </Text>
            </TouchableOpacity>
          )}
          {dream?.length ? (
            <View style={{ display: "flex", justifyContent: "center" }}>
              {dream}
              {rateVisible ? (
                <RateApp
                  rateVisible={rateVisible}
                  setLaunchNumber={setLaunchNumber}
                  language={languages}
                />
              ) : null}
              {dream?.length && (
                <View
                  style={{
                    marginTop: 20,
                    marginBottom: 60,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: blockWidth >= 450 ? 700 : "100%",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.statisticsText,
                        color: theme.text,
                      }}
                    >
                      {languages.statistics}
                    </Text>
                    <View style={styles.changeStyleBtnContainer}>
                      <TouchableOpacity
                        style={styles.changeStyleBtn}
                        onPress={() => setListStyle(false)}
                      >
                        <Image
                          style={{
                            ...style.Icon,
                            tintColor: !listStyle
                              ? currentTheme === "light"
                                ? "#ebcc34"
                                : accent
                              : theme.text,
                            marginRight: 5,
                          }}
                          source={require("../../images/icons/listmenu.png")}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.changeStyleBtn}
                        onPress={() => setListStyle(true)}
                      >
                        <Image
                          style={{
                            ...style.Icon,
                            tintColor: listStyle
                              ? currentTheme === "light"
                                ? "#ebcc34"
                                : accent
                              : theme.text,
                          }}
                          source={require("../../images/icons/tabmenu.png")}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      width: blockWidth >= 450 ? 700 : "100%",
                    }}
                  >
                    <StatisticsOnce
                      statisticSection={statisticSection}
                      dreams={dreams
                        .filter(
                          (dream) =>
                            !checkIfPlanned(dream.startTime, dream.startDate)
                        )
                        .concat(
                          yesterdayDreams.filter((dream) =>
                            moment(dream.endDate).isSame(date, "day")
                          )
                        )}
                      languages={languages}
                      yesterdayDreams={yesterdayDreams}
                      tomorrowDreams={tomorrowDreams}
                      theme={theme}
                      birthday={activeChild && activeChild.date}
                      indicator={indicator}
                      date={date}
                      curTime={curTime}
                      currentRecommendation={currentRecommendation}
                      listStyle={listStyle}
                    />
                  </View>
                </View>
              )}
            </View>
          ) : (
            <View style={{ marginTop: "50%" }}>
              <CenterBlock>
                <EmptyBlock emptyText={languages.empty_text} theme={theme} />
              </CenterBlock>
            </View>
          )}
        </ScrollView>
        <View
          style={{
            ...styles.buttonBlock,
            width: "90%",
          }}
        >
          {date.date() === moment().date() &&
            date.month() === moment().month() && (
              <Button
                style={{ ...styles.startOrEndSleepBtn }}
                buttonText={
                  currentDreams.length === 0 // !activeDream &&
                    ? languages.start_sleep
                    : languages.end_sleep
                }
                pressHandler={handleStartEndDream}
              />
            )}

          <TouchableOpacity
            style={{ alignSelf: "flex-end", flex: 1 }}
            onPress={() => navigate("NewDream", { isNew: true })}
          >
            <Image
              source={plus}
              style={{
                borderRadius: 20,
                backgroundColor: "#ebcc34",
                width: 40,
                height: 40,
                alignSelf: "flex-end",
                tintColor: "#000024",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <AdBanner />
    </View>
  );
};
export default Main;
const style = StyleSheet.create({
  Icon: {
    width: 36,
    height: 36,
    tintColor: "#fff",
  },
});
