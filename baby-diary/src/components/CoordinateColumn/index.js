import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { timeDifference } from '../../utils/calcStatistics';
import Modal from 'react-native-modal';
import { Label } from '../index';
import moment from 'moment';
import { styles } from './styles';

import RatioDiagramBar from '../RatioDiagramBar';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const _dreamStyle = ({ startPoint, height, offset, timeOfDay, tableMod }) => {
  // console.log(height * offset);
  if (tableMod === 'ratio_diagram') {
    return {
      ...styles.ratioDreamDiagram,
      left: startPoint * offset,
      width: height ? height : 1,
      zIndex: 2,
      backgroundColor: timeOfDay === 'day' ? '#FF8500' : '#33006D',
    };
  } else {
    return {
      ...styles.dreamDiagram,
      top: startPoint * offset,
      height: height ? height : 1,
      // width: deviceWidth * 0.1,
      backgroundColor: timeOfDay === 'day' ? '#FF8500' : '#33006D',
      zIndex: 2,
    };
  }
};
const _dreamStyleDay = ({
  dayStartPoint,
  dayHeight,
  offset,
  languages,
  deviceHeight,
  tableMode,
  type,
}) => {
  if (tableMode === 'ratio_diagram') {
    return {
      ...styles.ratioDreamDiagram,
      left: dayStartPoint * offset,
      width: dayHeight ? dayHeight : 1,
      opacity: 0.1,
      zIndex: 0,
      backgroundColor: 'yellow',
    };
  } else {
    return {
      ...styles.dreamDiagram,
      top: dayStartPoint * offset,
      zIndex: 0,
      opacity: 0.1,
      backgroundColor: 'yellow',
      height: dayHeight ? dayHeight : 1,
      // width: deviceWidth * 0.1,
      // flexGrow: 1,
      // flex: 1,
    };
  }
};
const _dreamStyleNight = ({
  nightEndPoint,
  nightHeightEnd,
  nightHeightStart,
  nightStartPoint,
  offset,
  languages,
  tableMode,
  type,
  dreamLength,
}) => {
  // console.log('nightHeight', nightHeightEnd);
  if (type === 'start') {
    if (tableMode === 'ratio_diagram') {
      return {
        ...styles.ratioDreamDiagram,
        opacity: 0.2,
        left: nightStartPoint * offset,
        width: nightHeightStart ? nightHeightStart : 1,
        backgroundColor: '#33006D',
      };
    } else {
      return {
        ...styles.dreamDiagram,
        opacity: 0.3,
        top: nightStartPoint * offset,
        zIndex: -1,
        height: nightHeightStart ? nightHeightStart : 1,
        // width: dreamLength ? deviceWidth / dreamLength : deviceWidth * 0.1,
        flex: 1,
        backgroundColor: '#33006D',
      };
    }
  } else {
    if (tableMode === 'ratio_diagram') {
      return {
        ...styles.ratioDreamDiagram,
        opacity: 0.2,
        left: nightEndPoint * offset,
        width: nightHeightEnd ? nightHeightEnd : 1,
        backgroundColor: '#33006D',
      };
    } else {
      return {
        ...styles.dreamDiagram,
        top: nightEndPoint * offset,
        zIndex: -1,
        opacity: 0.1,
        height: nightHeightEnd ? nightHeightEnd : 1,
        // width: dreamLength ? deviceWidth / dreamLength : deviceWidth * 0.1,
        backgroundColor: '#33006D',
      };
    }
  }
};
const _dreamStyles = ({
  nightEndPoint,
  nightHeightEnd,
  nightHeightStart,
  nightStartPoint,
  offset,
  languages,
  deviceHeight,
  tableMod,
  type,
}) => {
  // console.log('nightssaaaaaaaaaaaaaaaaaaHeight', nightStartPoint);
  if (type === 'start') {
    if (tableMod === 'ratio_diagram') {
      return {
        ...styles.ratioDreamDiagram,
        left: wakeStartPoint * offset,
        width: nightHeightEnd ? nightHeightEnd : 1,
        backgroundColor: '#33006D',
      };
    } else {
      return {
        ...styles.dreamDiagram,
        height: nightHeightStart ? nightHeightStart : 1,
        // width: deviceWidth * 0.1,
        backgroundColor: '#33006D',
      };
    }
  } else {
    if (tableMod === 'ratio_diagram') {
      return {
        ...styles.ratioDreamDiagram,
        left: wakeStartPoint * offset,
        width: nightHeightEnd ? nightHeightEnd : 1,
        backgroundColor: '#33006D',
      };
    } else {
      return {
        ...styles.dreamDiagram,
        height: nightHeightEnd ? nightHeightEnd : 1,
        // width: deviceWidth * 0.1,
        backgroundColor: '#33006D',
      };
    }
  }
};
const _dreamStyleWakefulness = ({
  wakeStartPoint,
  wakeHeight,
  offset,
  languages,
  tableMod,
}) => {
  if (tableMod === 'ratio_diagram') {
    return {
      ...styles.ratioDreamDiagram,
      left: wakeStartPoint * offset,
      width: wakeHeight ? wakeHeight : 1,
      backgroundColor: 'yellow',
    };
  } else {
    return {
      ...styles.dreamDiagram,
      top: wakeStartPoint * offset,
      height: wakeHeight ? wakeHeight : 1,
      // width: dreamLength ? deviceWidth / dreamLength : deviceWidth * 0.1,
      backgroundColor: 'yellow',
      zIndex: 2,
    };
  }
};

