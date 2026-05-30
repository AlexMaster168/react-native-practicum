import React, { useState } from "react";
import { AddTags, Main } from "../../screens";
import { CreateInfoForm, TimePicker, MenuIcon } from "../../components";
import DreamTabNavigator from "../DreamTabNavigator";
import { useNavigator } from "../../hooks/useNavigator";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import {
  useNavigationState,
  useNavigationContainerRef,
} from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
// exceljs грузится лениво внутри generateShareableExcel (см. ниже) — на старте
// его top-level импорт зацикливает Hermes (Maximum call stack в queueMicrotask).
import * as Sharing from "expo-sharing";
import { Buffer as NodeBuffer } from "buffer";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { endDreamTC } from "../../redux/reducers/mainReducer";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  statisticByType,
  _statisticsSection,
} from "../../components/StatisticsOnce";
import Label from "../../components/Label/index";

const deviceWidth = Dimensions.get("window").width;
import { SettingsStatisticsScreenDreams } from "../../screens";

import { styles } from "./style";
import { setStatisticsSection } from "../../redux/reducers/appReducer";
import { getDreamsForInterval } from "../../utils/share";
import moment from "moment";
import ChildSelect from "../../components/ChildSelect";

const _onOpenActionSheet = ({
  showActionSheetWithOptions,
  navigate,
  date,
  dream,
  dispatch,
  theme,
}) => {
  const options = [languages.finish_now, languages.edit_it, languages.add_new];
  const cancelButtonIndex = 3;
  const icons = [
    <Image
      style={{ width: 30, height: 30 }}
      source={require("../../images/icons/ic_check.png")}
      tintColor="#7c708c"
    />,
    <Image
      style={{ width: 30, height: 30 }}
      source={require("../../images/icons/ic_edit.png")}
      tintColor="#7c708c"
    />,
    <Image
      style={{ width: 30, height: 30 }}
      source={require("../../images/icons/ic_plus.png")}
      tintColor="#7c708c"
    />,
  ];
  const containerStyle = { backgroundColor: theme.navigator || "#fff" };
  const titleTextStyle = { color: theme.text, fontSize: 18 };
  const textStyle = { color: theme.text };
  showActionSheetWithOptions(
    {
      options,
      cancelButtonIndex,
      icons,
      containerStyle,
      titleTextStyle,
      textStyle,
    },

    (buttonIndex) => {
      if (buttonIndex === 0) {
        dispatch(endDreamTC(date, dream));
      } else if (buttonIndex === 1) {
        navigate("NewDream", { date, dream });
      } else if (buttonIndex === 2) {
        navigate("NewDream", { isNew: true });
      }
    }
  );
};

