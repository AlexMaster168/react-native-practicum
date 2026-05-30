import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { DreamTotalSleep } from '../index';
import { useSelector } from 'react-redux';
import {
  calcAverage,
  calcTotalSleep,
  calcWakefulness,
  getDreamByType,
  calcMedianaTotalSleep,
  calcMedianaTotalSleepDay,
  calcMedianaTotalSleepNight,
  calcMedianaWakefulness,
  calcMedianaAverageSleep,
  calcMedianaAvarageSleepDay,
  calcMedianaAvarageSleepNight,
} from '../../utils/calcStatistics';
import { filterByTimeOfDay } from '../../utils/filterByTimeOfDay';
import { styles } from './styles';

const _renderStatisticsSection = (
  showMediana,
  dreams,
  statisticsView,
  section,
  index,
  theme,
  birthday,
  indicator
) => {
  const isDisable =
    statisticsView.length > 0
      ? !statisticsView.find(({ value }) => value === section.value)
      : false;

  const languages = useSelector(({ app }) => app.languages);

  return (
    !isDisable && (
      <View key={index} style={styles.dreamsStatisticsTotal}>
        <Text style={{ ...styles.dreamsStatisticsText, color: theme.text }}>
          {section.title}
        </Text>
        <View
          style={{
            backgroundColor: theme.navigator,
            borderRadius: 10,
            padding: 3,
          }}
        >
          <View
            style={{ ...styles.dreamsStatistics, backgroundColor: theme.ba }}
          >
            {dreams.map((dream, index) =>
              section.render(dream.dream, index, birthday, indicator)
            )}
          </View>
          {showMediana ? (
            <View
              style={{
                padding: 5,
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Text
                style={{
                  opacity: 0.6,
                  color: theme.text,
                  fontSize: 10,
                  fontWeight: 'normal',
                }}
              >
                {languages.mediana}:
              </Text>
              <Text
                style={{
                  overflow: 'hidden',
                  marginLeft: 5,
                  backgroundColor: theme.background,
                  fontSize: 12,
                  textAlign: 'center',
                  borderRadius: 5,
                  color: theme.text,
                  paddingHorizontal: 5,
                }}
              >
                {section.madians}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    )
  );
};

const statisticsSections = (languages, dreams) => [
  {
    title: `${languages.total_sleep}`,
    value: 'total_sleep',
    madians: calcMedianaTotalSleep(dreams),
    render: (dream, index, birthday, indicator) => (
      <DreamTotalSleep
        languages={languages}
        key={index}
        totalSleep={calcTotalSleep(dream)}
        tag={'total_sleep'}
        birthday={birthday}
        indicator={indicator}
      />
    ),
  },
  {
    title: `${languages.total_day_sleep}`,
    value: 'total_day_sleep',
    madians: calcMedianaTotalSleepDay(dreams),
    render: (dream, index, birthday, indicator) => (
      <DreamTotalSleep
        languages={languages}
        key={index}
        totalSleep={filterByTimeOfDay(dream, 'day')}
        tag={'total_day_sleep'}
        birthday={birthday}
        indicator={indicator}
      />
    ),
  },
  {
    title: `${languages.total_night_sleep}`,
    value: 'total_night_sleep',
    madians: calcMedianaTotalSleepNight(dreams),
    render: (dream, index, birthday, indicator) => (
      <DreamTotalSleep
        languages={languages}
        key={index}
        totalSleep={filterByTimeOfDay(dream, 'night')}
        tag={'total_night_sleep'}
        birthday={birthday}
        indicator={indicator}
      />
    ),
  },
  {
    title: `${languages.average_sleep}`,
    value: 'average_sleep',
    madians: calcMedianaAverageSleep(dreams),
    render: (dream, index, birthday, indicator) => (
      <DreamTotalSleep
        languages={languages}
        key={index}
        totalSleep={calcAverage(calcTotalSleep(dream), dream.length)}
        tag={'average_sleep'}
        birthday={birthday}
        indicator={indicator}
      />
    ),
  },
  {
    title: `${languages.average_day_sleep}`,
    value: 'average_day_sleep',
    madians: calcMedianaAvarageSleepDay(dreams),
    render: (dream, index, birthday, indicator) => (
      <DreamTotalSleep
        languages={languages}
        key={index}
        totalSleep={calcAverage(
          calcTotalSleep(getDreamByType('day', dream)),
          getDreamByType('day', dream).length
        )}
        tag={'average_day_sleep'}
        birthday={birthday}
        indicator={indicator}
      />
    ),
  },
  {
    title: `${languages.average_night_sleep}`,
    value: 'average_night_sleep',
    madians: calcMedianaAvarageSleepNight(dreams),
    render: (dream, index, birthday, indicator) => (
      <DreamTotalSleep
        languages={languages}
        key={index}
        totalSleep={calcAverage(
          calcTotalSleep(getDreamByType('night', dream)),
          getDreamByType('night', dream).length
        )}
        tag={'total_night_sleep'}
        birthday={birthday}
        indicator={indicator}
      />
    ),
  },
  {
    title: `${languages.total_wakefulness}`,
    value: 'total_wakefulness',
    madians: calcMedianaWakefulness(dreams),
    render: (dream, index) => (
      <DreamTotalSleep
        languages={languages}
        key={index}
        totalSleep={calcWakefulness(dream) || 0}
      />
    ),
  },
];

const DreamStatistic = ({
  dreams,
  statisticsView,
  languages,
  theme,
  birthday,
  indicator,
}) => {
  const showMediana = useSelector(({ statistics }) => statistics.showMediana);
  const order = statisticsView.map((item) => item.value);
  return (
    <View>
      <ScrollView style={styles.dreamsStatisticsContainer}>
        {statisticsSections(languages, dreams)
          .sort((a, b) => order.indexOf(a.value) - order.indexOf(b.value))
          .map((section, index) =>
            _renderStatisticsSection(
              showMediana,
              dreams,
              statisticsView,
              section,
              index,
              theme,
              birthday,
              indicator
            )
          )}
      </ScrollView>
    </View>
  );
};

export default DreamStatistic;
