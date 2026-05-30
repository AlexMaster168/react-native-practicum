import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  Image,
  Alert,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "../index";
import {
  removeDreamTC,
  endDreamTC,
  updateDreamTC,
} from "../../redux/reducers/mainReducer";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useNavigation } from "@react-navigation/native";
import { accent, main } from "../../core/colors";
import { styles } from "./styles";
import moment from "moment";
import { SheetManager } from "react-native-actions-sheet";

import { calcDreamTime, calcTimeEvents } from "../../utils/calcTime";
import { checkForOverlap, checkForOverlapFinished } from "../../utils/dreams";
import useDeviceWidth from "../../hooks/useDeviceWidth";
const deviceWidth = Dimensions.get("window").width;
const _timeView = (dream, type, screenDate) => {
  // показывает время сна в зависимости типа (startTime, endTime), screenDate - дата текущего скрина (на котором находится юзер)
  const time = dream[type];
  const times = time && time.split(":");
  let date;
  if (type === "startTime") {
    if (!moment(screenDate).isSame(moment(dream.startDate), "day")) {
      date = moment(dream.startDate).format(", DD MMM");
    }
  } else {
    if (!moment(screenDate).isSame(moment(dream.endDate), "day")) {
      date = moment(dream.endDate).format(", DD MMM");
    }
  }
  return times ? `${times[0]}:${times[1]}${date ? date : ""}` : "";
};

function _timeLeft(startTime, languages) {
  const diff = moment.utc(moment(startTime, "HH:mm").diff(moment()));
  const hh = diff.hour();
  const mm = diff.minute();
  // const hh = moment(endTime, 'HH:mm').diff(startHours, 'hour');
  // const mm = moment(endTime, 'HH:mm').diff(startMinutes, 'minute');
  const res = `${hh > 0 ? `${hh} ${languages.hours[1]} ` : ""}${
    mm > 0 && mm < 60 ? `${mm} ${languages.minutes[1]}` : ""
  }`;

  // console.log(res);
  return res ? res : languages.less_minute;
}

function _timeDistance(startTime, endTime, startDate, endDate, languages) {
  let dd, hh, mm, endTimeHH;
  endTimeHH = endTime ? endTime.slice(0, 2) : moment().format("HH");

  dd =
    (endDate ? endDate.slice(0, 2) : moment().format("DD")) -
    startDate.slice(0, 2);
  hh = endTimeHH - startTime.slice(0, 2);
  mm =
    (endTime ? endTime.slice(3, 5) : moment().format("mm")) -
    startTime.slice(3, 5);

  if (mm > 0) {
    if (hh < 0 && hh > -24)
      if (dd !== 0) {
        hh += 24;
        dd--;
      } else {
        hh += 24;
        dd--;
      }
    if (mm < 0 && mm > -60)
      if (hh !== 0) {
        mm += 60;
        hh--;
      } else {
        mm += 60;
        hh--;
      }
    return `${dd ? dd + " " + languages.days : ""}${
      hh ? hh + " " + languages.hours[1] : ""
    } ${+"" + mm ? mm + " " + languages.minutes[1] : ""}`;
  } else if (dd > 0) {
    if (hh < 0 && hh > -24)
      if (dd !== 0) {
        hh += 24;
        dd--;
      } else {
        hh += 24;
        dd--;
      }
    if (mm < 0 && mm > -60)
      if (hh !== 0) {
        mm += 60;
        hh--;
      } else {
        mm += 60;
        hh--;
      }
    return `${dd ? dd + "" + languages.days : ""} ${
      hh ? hh + " " + languages.hours[1] : ""
    } ${+"" + mm ? mm + " " + languages.minutes[1] : ""}`;
  }
  if (hh < 1) return `${languages.less_minute}`;
  else {
    if (hh < 0 && hh > -24)
      if (dd !== 0) {
        hh += 24;
        dd--;
      } else {
        hh += 24;
        dd--;
      }
    if (mm < 0 && mm > -60)
      if (hh !== 0) {
        mm += 60;
        hh--;
      } else {
        mm += 60;
        hh--;
      }
    return `${dd ? dd + "" + languages.days : ""}${
      hh ? hh + " " + languages.hours[1] : ""
    }${+"" + mm ? mm + " " + languages.minutes[1] : ""}`;
  }
}
const _imageRender = (timeOfDay) => {
  const imgStyles = {
    ...styles.timeIcon,
    tintColor: timeOfDay === "day" ? "#E67E22" : "#587BA1",
  };
  const imgSource =
    timeOfDay === "day"
      ? require("../../images/icons/ic_day.png")
      : require("../../images/icons/ic_night.png");
  return <Image source={imgSource} style={imgStyles} />;
};