const _getDataForRender = (dream, offset, day, wakefulness) => {
  let start = dream.startTime;
  let end = dream.endTime;

  if (
    dream.timeOfDay === 'night' &&
    moment(day).format('DD MMM') !== moment(dream.startDate).format('DD MMM')
  ) {
    start = '00:00';
  }
  if (
    dream.timeOfDay === 'night' &&
    moment(day).format('DD MMM') === moment(dream.startDate).format('DD MMM') &&
    moment(day).format('DD MMM') !== moment(dream.endDate).format('DD MMM')
  ) {
    end = '23:59';
  }

  let startPoint = start.split(':');
  let startPointInMinutes = +startPoint[0] * 60 + +startPoint[1];
  let endPoint = end.split(':');
  let endPointInMinutes = +endPoint[0] * 60 + +endPoint[1];
  let diff = timeDifference(start, end) * offset;

  if (diff < 0) {
    diff = -1 * diff;
  }
  if (wakefulness) {
    if (
      moment(day).local().format('DD MMM') ===
        moment(dream.startDate).format('DD MMM') &&
      dream.timeOfDay === 'night'
    ) {
      const wakeHeight = 0;
      return {
        wakeStartPoint: 0,
        wakeHeight,
      };
    }

    let diff = dream.wakefulness?.inMinutes * offset;
    if (diff < 0) {
      diff = -1 * diff;
    }

    let wakeHeight = diff;
    if (endPointInMinutes + wakeHeight > 1440) {
      wakeHeight = 1440 - endPointInMinutes;
    }

    return {
      wakeStartPoint: parseInt(endPointInMinutes), //endPoint: parseInt(endPoint),
      wakeHeight,
    };
  }

  const height = diff;
  // console.log(parseInt(startPointInMinutes), height);
  return {
    startPoint: parseInt(startPointInMinutes), //endPoint: parseInt(endPoint),
    height,
  };
};
const _getDataForRenderDay = (
  startNightSleep,
  endNightSleep,
  nightHeightEnd,
  nightStartPoint,
  offset,
  hourOffset,
  day,
  wakefulness
) => {
  let end = endNightSleep.toString();
  let start = startNightSleep.toString();
  let startPoint = start.split(':');
  let startPointInMinutes = +startPoint[0] * 60 + +startPoint[1];
  let endPoint = end.split(':');
  let endPointInMinutes = +endPoint[0] * 60 + +endPoint[1];
  let diff = -timeDifference(start, end) * offset;

  // console.log('dissff', diff);

  return {
    dayStartPoint: endPointInMinutes,
    dayHeight: diff,
  };
};
const _getDataForRenderStartNight = (
  startNightSleep,
  endNightSleep,
  offset,
  type
) => {
  let startDay, endDay;
  if (type === 'start') {
    endDay = endNightSleep.toString();
    startDay = '00:00';
    let startPoint = startDay.split(':');
    let startPointInMinutes = +startPoint[0] * 60 + +startPoint[1];
    let endPoint = endDay.split(':');
    let endPointInMinutes = +endPoint[0] * 60 + +endPoint[1];
    let diff = timeDifference(startDay, endDay) * offset;

    const nightHeightStart = diff;

    return { nightStartPoint: 0, nightHeightStart, endPointInMinutes };
  } else {
    startDay = '23:59';
    endDay = startNightSleep.toString();
    let startPoint = startDay.split(':');
    // console.log(startPoint[0], startPoint[1]);
    let startPointInMinutes = +startPoint[0] * 60 + +startPoint[1];
    let endPoint = endDay.split(':');
    let endPointInMinutes = +endPoint[0] * 60 + +endPoint[1];
    let diff = timeDifference(startDay, endDay) * offset;
    if (diff < 0) {
      diff = -1 * diff;
    }
    const nightHeightEnd = diff;
    // console.log('g', endPointInMinutes);
    // console.log('ss', diff);
    return {
      startPointInMinutes,
      nightEndPoint: endPointInMinutes,
      nightHeightEnd,
    };
  }
};

