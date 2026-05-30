import React, { useState } from 'react';
import {
  Text,
  Switch,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { styles } from './styles';
import {
  setTimeLineDreams,
  setStatisticColorIndicator,
  setShowMediana,
} from '../../redux/reducers/statisticsReducer';
import { useDispatch } from 'react-redux';
import { AdBanner } from '../../components';
import { updatedStatistics } from '../../redux/reducers/appReducer';
import { getDreamByType } from '../../utils/calcStatistics';

import DraggableFlatList from 'react-native-draggable-flatlist';
import Swipeable from 'react-native-gesture-handler/Swipeable';
const deviceWidth = Dimensions.get('window').width;

const _settingsStatistics = (languages) => [
  {
    title: `${languages.total_sleep}`,
    value: 'total_sleep',
  },
  {
    title: `${languages.total_day_sleep}`,
    value: 'total_day_sleep',
  },
  {
    title: `${languages.total_night_sleep}`,
    value: 'total_night_sleep',
  },
  {
    title: `${languages.average_sleep}`,
    value: 'average_sleep',
  },
  {
    title: `${languages.average_day_sleep}`,
    value: 'average_day_sleep',
  },
  {
    title: `${languages.average_night_sleep}`,
    value: 'average_night_sleep',
  },
  {
    title: `${languages.total_wakefulness}`,
    value: 'total_wakefulness',
  },
];

const _renderSettings = (
  dispatch,
  statisticsDreams,
  _handleSettingsUpdate,
  languages,
  _settingsStatistics,
  theme
) => {
  const swipeRef = React.useRef([]);

  const renderItem = ({ item, setting, index, drag }) => (
    <TouchableOpacity onLongPress={drag}>
      <Swipeable
        ref={(el) => (swipeRef.current[item.value] = el)}
        key={item.value}
        renderLeftActions={() => renderLeftActions(item)}
      >
        <View
          style={{
            ...styles.settingStatisticItem,
            backgroundColor: theme.navigator,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: theme.text, paddingVertical: 10 }}>
            {item.title}
          </Text>
        </View>
      </Swipeable>
    </TouchableOpacity>
  );
  const _toggleEnable = (item) => {
    console.log(item);
    _handleSettingsUpdate(item.value);
  };
  const renderLeftActions = (item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          _toggleEnable(item);
          swipeRef.current[item.value].close();
        }}
        style={{
          borderRadius: 10,
          ...styles.settingStatisticItem,
          backgroundColor: 'red',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: theme.text,
          }}
        >
          {languages.delete}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView horizontal={true}>
      <DraggableFlatList
        data={
          statisticsDreams.length < 1
            ? _settingsStatistics(languages)
            : statisticsDreams
        }
        contentContainerStyle={{ width: deviceWidth - 40 }}
        getItemLayout={(data, index) => ({
          length: 25,
          offset: 25 * index,
          index,
        })}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onDragEnd={({ data }) =>
          dispatch(updatedStatistics('statisticsDreams', data))
        }
      />
    </ScrollView>
  );
};

const toggleColorIndicator = (
  gesture,
  indicator,
  dispatch,
  dreamColor,
  setDreamColor,
  statisticColor,
  setStatisticColor,
  setStatisticColorStatistic,
  setDreamColorStatistic
) => {
  setStatisticColor(!statisticColor);
  setStatisticColorStatistic(!statisticColor);
  dispatch(setStatisticColorIndicator(!statisticColor));
};

const toggleGestures = (gestur, setGesture, setGestureActive) => {
  setGesture(!gestur);
  setGestureActive(!gestur);
};
const toggletimeLine = (dispatch, timeLineDreams) => {
  dispatch(setTimeLineDreams(!timeLineDreams));
};

const SettingsStatisticsScreen = ({
  showMediana,
  timeLineDreams,
  dreams,
  setStatisticsSectionTC,
  statisticSection,
  restDreams,
  restView,
  StatisticIndicator,
  DreamIndicator,
  gesture,
  statisticsView,
  statisticsDreams,
  setStatisticsViewTC,
  setStatisticsDreamsTC,
  languages,
  indicator,
  theme,
  setStatisticsDreams,
  setDreamColorStatistic,
  setGestureActive,
  setStatisticColorStatistic,
}) => {
  const dreamDay = getDreamByType('day', dreams);
  const dreamNight = getDreamByType('night', dreams);

  const [dreamColor, setDreamColor] = useState(DreamIndicator ? true : false);
  const [statisticColor, setStatisticColor] = useState(
    StatisticIndicator ? true : false
  );
  const [gestur, setGesture] = useState(gesture ? true : false);
  const dispatch = useDispatch();

  const _handleSettingsUpdate = (settingValue) => {
    const updatedSettings =
      statisticsDreams.length < 1
        ? _settingsStatistics(languages).find(
            ({ value }) => value === settingValue
          )
        : statisticsDreams.find(({ value }) => value === settingValue);
    console.log('settingValue', settingValue);
    setStatisticsDreamsTC(updatedSettings);
  };

  return (
    <React.Fragment>
      <ScrollView
        style={{
          ...styles.settingStatisticsContainer,
          backgroundColor: theme.background,
        }}
      >
        <View
          style={{
            paddingHorizontal: 5,
            marginTop: 10,
            borderRadius: 10,
            backgroundColor: theme.navigator,
          }}
        >
          <View
            style={{
              ...styles.settingStatisticItem,
              marginTop: 0,
              borderColor: theme.background,
              borderStyle: 'solid',
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ color: theme.text }}>
              {languages.show_indicator}
            </Text>
            <Switch
              onValueChange={() =>
                toggleColorIndicator(
                  gestur,
                  indicator,
                  dispatch,
                  dreamColor,
                  setDreamColor,
                  statisticColor,
                  setStatisticColor,
                  setDreamColorStatistic,
                  setStatisticColorStatistic
                )
              }
              value={statisticColor}
            />
          </View>
          <View
            style={{
              ...styles.settingStatisticItem,
              marginTop: 0,
            }}
          >
            <Text style={{ color: theme.text }}>
              {languages.hidden_mediana}
            </Text>
            <Switch
              onValueChange={() => dispatch(setShowMediana(!showMediana))}
              value={showMediana}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginVertical: 10,
            paddingHorizontal: 5,
          }}
        >
          <Text
            style={{
              fontSize: 11,
              opacity: 0.7,
              color: theme.text,
            }}
          >
            {languages.events_instruct[0]}
          </Text>
          <Text
            style={{
              fontSize: 11,
              opacity: 0.7,
              color: '#fff',
            }}
          >
            {languages.events_instruct[1]}
          </Text>
        </View>

        <View style={{ paddingBottom: 10 }}>
          {_renderSettings(
            dispatch,
            statisticsDreams,
            _handleSettingsUpdate,
            languages,
            _settingsStatistics,
            theme
          )}
        </View>
      </ScrollView>
      <AdBanner />
    </React.Fragment>
  );
};
export default SettingsStatisticsScreen;