const _onOpenActionSheet = ({
  dream,
  date,
  showActionSheetWithOptions,
  navigate,
  dispatch,
  languages,
  theme,
}) => {
  const optionsForActiveDream = [
    languages.edit,
    languages.end_sleep,
    languages.delete,
    languages.tag,
    languages.comment,
    languages.sleeping_places,
    languages.cancel,
  ];
  const optionsForEndDream = [
    languages.edit,
    languages.delete,
    languages.tag,
    languages.comment,
    languages.sleeping_places,
    languages.cancel,
  ];
  let icons = [];
  dream.started
    ? (icons = [
        <Image
          style={styles.actionSheetIcon}
          source={require("../../images/icons/ic_edit.png")}
          tintColor="#7c708c"
        />,
        <Image
          style={styles.actionSheetIcon}
          source={require("../../images/icons/alarm-clock.png")}
          tintColor="#7c708c"
        />,
        <Image
          style={styles.actionSheetIcon}
          source={require("../../images/icons/delete.png")}
          tintColor="red"
        />,
        <Image
          style={styles.actionSheetIcon}
          source={require("../../images/icons/bookmarks.png")}
          tintColor="#7c708c"
        />,
        <Image
          style={styles.actionSheetIcon}
          source={require("../../images/icons/comment.png")}
          tintColor="#7c708c"
        />,
        <Image
          style={styles.actionSheetIcon}
          source={require("../../images/icons/place.png")}
          tintColor="#7c708c"
        />,
        <Image
          style={styles.actionSheetIcon}
          source={require("../../images/icons/ic_delete.png")}
          tintColor="#7c708c"
        />,
      ])
    : (icons = [
        <Image
          style={styles.actionSheetIcon}
          source={require("../../images/icons/ic_edit.png")}
          tintColor="#7c708c"
        />,
        <Image
          style={styles.actionSheetIcon}
          source={require("../../images/icons/delete.png")}
          tintColor="red"
        />,
        <Image
          style={styles.actionSheetIcon}
          source={require("../../images/icons/bookmarks.png")}
          tintColor="#7c708c"
        />,
        <Image
          style={styles.actionSheetIcon}
          source={require("../../images/icons/comment.png")}
          tintColor="#7c708c"
        />,
        <Image
          style={styles.actionSheetIcon}
          source={require("../../images/icons/place.png")}
          tintColor="#7c708c"
        />,
        <Image
          style={styles.actionSheetIcon}
          source={require("../../images/icons/ic_delete.png")}
          tintColor="#7c708c"
        />,
      ]);
  const options = dream.started ? optionsForActiveDream : optionsForEndDream;
  let cancelButtonIndex;
  dream.started ? (cancelButtonIndex = 6) : (cancelButtonIndex = 5);
  const title = `${languages.dream}: ${dream.startTime} - ${
    dream.endTime ? dream.endTime : "..."
  }`;

  const containerStyle = {
    backgroundColor: theme.navigator || "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  };
  let destructiveButtonIndex;
  dream.started ? (destructiveButtonIndex = 2) : (destructiveButtonIndex = 1);
  const titleTextStyle = { color: theme.text, fontSize: 18 };
  const textStyle = { color: theme.text };

  showActionSheetWithOptions(
    {
      options,
      destructiveButtonIndex,
      cancelButtonIndex,
      title,
      containerStyle,
      titleTextStyle,
      textStyle,
      icons,
    },
    dream.started
      ? (buttonIndex) => {
          switch (buttonIndex) {
            case 0:
              navigate("NewDream", { date, dream, isNew: false }); // входная точка для редактирования сна.
              break;
            case 1:
              dispatch(endDreamTC(date, dream));
              break;
            case 2: {
              dispatch(removeDreamTC(date, dream));
              break;
            }
            case 3: {
              SheetManager.show("mysheet", {
                date: moment(dream.startDate), // если сон с переходом на следующий день, нужна дата его начала
                dream: dream,
                typ: "tag",
              });

              break;
            }
            case 4: {
              SheetManager.show("mysheet", {
                date: moment(dream.startDate),
                dream: dream,
                typ: "comment",
              });

              break;
            }
            case 5: {
              SheetManager.show("mysheet", {
                date: moment(dream.startDate),
                dream: dream,
                typ: "place",
              });
              break;
            }

            default:
              break;
          }
        }
      : (buttonIndex) => {
          switch (buttonIndex) {
            case 0:
              navigate("NewDream", { date, dream, isNew: false }); // входная точка для редактирования сна.
              break;
            case 1:
              dispatch(removeDreamTC(date, dream));
              break;
            case 2:
              SheetManager.show("mysheet", {
                date: moment(dream.startDate),
                dream: dream,
                typ: "tag",
              });

              break;
            case 3:
              SheetManager.show("mysheet", {
                date: moment(dream.startDate),
                dream: dream,
                typ: "comment",
              });
              break;
            case 4:
              SheetManager.show("mysheet", {
                date: moment(dream.startDate),
                dream: dream,
                typ: "place",
              });
              break;

            default:
              break;
          }
        }
  );
};
const boldDigital = (languages, str) => {
  const array = new Array(...new Set(str.match(/\d+/g)));
  return array.length <= 1 ? (
    <Text>
      <Text style={{ fontWeight: "bold", fontSize: 17 }}> {array[0]} </Text>
      {languages.minutes[0]}
    </Text>
  ) : (
    <Text>
      <Text style={{ fontWeight: "bold", fontSize: 17 }}> {array[0]} </Text>
      {languages.hours[0]}
      <Text style={{ fontWeight: "bold", fontSize: 17 }}> {array[1]} </Text>
      {languages.minutes[2]}
    </Text>
  );
};
const DreamItem = ({
  key,
  dreams,
  wake,
  dream,
  date,
  languages,
  theme,
  isPlanned,
  activeDream,
}) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const activeLanguage = useSelector((app) => app.activeLanguage);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { blockWidth } = useDeviceWidth();
  const disableFeeding = useSelector(
    ({ directory }) => directory.disableFeeding
  );
  const timeLineDreams = useSelector(
    ({ statistics }) => statistics.timeLineDreams
  );
  const disableTags = useSelector(({ directory }) => directory.disableTags);
  const disablePlaces = useSelector(({ directory }) => directory.disablePlaces);
  const [distance, setDistance] = useState();

  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);

  const handleStartTimeSelect = async (time) => {
    // смена начала времени сна
    const prevDate = {
      startDate: dream.startDate,
      endDate: dream.endDate,
    };
    const payload = {
      ...dream,
      startTime: moment(time).format("HH:mm"),
    };
    setShowStartTime(false);

    if (
      moment(time).set("date", prevDate.startDate).toDate() >
      moment(dream.endTime, "HH:mm").set("date", prevDate.endDate).toDate()
    ) {
      Alert.alert(languages.error, languages.end_less_beginning_time);
      return;
    }
    if (dream.endDate) {
      if (await checkForOverlapFinished(dream.startDate, payload)) {
        Alert.alert(
          languages.error,
          languages.time_intersects_with_a_pre_existing_dream
        );
        return;
      }
    }

    dispatch(
      updateDreamTC(moment(dream.startDate), payload, dream.id, prevDate, true)
    );
  };
  const handleEndTimeSelect = async (time) => {
    // смена конца времени сна
    const prevDate = {
      startDate: dream.startDate,
      endDate: dream.endDate,
    };
    const payload = {
      ...dream,
      endTime: moment(time).format("HH:mm"),
    };
    setShowEndTime(false);

    if (
      moment(time).set("date", prevDate.endDate).toDate() <
      moment(dream.startTime, "HH:mm").set("date", prevDate.startDate).toDate()
    ) {
      Alert.alert(languages.error, languages.end_less_beginning_time);
      return;
    }

    if (await checkForOverlapFinished(dream.startDate, payload)) {
      Alert.alert(
        languages.error,
        languages.time_intersects_with_a_pre_existing_dream
      );
      return;
    }

    dispatch(
      updateDreamTC(moment(dream.startDate), payload, dream.id, prevDate, true)
    );
  };

  useEffect(() => {
    const sec = setInterval(() => {
      setDistance(
        <View
          style={{
            display: "flex",
            paddingHorizontal: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {wake ? (
            <Text
              style={{
                color: theme.text,
                textAlign: "right",
                fontSize: 13,
                paddingVertical: 10,
              }}
            >
              <Text style={{ opacity: 0.4 }}>{languages.wakefulness}:</Text>
              <Text>{boldDigital(languages, wake)}</Text>
            </Text>
          ) : dreams[0]?.endTime !== undefined &&
            timeLineDreams &&
            !isPlanned ? (
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <Text style={{ ...styles.textTime, color: theme.text }}>
                    --:--
                  </Text>
                </View>
                <View style={styles.line} />
              </View>
              <View>
                <Text
                  style={{
                    color: theme.text,
                    textAlign: "right",
                    fontSize: 13,
                    paddingVertical: 10,
                  }}
                >
                  <Text style={{ opacity: 0.4 }}>{languages.wakefulness}:</Text>
                  <Text style={{ fontWeight: "bold", fontSize: 13 }}>
                    {boldDigital(
                      languages,
                      calcTimeEvents(
                        languages,
                        dreams[0].endTime,
                        moment().format("HH:mm")
                      )
                    )}
                  </Text>
                </Text>
              </View>
            </View>
          ) : null}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: blockWidth >= 450 ? 700 : "100%",
            }}
          >
            <View>
              <TouchableOpacity
                onPress={() => dream.endTime && setShowEndTime(true)}
              >
                <Text
                  style={{
                    ...styles.textTime,
                    color: theme.text,
                  }}
                >
                  {dream.endTime ? _timeView(dream, "endTime", date) : "--:--"}
                </Text>
              </TouchableOpacity>
            </View>
            {!isPlanned && (
              <>
                <View style={styles.line} />
                <Text
                  style={{
                    ...styles.textTime,
                    fontSize: 11,
                    color: theme.text,
                  }}
                >
                  {dream.endTime && timeLineDreams
                    ? `${calcDreamTime(
                        languages,
                        dream.endTime,
                        dream.endDate
                      )}`
                    : null}
                </Text>
              </>
            )}
          </View>

          <TouchableNativeFeedback
            background={
              Platform.OS === "android"
                ? TouchableNativeFeedback.SelectableBackground()
                : ""
            }
            onPress={() =>
              _onOpenActionSheet({
                dream,
                showActionSheetWithOptions,
                dispatch,
                navigate,
                date,
                languages,
                theme,
              })
            }
            // style={{ backgroundColor: "red" }}
          >
            <View
              style={{
                ...styles.dream,
                backgroundColor: theme.navigator,
                width: blockWidth >= 450 ? 700 : "100%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View style={{ borderStyle: "solid" }}>
                    <View style={styles.timeBlock}>
                      {_imageRender(dream.timeOfDay)}
                    </View>
                  </View>
                  <View
                    style={{
                      ...styles.distanceBlock,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: theme.text,
                          opacity: 0.7,
                          textAlign: "left",
                        }}
                      >
                        {dream.timeOfDay === "day"
                          ? languages.day_sleep + ":"
                          : languages.night_sleep + ":"}
                      </Text>
                    </View>
                    <Text style={{ ...styles.distanceText, color: theme.text }}>
                      {!isPlanned
                        ? _timeDistance(
                            dream.startTime,
                            dream.endTime,
                            moment(dream.startDate).format("DD MMM"),
                            moment(dream.endDate).format("DD MMM"),
                            languages
                          )
                        : _timeLeft(dream.startTime, languages)}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    opacity: 0.6,
                    color: theme.text,
                    textAlign: "right",
                  }}
                >
                  {dream.endTime || isPlanned ? "" : languages.now}
                </Text>
                {isPlanned ? (
                  <Text
                    style={{
                      textAlign: "right",
                      color: theme.text,
                      opacity: 0.7,
                      width: blockWidth >= 450 ? 700 : "100%",
                    }}
                  >
                    {languages.planning}
                  </Text>
                ) : null}
              </View>

              <View style={styles.placeBlock}>
                {!disablePlaces && !isPlanned ? (
                  dream.place ? (
                    <Label
                      style={{
                        borderRadius: 20,
                        padding: 2,
                        fontSize: 12,
                      }}
                      languages={languages}
                      focused
                      place={dream.place || ""}
                    />
                  ) : null
                ) : null}
                {!disableFeeding && !isPlanned ? (
                  dream.countFeeding ? (
                    <Label
                      style={{ padding: 2, fontSize: 12 }}
                      focused
                      place={dream.countFeeding || ""}
                      feed
                      languages={languages}
                    />
                  ) : null
                ) : null}
                {!disableTags && !isPlanned
                  ? dream.tags
                    ? dream.tags.map((tag) => (
                        <Label
                          style={{
                            padding: 2,
                            fontSize: 12,
                            backgroundColor: tag.color,
                          }}
                          tag={tag.color}
                          place={
                            languages.tags_item[tag.id] || tag.value || tag
                          }
                        />
                      ))
                    : null
                  : null}
              </View>
              {dream.comment && !isPlanned ? (
                <View style={styles.commentBlock}>
                  <Text
                    style={{ ...styles.commentBlockText, color: theme.text }}
                  >
                    {dream.comment}
                  </Text>
                </View>
              ) : null}
              {dream && dream.events && !isPlanned
                ? dream.events.map((event) => {
                    return (
                      <View
                        key={event.id}
                        style={{
                          ...styles.eventItem,
                          width: deviceWidth - 100,
                          backgroundColor: theme.background,
                        }}
                      >
                        <View>
                          <Text
                            style={{ ...styles.itemData, color: theme.text }}
                          >
                            {" "}
                            {event.eventData},{event.eventTime}
                          </Text>
                          <Text
                            style={{
                              ...styles.itemComment,
                              color: theme.text,
                            }}
                          >
                            {event.commentEvent || "..."}{" "}
                          </Text>
                        </View>
                        <Text style={{ ...styles.itemType, color: theme.text }}>
                          {event.activeEventType}
                        </Text>
                      </View>
                    );
                  })
                : null}
            </View>
          </TouchableNativeFeedback>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: blockWidth >= 450 ? 700 : "100%",
            }}
          >
            <View>
              <TouchableOpacity onPress={() => setShowStartTime(true)}>
                <Text
                  style={{
                    ...styles.textTime,
                    color: theme.text,
                  }}
                >
                  {_timeView(dream, "startTime", date)}
                </Text>
              </TouchableOpacity>
            </View>
            {!isPlanned && (
              <>
                <View style={styles.line} />
                <Text
                  style={{
                    ...styles.textTime,
                    fontSize: 11,
                    color: theme.text,
                  }}
                >
                  {timeLineDreams
                    ? calcDreamTime(languages, dream.startTime, dream.startDate)
                    : ""}
                </Text>
              </>
            )}
          </View>
        </View>
      );
    }, 1000);

    return () => clearInterval(sec);
  }, [dream, theme, languages, date]);

  return (
    <View>
      <DateTimePickerModal
        isVisible={showEndTime}
        date={moment(dream.endTime, "HH:mm").toDate()}
        mode="time"
        is24Hour={true}
        onConfirm={(time) => handleEndTimeSelect(time)}
        onCancel={() => setShowEndTime(false)}
      />
      <DateTimePickerModal
        isVisible={showStartTime}
        mode="time"
        date={moment(dream.startTime, "HH:mm").toDate()}
        is24Hour={true}
        onConfirm={(time) => handleStartTimeSelect(time)}
        onCancel={() => setShowStartTime(false)}
      />
      {distance}
    </View>
  );
};

export default DreamItem;