const _renderSpaces = (theme) => {
  // промежутки в "Диаграмма"
  const spaces = [...new Array(23)];

  const margin = (deviceHeight * 0.5) / spaces.length - 0.85;

  return spaces.map((_, index) => (
    <View
      key={index}
      style={{
        position: 'absolute',
        zIndex: 2,
        backgroundColor: theme?.background || 'red',
        top: (index + 1) * margin,
        height: 2,
        width: '100%',
      }}
    ></View>
  ));
};

const _renderDay = (
  dreams,
  offset,
  languages,
  day,
  visible,
  setVisible,
  tableMod,
  activeDream,
  setActiveDream
) => {
  const handlePressDream = (dream) => {
    setVisible(!visible);
    dream.isPressedWake = false;
    setActiveDream(dream);
    if (languages.date_locale === 'eu') {
      let date = moment(activeDream.startDate).format('DD MMM').split(' ');
      activeDream.startDate = moment()
        .month(date[1])
        .date(date[0])
        .format('DD MMM');
    }
  };

  const handlePressWakefulness = (dream) => {
    setVisible(!visible);
    dream.isPressedWake = true;
    setActiveDream(dream);
    if (languages.date_locale === 'eu') {
      let date = moment(activeDream.startDate).format('DD MMM').split(' ');
      activeDream.startDate = moment()
        .month(date[1])
        .date(date[0])
        .format('DD MMM');
    }
  };

  const renderStats = () =>
    dreams.map((dream, index) => {
      if (!dream.wakefulness) {
        return;
      }
      const { startPoint, height } = _getDataForRender(
        dream,
        offset,
        day,
        false
      );
      const { wakeStartPoint, wakeHeight } =
        dream.wakefulness?.inMinutes !== 0
          ? _getDataForRender(dream, offset, day, true)
          : {
              wakeStartPoint: 0,
              wakeHeight: 0,
            };

      return (
        <View key={index}>
          <TouchableOpacity
            key={index}
            style={_dreamStyle({
              startPoint,
              height,
              offset,
              timeOfDay: dream.timeOfDay,
              languages,
              tableMod,
            })}
            onPress={() => handlePressDream(dream)}
          />
          {wakeHeight !== 0 && (
            <TouchableOpacity
              key={index + 'q'}
              style={_dreamStyleWakefulness({
                wakeStartPoint,
                wakeHeight,
                offset,
                timeOfDay: dream.timeOfDay,
                languages,
                tableMod,
              })}
              onPress={() => handlePressWakefulness(dream)}
            />
          )}
        </View>
      );
    });

  return (
    <React.Fragment>
      {renderStats()}
      {visible && (
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
              width: deviceWidth,
              height: deviceHeight / 4,
            }}
          >
            {!activeDream.isPressedWake ? (
              <View>
                <Text style={styles.modalDate}>
                  {moment(activeDream.startDate).format('DD MMM') ===
                  moment(activeDream.endDate).format('DD MMM')
                    ? moment(activeDream.startDate).format('DD MMM')
                    : `${moment(activeDream.startDate).format(
                        'DD MMM'
                      )} - ${moment(activeDream.endDate).format('DD MMM')}`}
                </Text>
                <Text style={styles.modalSleepTime}>
                  {activeDream.timeOfDay === 'day'
                    ? `${languages.day_sleep}: `
                    : `${languages.night_sleep}: `}
                  {activeDream.startTime} - {activeDream.endTime}
                </Text>
                <View style={{ ...styles.placeContainer }}>
                  <Label
                    style={{ padding: 10, backgroundColor: 'red' }}
                    place={activeDream.place}
                    tag={activeDream.place}
                    focused
                  />
                </View>
              </View>
            ) : (
              <View>
                <Text style={styles.modalDate}>
                  {moment(activeDream.startDate).format('DD MMM')}
                </Text>
                <Text style={styles.modalSleepTime}>
                  {activeDream.startTime}
                </Text>
                <Text>
                  {languages.wakefulness_text} {activeDream.wakefulness.value}
                </Text>
              </View>
            )}
          </View>
        </Modal>
      )}
    </React.Fragment>
  );
};