export const _renderCreateButton = ({
  visible,
  setVisible,
  _handleButtonPressed,
  theme, // added theme argument
}) => {
  return (
    <View style={{ marginHorizontal: 20 }}>
      <TouchableOpacity
        style={{ marginRight: 15 }}
        onPress={_handleButtonPressed}
      >
        <Image
          style={[styles.addImage, { tintColor: theme.text }]}
          source={require("../../images/icons/ic_plus.png")}
        />
      </TouchableOpacity>
      {visible && (
        <Modal
          isVisible={visible}
          onBackButtonPress={() => setVisible(false)}
          onBackdropPress={() => setVisible(false)}
          hideModalContentWhileAnimating
          backdropOpacity={0.4}
          style={styles.modalContainer}
        >
          <View
            style={{
              ...styles.modalContent,
              width: deviceWidth - 40,
            }}
          >
            <CreateInfoForm
              visible={visible}
              type="tags"
              setVisible={setVisible}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

const handleEditorPress = (
  dream,
  navigate,
  date,
  showActionSheetWithOptions,
  dispatch,
  theme
) => {
  dream
    ? _onOpenActionSheet({
        showActionSheetWithOptions,
        navigate,
        date,
        dream,
        dispatch,
        theme,
      })
    : navigate("NewDream", { isNew: true });
};

const _shareSettings = ({ languages }) => {
  return [
    {
      id: "night_sleep",
      title: `${languages.night_sleep} `,
    },
    {
      id: "wakefulness",
      title: `${languages.wakefulness} `,
    },
    {
      id: "comments",
      title: `${languages.comment} `,
    },
    {
      id: "statistic",
      title: `${languages.statistics} `,
    },
  ];
};
const yesOrNo = ({ languages }) => {
  return [
    { title: `${languages.yes} `, value: "yes" },
    { title: `${languages.no} `, value: "no" },
  ];
};

const compareTime = (startTime, endTime) => {
  return (
    moment(startTime, "HH:mm").toDate() - moment(endTime, "HH:mm").toDate()
  );
};

const renderDreamTime = (startTime, endTime) => {
  return ` /${startTime}-${endTime}/`;
};

// This returns a local uri that can be shared
const generateShareableExcel = async (
  dreamsByDate,
  languages,
  childName,
  settings
) => {
  const ExcelJS = require("exceljs");
  const now = new Date();
  const fileName = `${childName} ${dreamsByDate.length} ${languages.days}.xlsx`;
  const fileUri = FileSystem.cacheDirectory + fileName;
  return new Promise((resolve, reject) => {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Me";
    workbook.created = now;
    workbook.modified = now;
    // Add a sheet to work on
    const worksheet = workbook.addWorksheet("My Sheet", {});
    // Just some columns as used on ExcelJS Readme
    worksheet.columns = [
      // { header: 'Id', key: 'id', width: 10 },
      // { header: 'Name', key: 'name', width: 32 },
      // { header: 'D.O.B.', key: 'dob', width: 10, }
      { header: languages.date, key: "name", width: 24 },
      ...dreamsByDate.map(({ date }) => ({
        header: moment(date).format("L"),
        key: moment(date).format("L"),
        width: 32,
      })),
    ];
    // Add some test data

    // get date dreams with most dreams set
    worksheet.addRows(
      dreamsByDate
        .map(({ dreams, date }) => {
          return {
            date,
            dreams: dreams.sort((current, next) =>
              compareTime(current.startTime, next.startTime)
            ),
          };
        })
        .reduce((acc, curr) => {
          return acc.dreams.length < curr.dreams.length ? curr : acc;
        })
        .dreams // dreams of the longest date length
        .map((maxRowsDream, index) => {
          return dreamsByDate.reduce(
            (row, { dreams, date }) => {
              try {
                console.log(dreams[index]);
              } catch (err) {
                console.log(err);
              }
              row[0][moment(date).format("L")] =
                index < dreams.length ? dreams[index]?.wakefulness?.value : "";
              row[1][moment(date).format("L")] =
                index < dreams.length
                  ? `${moment(
                      compareTime(
                        dreams[index].endTime,
                        dreams[index].startTime
                      )
                    )
                      .utc()
                      .format("HH:mm")}${
                      settings.showTime
                        ? renderDreamTime(
                            dreams[index].startTime,
                            dreams[index].endTime
                          )
                        : ""
                    }`
                  : "";
              return row;
            },
            [
              {
                name: languages.awake_time,
              },
              {
                name:
                  maxRowsDream.timeOfDay === "day"
                    ? `${languages.sleep} ${index + 1}`
                    : `${languages.sleep} ${index + 1}`,
              },
            ]
          );
        })
        .flat()
    );

    worksheet.addRow();
    worksheet.addRow({ name: "Sum" });

    worksheet.addRows(
      _statisticsSection(dreamsByDate[0].dreams, languages).map(
        ({ id, title }) =>
          dreamsByDate.reduce(
            (row, { date, dreams }) => {
              console.log(row);
              row[moment(date).format("L")] = statisticByType(
                id,
                dreams,
                languages
              ).value;
              return row;
            },
            {
              name: title,
            }
          )
      )
    );

    // Write to file
    workbook.xlsx.writeBuffer().then((buffer) => {
      // Do this to use base64 encoding
      const nodeBuffer = NodeBuffer.from(buffer);
      const bufferStr = nodeBuffer.toString("base64");
      FileSystem.writeAsStringAsync(fileUri, bufferStr, {
        encoding: FileSystem.EncodingType.Base64,
      }).then(() => {
        resolve(fileUri);
      });
    });
  });
};

const onShare = async (
  date,
  dreams,
  languages,
  nightDream,
  wakefulness,
  comment,
  statistic,
  setVisible,
  activeChild,
  startDate,
  endDate,
  settings,
  setIsExcelGenerating
) => {
  setIsExcelGenerating(true);
  try {
    // if (dreams.length === 0) {
    //   alert('У вас нет ни одного сна');
    // } else {
    // await Share.share({
    //   message:
    //     date.local().format('DD MMM') +
    //     '\n' +
    //     dreams.map((dream) => {
    //       return dream.timeOfDay === 'night'
    //         ? !nightDream
    //           ? ''
    //           : `${languages.night_sleep} ${languages.from}` +
    //             dream.startTime +
    //             `${languages.to}` +
    //             dream.endTime +
    //             '\n'
    //         : `${languages.day_sleep} ${languages.from}` +
    //             dream.startTime +
    //             `${languages.to}` +
    //             dream.endTime +
    //             ' *' +
    //             (comment ? dream.comment : '') +
    //             '*' +
    //             '\n' +
    //             (wakefulness
    //               ? `${languages.wakefulness_text}:` +
    //                 dream.wakefulness.value +
    //                 '\n'
    //               : '');
    //     }) +
    //     (statistic
    //       ? `${languages.statistic}` +
    //         '\n' +
    //         _statisticsSection(dreams, languages).map((field) => {
    //           return field.title + field.value + '\n';
    //         })
    //       : ''),
    // });
    const dreamsByDate = await getDreamsForInterval(startDate, endDate);
    console.log(dreamsByDate, "dreams by date");

    const shareableExcelUri = await generateShareableExcel(
      dreamsByDate,
      languages,
      activeChild.name,
      settings
    );

    Sharing.shareAsync(shareableExcelUri, {
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Android
      dialogTitle: "Share dreams", // Android and Web
      UTI: "com.microsoft.excel.xlsx", // iOS
    })
      .catch((error) => {
        console.error(error);
        setVisible(false);
      })
      .then(() => {
        console.log("Return from sharing dialog");
        setVisible(false);
        setIsExcelGenerating(false);
      });
    // }
  } catch (error) {
    console.error(error);
    alert(`${languages.share_error}`);
  }
};

const setShare = (
  setting,
  value,
  setNightDream,
  setWakefulness,
  setComment,
  setStatistic
) => {
  if (setting.id === "night_sleep") {
    value.value === "yes" ? setNightDream(true) : setNightDream(false);
  } else if (setting.id === "wakefulness") {
    value.value === "yes" ? setWakefulness(true) : setWakefulness(false);
  } else if (setting.id === "comments") {
    value.value === "yes" ? setComment(true) : setComment(false);
  } else if (setting.id === "statistic") {
    value.value === "yes" ? setStatistic(true) : setStatistic(false);
  }
};

const setFocus = (
  setting,
  value,
  nightDream,
  wakefulness,
  comment,
  statistic
) => {
  if (setting.id === "night_sleep") {
    return value.value === "yes" ? nightDream : !nightDream;
  } else if (setting.id === "wakefulness") {
    return value.value === "yes" ? wakefulness : !wakefulness;
  } else if (setting.id === "comments") {
    return value.value === "yes" ? comment : !comment;
  } else if (setting.id === "statistic") {
    return value.value === "yes" ? statistic : !statistic;
  }
};

const screens = (
  { navigation },

  languages,
  theme,
  navigate,
  visible,
  setVisible,
  childrenModalVisible,
  setChildrenModalVisible,
  children,
  activeChild,
  _handleButtonPressed,
  showActionSheetWithOptions,
  date,
  dream,
  dispatch,
  dreams,
  nightDream,
  setNightDream,
  wakefulness,
  setWakefulness,
  comment,
  setComment,
  statistic,
  setStatistic,
  modalState,
  setModalVisible,
  routes,
  navigationRef,
  routeNameRef,
  showStart,
  showEnd,
  startDate,
  endDate,
  setShowStart,
  setShowEnd,
  setStartDate,
  setEndDate,
  showDreamTime,
  setShowDreamTime,
  isExcelGenerating,
  setIsExcelGenerating
) => [
  {
    name: "Home",
    component: Main,
    options: {
      headerLeft: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MenuIcon />
          </TouchableOpacity>
          {(children && children.length) >= 1 && (
            <View style={{ marginLeft: 10.8 }}>
              <ChildSelect />
            </View>
          )}
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <Image
              style={{
                ...styles.shareImage,
                marginRight: 20,
                width: 26,
                tintColor: theme.text,
              }}
              source={require("../../images/icons/ic_share1.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => navigation.navigate("DreamEvent")}
            onPress={() => navigate("SettingsStatisticsScreenDreams")}
          >
            <Image
              style={{
                ...styles.shareImage,
                marginRight: 35,
                tintColor: theme.text,
              }}
              source={require("../../images/icons/ic_settings.png")}
            />
          </TouchableOpacity>
          {visible && (
            <Modal
              visible={visible}
              onBackButtonPress={() => setVisible(false)}
              onBackdropPress={() => setVisible(false)}
              hideModalContentWhileAnimating
              backdropOpacity={0.4}
              style={styles.modalContainer}
              // animationIn={'none'}
            >
              <View
                style={{
                  ...styles.listOfShareContainer,
                  backgroundColor: theme.navigator,
                }}
              >
                <Text style={{ ...styles.headerText, color: theme.text }}>
                  {languages.excel_report}
                </Text>
                <Text style={{ ...styles.settingsText, color: theme.text }}>
                  {languages.interval}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 15,
                  }}
                >
                  <DateTimePickerModal
                    isVisible={showStart}
                    date={new Date(startDate)}
                    mode="date"
                    onConfirm={(date) => {
                      setStartDate(date);
                      setShowStart(false);
                    }}
                    onCancel={() => setShowStart(false)}
                    minimumDate={moment().subtract(1, "month").toDate()}
                    maximumDate={endDate}
                  />
                  <DateTimePickerModal
                    isVisible={showEnd}
                    date={new Date(endDate)}
                    mode="date"
                    onConfirm={(date) => {
                      setEndDate(date);
                      setShowEnd(false);
                    }}
                    onCancel={() => setShowEnd(false)}
                    minimumDate={startDate}
                    maximumDate={new Date()}
                  />
                  <TouchableOpacity onPress={() => setShowStart(true)}>
                    <Label
                      style={{
                        fontSize: 18,
                        textAlign: "center",
                        width: deviceWidth / 2 - 20,
                      }}
                      place={moment(startDate).format("DD MMM")}
                    ></Label>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setShowEnd(true)}>
                    <Label
                      style={{
                        fontSize: 18,
                        textAlign: "center",
                        width: deviceWidth / 2 - 20,
                      }}
                      place={moment(endDate).format("DD MMM")}
                    ></Label>
                  </TouchableOpacity>
                </View>
                <Text style={{ ...styles.settingsText, color: theme.text }}>
                  {languages.show_dream_time}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 15,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setShowDreamTime(true);
                    }}
                  >
                    <Label
                      style={{
                        fontSize: 18,
                        textAlign: "center",
                        width: deviceWidth / 2 - 20,
                      }}
                      place={languages.yes}
                      focused={showDreamTime}
                    ></Label>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setShowDreamTime(false)}>
                    <Label
                      style={{
                        fontSize: 18,
                        textAlign: "center",
                        width: deviceWidth / 2 - 20,
                      }}
                      place={languages.no}
                      focused={!showDreamTime}
                    ></Label>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.shareButton}
                  disabled={isExcelGenerating}
                  onPress={() => {
                    if (
                      dreams.find((dream) => dream.started || !dream.endTime)
                    ) {
                      Alert.alert(languages.error, languages.error_Dream);
                    } else {
                      console.log("before share");
                      onShare(
                        date,
                        dreams,
                        languages,
                        nightDream,
                        wakefulness,
                        comment,
                        statistic,
                        setVisible,
                        activeChild,
                        startDate,
                        endDate,
                        { showTime: showDreamTime },
                        setIsExcelGenerating
                      );
                    }
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: theme.text,
                      textAlign: "center",
                      padding: 3,
                    }}
                  >
                    {isExcelGenerating
                      ? languages.excel_creating_title
                      : languages.share}
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>
          )}
        </View>
      ),
    },
  },
  // {
  //   name: 'SettingsNavigator',
  //   component: SettingsNavigator,
  //   options: {},
  // },
  {
    name: "NewDream",
    component: DreamTabNavigator,
    options: {
      headerShown: false,
      headerTitle: () => (
        <Text style={{ color: theme.text, fontWeight: "bold" }}>
          {languages.editing}
        </Text>
      ),
    },
  },
  {
    name: "SetTime",
    component: TimePicker,
    options: {},
  },
  {
    name: "AddTags",
    component: AddTags,
    options: {
      headerTitle: () => (
        <Text style={{ color: theme.text, fontWeight: "bold" }}>
          {languages.select_tag}
        </Text>
      ),
      // headerRight: () =>
      //   // added theme pass to the header
      //   _renderCreateButton({
      //     visible,
      //     setVisible,
      //     _handleButtonPressed,
      //     theme,
      //   }),
    },
  },

  {
    name: "SettingsStatisticsScreenDreams",
    component: SettingsStatisticsScreenDreams,
    options: {
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            dispatch(setStatisticsSection([]));
          }}
          style={{ paddingHorizontal: 10 }}
        >
          <Text style={{ color: theme.text, fontWeight: "bold" }}>
            {languages.reset}
          </Text>
        </TouchableOpacity>
      ),
      headerTitle: `${languages.listDays}`,
    },
  },
];

