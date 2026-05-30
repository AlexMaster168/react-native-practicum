import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ScrollView,
  Modal,
  TouchableHighlight,
  KeyboardAvoidingView,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Fire from "../../firebase";
import {
  setDateSuccess,
  updateDreamTC,
} from "../../redux/reducers/mainReducer";
import { Label, TimeItem, Button, CreateInfoForm } from "../../components";
import { styles } from "./style";
import { renderCreateButton } from "../../utils/renderDirectoryButton";
import { useRoute } from "@react-navigation/native";
import moment, { isMoment } from "moment";
import { areIntervalsOverlapping, isWithinInterval } from "date-fns";
import { convertDateFromTime } from "../../utils/convertFromTime";
import AdBanner from "../../components/AdBanner";
import { TextInput } from "react-native-gesture-handler";

const deviceWidth = Dimensions.get("window").width;

export const NewDreamScreen = ({
  date,
  dream,
  places,
  navigation,
  tags,
  languages,
  isNew,
  startDreamTC,
  endDreamTC,
  theme,
  disableTags,
  disableFeeding,
  dreams,
}) => {
  const activeLanguage = useSelector(({ app }) => app.activeLanguage);

  const timeOfDay =
    languages.date_locale === "eu"
      ? [
          { title: "Day", value: "day" },
          {
            title: "Night",
            value: "night",
          },
        ]
      : [
          { title: "День", value: "day" },
          { title: "Ночь", value: "night" },
        ];

  const { params } = useRoute();
  const { comment } = params ? params : "...";
  // const { commentEvent } = params ? params : '...';
  // const { activeEventType } = params ? params : ' ';
  // const { eventTime } = params  ? params : moment(new Date()).format('HH:mm');
  // const { eventData } = params ? params : moment().local().format('DD MMMM');

  const { events } = params ? params : [];

  const { place, id } = !isNew && dream;
  const savedTags = (dream && dream.tags) || [];
  const { navigate } = useNavigation();
  const [updatedDream, setUpdatedDream] = useState(
    dream || {
      startTime: moment().format("HH:mm"),
      startDate: moment(date) || moment(),
      endTime: null,
      endDate: null,
    }
  );
  const [activePlace, setActivePlace] = useState(place || "");
  const [activeTags, setActiveTags] = useState(savedTags);
  const [activeTimeOfDay, setActiveTimeOfDay] = useState(
    !isNew ? dream.timeOfDay || timeOfDay[0].value : timeOfDay[0].value
  );
  const [isFinish, setIsFinish] = useState(
    !isNew ? !!dream.endTime || false : false
  );
  const [countFeeding, setCountFeeding] = useState(
    !isNew ? dream.countFeeding || 0 : 0
  );
  const [commentText, setCommentText] = useState(
    (dream && dream.comment) || ""
  );
  //const [eventText, setEventText] = useState(dream &&  dream.event && dream.event.commentEvent || ' ');
  //const [eventType, setEventType] = useState(dream && dream.event && dream.event.activeEventType || ' ');
  const [errorText, setErrorText] = useState("");

  const [_id, setId] = useState(!isNew ? null : +new Date());
  const [isPlacesVisible, setIsPlacesVisible] = useState(false);
  const [isTagsVisible, setIsTagsVisible] = useState(false);
  const [modalWindow, setModalWindow] = useState(false);

  const dispatch = useDispatch();

  const handleModalVisible = (type) =>
    type === "places"
      ? setIsPlacesVisible(!isPlacesVisible)
      : setIsTagsVisible(!isTagsVisible);

  const handleCheckBoxChange = () => {
    setIsFinish(true);
  };

  const handleChangeCountFeeding = (type) => {
    let count = type === "add" ? countFeeding + 1 : countFeeding - 1;
    setCountFeeding(count);
  };
  const handleSelectTag = (tag) => {
    if (activeTags.find((aTag) => aTag.id === tag.id)) {
      setTags(activeTags.filter((aTag) => aTag.id !== tag.id));
    } else {
      setTags([...activeTags, tag]);
    }
  };
  const updateDreamTime = (type, time) => {
    const dates = {};

    if (type === "endTime" && !updatedDream.endDate) {
      dates.endTime = time;
      dates.endDate = +moment(updatedDream.startDate).toDate();
    } else if (type === "endDate" && !updatedDream.endTime) {
      dates.endDate = time;
      dates.endTime = moment(updatedDream.startTime, "HH:mm")
        .add(30, "minute")
        .format("HH:mm");
    } else {
      dates[type] = time;
    }

    setUpdatedDream({ ...updatedDream, ...dates });
  };
  const setPlace = (place) => {
    if (place.length > 0) setActivePlace(place);
  };
  const setTimeOfDay = (value) => {
    setActiveTimeOfDay(value);
  };
  const setTags = (tags) => {
    setActiveTags(tags);
  };
  const checkForOverlapFinished = async (date) => {
    const { dreams } = await Fire.getOnce(date);
    let startOfDream = convertDateFromTime(updatedDream.startTime);
    let endOfDream = convertDateFromTime(updatedDream.endTime);
    // console.log('newDreamScreen setData', setDate, 'endofdream',(endOfDream).setDate)
    if (updatedDream.endTime < updatedDream.startTime) {
      endOfDream = endOfDream.setDate(endOfDream.getDate() + 1);
    }
    let check = [];

    check = dreams
      .filter((d) => d.id !== updatedDream.id)
      .map((d) => {
        if (!d.endTime) {
          return false;
        }
        let start = convertDateFromTime(d.startTime);
        let end = convertDateFromTime(d.endTime);
        if (d.startTime > d.endTime) {
          end = end.setDate(end.getDate() + 1);
        }
        return areIntervalsOverlapping(
          { start: startOfDream, end: endOfDream },
          { start: start, end: end }
        );
      });
    //console.log(check, 'check')
    return check.includes(true);
  };

  const checkForOverlap = async (date) => {
    const { dreams } = await Fire.getOnce(date);
    let check = dreams
      .filter((d) => d.id !== updatedDream.id)
      .map((d) => {
        let start = convertDateFromTime(d.startTime);
        let end = convertDateFromTime(d.endTime);
        if (d.startTime > d.endTime) {
          end = end.setDate(end.getDate() + 1);
        }
        return isWithinInterval(convertDateFromTime(updatedDream.startTime), {
          start: start,
          end: end,
        });
      });
    return check.includes(true);
  };

  const isInvalidDateInput = () => {
    const [startHours, startMinutes] = updatedDream.startTime.split(":");
    const [endHours, endMinutes] = updatedDream.endTime.split(":");
    console.log(updatedDream);
    const momentStart = moment(updatedDream.startDate)
      .set("h", startHours)
      .set("m", startMinutes);
    const momentEnd = moment(updatedDream.endDate)
      .set("h", endHours)
      .set("m", endMinutes);
    if (momentStart.toDate() > momentEnd.toDate()) {
      return languages.end_less_beginning_time;
    }
    console.log("start ", momentStart, "end ", momentEnd);
    if (
      momentStart.date() !== momentEnd.date() &&
      !Number.isNaN(momentEnd.date()) &&
      activeTimeOfDay === "day"
    ) {
      return languages.it_is_not_possible_to_set_different_dates_for_daytime_sleep;
    }
    return null;
  };

  const handleSave = async () => {
    let dateOfDream;

    if (moment(date).isSame(new Date(updatedDream.startDate), "day")) {
      console.log("same day");
      dateOfDream = moment(date);
    } else {
      console.log("not same day");
      dateOfDream = moment(updatedDream.startDate);
    }
    const payload = {
      ...updatedDream,
      startDate: +moment(updatedDream.startDate).toDate(),
      endDate: +moment(updatedDream.endDate).toDate(), // || moment().format('DD MMM')
      place: activePlace,
      tags: activeTags,
      timeOfDay: activeTimeOfDay,
      countFeeding,
      comment: commentText,
      events: events || (dream && dream.events) || [],
    };

    // if (isFinish && (!updatedDream.endTime || !payload.endDate)) {
    //   // something's not set
    //   setErrorText(languages.end_time_skipped);
    //   console.log(updatedDream.endTime, payload.endDate);
    //   return;
    // }
    if (activeTimeOfDay === "day") {
      // day sleep verifications
      if (
        updatedDream.endTime &&
        payload.endDate &&
        !moment(updatedDream.startDate).isSame(
          moment(updatedDream.endDate),
          "day"
        ) // different day
      ) {
        setErrorText(
          languages.it_is_not_possible_to_set_different_dates_for_daytime_sleep
        );
        return;
      }

      const invalidMessage =
        updatedDream.endTime && payload.endDate ? isInvalidDateInput() : null;
      if (invalidMessage) {
        // checks if end time is before start & different dates
        setErrorText(invalidMessage);
        return;
      }
      console.log("payload", payload);

      if (
        !updatedDream.endTime &&
        !payload.endDate &&
        dateOfDream.isBefore(
          moment().set("hour", 0).set("minute", 0).set("second", 0)
        ) // if setting day dream on date before current day without end
      ) {
        setErrorText(languages.end_time_skipped);
        return;
      }
    } else if (activeTimeOfDay === "night") {
      // night sleep verifications
      if (
        // check if start time more than end time on same day
        moment(updatedDream.startDate).isSame(
          moment(updatedDream.endDate),
          "day"
        ) &&
        updatedDream.startTime > updatedDream.endTime
      ) {
        setErrorText(languages.end_less_beginning_time);
        return;
      }
      if (updatedDream.endTime && payload.endDate) {
        console.log("finish");
        // check if night sleep is longer than one day
        const [endHH, endMM] = updatedDream.endTime.split(":");
        const [startHH, startMM] = updatedDream.startTime.split(":");

        if (
          moment(updatedDream.endDate)
            .set("hour", endHH)
            .set("minute", endMM)
            .isAfter(
              moment(updatedDream.startDate)
                .set("hour", startHH)
                .set("minute", startMM)
                .add(24, "hour")
            )
        ) {
          setErrorText(languages.night_dream_longer_than_one_day);
          return;
        }
      } else {
        // if night sleep set without finish time, it still cant be more than 24 hours
        const [startHH, startMM] = updatedDream.startTime.split(":");
        if (
          moment()
            .subtract(
              moment(updatedDream.startDate)
                .set("hour", startHH)
                .set("minute", startMM)
            )
            .toDate() > new Date(86400000) // 86400000 - 1 day
        ) {
          setErrorText(languages.night_dream_longer_than_one_day);
          return;
        }
      }
      //  else {
      //   if (await checkForOverlap(dateOfDream)) {
      //     setErrorText(languages.time_intersects_with_a_pre_existing_dream);
      //     return;
      //   }
      // }
    }
    if (updatedDream.endTime && payload.endDate) {
      if (await checkForOverlapFinished(dateOfDream)) {
        setErrorText(languages.time_intersects_with_a_pre_existing_dream);
        return;
      }
    }
    if (isNew) {
      // create dream
      payload.startTime = updatedDream.startTime;
      if (updatedDream.endTime && payload.endDate) {
        payload.endTime = updatedDream.endTime;
        payload.endDate = isMoment(updatedDream.endDate)
          ? +updatedDream.endDate.toDate()
          : +updatedDream.endDate;
      }

      startDreamTC(
        dateOfDream,
        payload,
        false,
        moment(date).isSame(new Date(updatedDream.startDate), "day")
        // { startTime: updatedDream.startTime },
        // updatedDream.endTime && payload.endDate
        //   ? {
        //       endTime: updatedDream.endTime,
        //       endDate: isMoment(updatedDream.endDate)
        //         ? +updatedDream.endDate.toDate()
        //         : +updatedDream.endDate,
        //     }
        //   : null
      );
    } else {
      // update dream
      if (updatedDream.endTime && payload.endDate && payload.started) {
        payload.started = false;
      }
      const prevDate = {
        startDate: dream.startDate,
        endDate: dream.endDate || payload.endDate,
      };

      dispatch(
        updateDreamTC(
          dateOfDream,
          payload,
          dream.id,
          prevDate,
          moment(date).isSame(new Date(updatedDream.startDate), "day")
        )
      );
    }
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: theme.background,
          paddingHorizontal: 10,
        }}
      >
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            <View>
              <View style={{ marginTop: 15 }}>
                <Text
                  style={{
                    ...styles.heading,
                    color: theme.text,
                    marginBottom: 10,
                  }}
                >
                  {languages.start_time_sleep}
                </Text>
                <View style={styles.times}>
                  <View style={styles.timeItem}>
                    <TimeItem
                      time={updatedDream?.startTime}
                      date={updatedDream?.startDate || date}
                      type="start"
                      languages={languages}
                      maxDate={moment().add(1, "day").toDate()}
                      updateDreamTime={updateDreamTime}
                      theme={theme}
                      timeOfDay={activeTimeOfDay}
                    />
                  </View>
                </View>
              </View>

              <View style={{ marginTop: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      ...styles.heading,
                      color: theme.text,
                      marginBottom: 10,
                    }}
                  >
                    {languages.end_time_sleep}
                  </Text>
                  <TouchableNativeFeedback
                    background={
                      Platform.OS === "android"
                        ? TouchableNativeFeedback.SelectableBackground()
                        : ""
                    }
                    onPress={() => {
                      setIsFinish(false);
                      setUpdatedDream({
                        ...updatedDream,
                        endTime: null,
                        endDate: null,
                      });
                    }}
                  >
                    <Text
                      style={{
                        ...styles.heading,
                        color: "#E67E22",
                      }}
                    >
                      {languages.reset}
                    </Text>
                  </TouchableNativeFeedback>
                </View>
                <View style={styles.times}>
                  <View style={styles.timeItem}>
                    <TouchableNativeFeedback
                      onPress={handleCheckBoxChange}
                      background={
                        Platform.OS === "android"
                          ? TouchableNativeFeedback.SelectableBackground()
                          : ""
                      }
                    >
                      <TimeItem
                        time={updatedDream?.endTime}
                        date={updatedDream?.endDate}
                        type="end"
                        languages={languages}
                        maxDate={moment().add(1, "day").toDate()}
                        minDate={moment(updatedDream.startDate).toDate()}
                        updateDreamTime={updateDreamTime}
                        theme={theme}
                        timeOfDay={activeTimeOfDay}
                      />
                    </TouchableNativeFeedback>
                  </View>
                  <TouchableNativeFeedback
                    background={
                      Platform.OS === "android"
                        ? TouchableNativeFeedback.SelectableBackground()
                        : ""
                    }
                    onPress={() => {
                      setUpdatedDream({
                        ...updatedDream,
                        endTime: moment(new Date()).format("HH:mm"),
                        endDate: moment().toDate(),
                      });
                      setIsFinish(true);
                    }}
                  >
                    <Text
                      style={{
                        ...styles.heading,
                        marginTop: 10,
                        paddingLeft: 20,
                        color: "#E67E22",
                        textAlign: "right",
                      }}
                    >
                      {languages.now}
                    </Text>
                  </TouchableNativeFeedback>
                </View>
                <View>
                  <Text
                    style={{
                      ...styles.heading,
                      color: theme.text,
                      marginBottom: 10,
                    }}
                  >
                    {languages.edit_section_time_of_day}
                  </Text>
                  <View
                    style={{
                      marginTop: 5,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {timeOfDay.map(({ value, title }, index) => (
                      <TouchableNativeFeedback
                        style={{ flexDirection: "column" }}
                        background={
                          Platform.OS === "android"
                            ? TouchableNativeFeedback.SelectableBackground()
                            : ""
                        }
                        key={index}
                        onPress={() => {
                          setTimeOfDay(value);
                        }}
                      >
                        <View
                          style={{
                            width: deviceWidth / 2 - 25,
                            borderRadius: 10,
                            padding: 10,
                            paddingHorizontal: 0,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor:
                              value === activeTimeOfDay
                                ? "#DCCFFF"
                                : theme.navigator,
                          }}
                        >
                          <Image
                            style={{
                              width: 28,
                              height: 28,
                              // tintColor:
                              //   value === activeTimeOfDay ? '#E67E22' : '#000',
                            }}
                            source={
                              value === "day"
                                ? require("../../images/icons/ic_day.png")
                                : require("../../images/icons/ic_night.png")
                            }
                          />
                          <Label
                            style={{
                              ...styles.timeOfDayLabel,
                            }}
                            place={title}
                            languages={languages}
                            focused={value === activeTimeOfDay}
                          />
                        </View>
                      </TouchableNativeFeedback>
                    ))}
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 20 }}>
                <View style={styles.sectionDirectory}>
                  <Text
                    style={{
                      ...styles.heading,
                      color: theme.text,
                    }}
                  >
                    {languages.sleeping_places}
                  </Text>
                  {renderCreateButton(
                    languages.create,
                    "places",
                    () => handleModalVisible("places"),
                    isPlacesVisible,
                    setIsPlacesVisible,
                    { color: "#E67E22" }
                  )}
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <ScrollView horizontal={true}>
                    {places.map(({ value }, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setPlace(value);
                        }}
                      >
                        <Label
                          style={styles.label}
                          place={value}
                          languages={languages}
                          focused={value === activePlace}
                        />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
              <View style={{ marginTop: 30 }}>
                {!disableTags ? (
                  <View>
                    <View style={styles.sectionDirectory}>
                      <Text
                        style={{
                          ...styles.heading,
                          color: theme.text,
                        }}
                      >
                        {languages.tags}
                      </Text>
                      <View style={styles.tag}>
                        <TouchableOpacity onPress={() => setModalWindow(true)}>
                          <Text
                            style={{ ...styles.buttonText, color: "#E67E22" }}
                          >
                            {languages.new_tag}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            navigate("AddTags", { activeTags, setTags, theme })
                          }
                        >
                          <Text
                            style={{ ...styles.buttonText, color: "#E67E22" }}
                          >
                            {languages.add}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <ScrollView
                      style={{
                        ...styles.places,
                        marginBottom: 5,
                      }}
                      horizontal={true}
                    >
                      {activeTags.length ? (
                        activeTags.map((tag, index) => (
                          <TouchableOpacity
                            style={[
                              styles.label,
                              { backgroundColor: tag.color, marginRight: 5 },
                              !!activeTags.find((v) => tag.id === v.id),
                            ]}
                            key={index}
                            onPress={() => handleSelectTag(tag)}
                          >
                            <Text style={{ color: theme.text }}>
                              {languages.tags_item[tag.id] || tag.value}
                            </Text>
                            {!!activeTags.find((v) => tag.id === v.id) && (
                              <Image
                                style={{ marginLeft: 5, width: 18, height: 18 }}
                                source={require("../../images/icons/ic_delete.png")}
                              />
                            )}
                          </TouchableOpacity>
                        ))
                      ) : (
                        <View
                          style={{
                            flex: 1,
                            alignItems: "center",
                            marginTop: 8,
                          }}
                        >
                          <Text style={{ color: theme.text }}>
                            {languages.empty_tags}
                          </Text>
                        </View>
                      )}
                    </ScrollView>
                  </View>
                ) : null}

                {errorText ? (
                  <View style={styles.errorContainer}>
                    <TouchableOpacity
                      style={styles.errorImage}
                      onPress={() => setErrorText("")}
                    >
                      <Image
                        style={{ width: 15, height: 15 }}
                        source={require("../../images/icons/ic_delete.png")}
                      />
                    </TouchableOpacity>
                    <View style={styles.errorContainerText}>
                      <Text style={styles.errorText}>{errorText}</Text>
                    </View>
                  </View>
                ) : null}

                <View style={{ marginTop: 10 }}>
                  <View
                    style={{
                      marginBottom: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ ...styles.heading, color: theme.text }}>
                      {languages.comment}
                    </Text>
                    <Text style={{ ...styles.heading, color: "#E67E22" }}>
                      {languages.reset}
                    </Text>
                  </View>
                  <TextInput
                    multiline
                    style={{
                      paddingTop: 20,
                      paddingBottom: 50,
                      marginBottom: 30,
                      maxHeight: 150,
                      padding: 5,
                      borderRadius: 10,
                      backgroundColor: theme.navigator,
                      color: theme.text,
                      textAlignVertical: "top",
                    }}
                    onFocus={() =>
                      setCommentText(commentText ? commentText : "")
                    }
                    value={commentText}
                    onChangeText={(value) => setCommentText(value)}
                  />
                </View>

                <Button
                  style={{ marginBottom: 10, borderRadius: 8 }}
                  pressHandler={handleSave}
                  buttonText={languages.save}
                />
                <Modal
                  onRequestClose={() => setModalWindow(false)}
                  transparent={true}
                  visible={modalWindow}
                  animationType="slide"
                >
                  <TouchableHighlight
                    underlayColor="transparent"
                    style={{ flex: 1 }}
                    onPress={() => setModalWindow(false)}
                  >
                    <View />
                  </TouchableHighlight>
                  <CreateInfoForm
                    visible={modalWindow}
                    type="tags"
                    setVisible={setModalWindow}
                  />
                </Modal>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <AdBanner />
    </KeyboardAvoidingView>
  );
};