const _renderTimeLIne = (hourOffset, firstOrLast, theme, daysLength) => {
  let arrayHours = [...Array(24)];
  let margin = -hourOffset - hourOffset;
  return arrayHours.map((item, index) => {
    margin = margin + hourOffset;

    return (
      <View
        style={{
          ...styles.hourCell,
          marginTop: margin + hourOffset,
          backgroundColor: theme.text,
          position: 'absolute',
        }}
      >
        <Text
          style={
            firstOrLast
              ? {
                  position: 'absolute',
                  right: 10,
                  fontSize: 12,
                  color: theme.text || '#ffffff',
                }
              : {
                  position: 'absolute',
                  left:
                    deviceWidth / daysLength -
                    (daysLength > 6 ? 5 : daysLength < 4 ? 17.5 : 10),
                  fontSize: 12,
                  color: theme.text || '#ffffff',
                }
          }
        >
          {index}
        </Text>
      </View>
    );
  });
};

const CoordinateColumn = ({
  dreams,
  offset,
  languages,
  day,
  hourOffset,
  tableMode,
  columnIndex,
  startNightSleep,
  endNightSleep,
  daysLength,
}) => {
  const [visible, setVisible] = useState(false);
  const theme = useSelector(({ app }) => app.activeTheme);
  const activeLanguage = useSelector(({ app }) => app.activeLanguage);

  const [activeDream, setActiveDream] = useState(null);

  const { nightStartPoint, nightHeightStart } = _getDataForRenderStartNight(
    startNightSleep,
    endNightSleep,
    offset,
    'start'
  );
  const { nightEndPoint, nightHeightEnd } = _getDataForRenderStartNight(
    startNightSleep,
    endNightSleep,
    offset,
    'end'
  );
  const { dayStartPoint, dayHeight } = _getDataForRenderDay(
    startNightSleep,
    endNightSleep,
    nightHeightEnd,
    nightStartPoint,
    offset,
    hourOffset,
    day,
    false
  );
  let daysOfWeek = moment(day).locale(activeLanguage).format('DD dd');

  const diagramsLayout = (columnIndex) => {
    return (
      <React.Fragment key={columnIndex}>
        {daysOfWeek && (
          <View
            style={{
              flexGrow: 1,
              padding: 2.5,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                alignSelf: 'center',
                color: theme.text || '#ffffff',
              }}
            >
              {daysOfWeek.slice(0, 2)}
            </Text>
            <Text
              style={{
                paddingBottom: 5,
                fontSize: 12,
                alignSelf: 'center',

                color: theme.text || '#ffffff',
              }}
            >
              {daysOfWeek.slice(3)}
            </Text>
            <View
              style={{
                ...styles.column,
                height: deviceHeight * 0.5,
              }}
            >
              <View
                style={{
                  ..._dreamStyleDay({
                    dayStartPoint,
                    dayHeight,
                    offset,
                    languages,
                    deviceHeight,
                    tableMode,
                  }),
                }}
              />
              <View
                style={{
                  ..._dreamStyleNight({
                    nightEndPoint,
                    nightHeightEnd,
                    nightHeightStart,
                    nightStartPoint,
                    offset,
                    languages,
                    tableMode,
                    type: 'start',
                  }),
                }}
              />

              <View
                style={{
                  ..._dreamStyleNight({
                    nightEndPoint,
                    nightHeightEnd,
                    offset,
                    languages,
                    deviceHeight,
                    tableMode,
                    type: 'end',
                  }),
                }}
              />
              {columnIndex === 0
                ? _renderTimeLIne(hourOffset, true, theme)
                : columnIndex === daysLength - 1
                ? _renderTimeLIne(hourOffset, false, theme, daysLength)
                : null}
              {_renderDay(
                dreams,
                offset,
                languages,
                day,
                visible,
                setVisible,
                tableMode,
                activeDream,
                setActiveDream
              )}
              {tableMode === 'diagram' ? _renderSpaces(theme) : null}
            </View>
          </View>
        )}
      </React.Fragment>
    );
  };
  if (tableMode === 'ratio_diagram') {
    return <RatioDiagramBar day={day} dreams={dreams} />;
  }
  return diagramsLayout(columnIndex);
};

export default CoordinateColumn;