export const HomeNavigator = ({ navigation, route }) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const [modalState, setModalVisible] = useState(false);
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef();
  const [visible, setVisible] = useState(false);
  const [isExcelGenerating, setIsExcelGenerating] = useState(false);
  const routes = useNavigationState((state) => state);

  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [startDate, setStartDate] = useState(
    moment().subtract(6, "day").toDate()
  );
  const [endDate, setEndDate] = useState(moment().toDate());
  const [showDreamTime, setShowDreamTime] = useState(true);

  const [childrenModalVisible, setChildrenModalVisible] = useState(false);
  const [nightDream, setNightDream] = useState(true);
  const [wakefulness, setWakefulness] = useState(true);
  const [comment, setComment] = useState(true);
  const [statistic, setStatistic] = useState(true);
  const _handleButtonPressed = () => setVisible(!visible);
  const languages = useSelector(({ app }) => app.languages);
  const theme = useSelector(({ app }) => app.activeTheme);
  const date = useSelector(({ date }) => date.date);
  const dreams = useSelector(({ date }) => date.dreams);
  const dream = dreams.find((dream) => dream.started);
  const children = useSelector(({ child }) => child.children);
  const activeChild = useSelector(({ child }) => child.activeChild);

  const navigator = useNavigator(
    screens(
      { navigation },
      languages,
      theme,
      navigate,
      visible,
      setVisible,
      childrenModalVisible,
      setChildrenModalVisible,
      children,
      activeChild,
      _handleButtonPressed,
      showActionSheetWithOptions,
      date,
      dream,
      dispatch,
      dreams,
      nightDream,
      setNightDream,
      wakefulness,
      setWakefulness,
      comment,
      setComment,
      statistic,
      setStatistic,
      modalState,
      setModalVisible,
      routes,
      navigationRef,
      routeNameRef,
      showStart,
      showEnd,
      startDate,
      endDate,
      setShowStart,
      setShowEnd,
      setStartDate,
      setEndDate,
      showDreamTime,
      setShowDreamTime,
      isExcelGenerating,
      setIsExcelGenerating
    )
  );

  return navigator;
};
