import React from 'react';
import { connect } from 'react-redux';
import {
  setStatisticsSectionTC,
  getStatisticsDreamsTC,
  setStatisticsDreamsTC,
  setStatisticsViewTC,
  setLanguagesTC,
} from '../../../redux/reducers/appReducer';
import {
  setTimeLineDreams,
  setDreamColorStatistic,
  setGestureActive,
  setStatisticColorStatistic,
} from '../../../redux/reducers/statisticsReducer';
import SettingsStatisticsScreen from '../index';

const mapStateToProps = ({ app, statistics, date }) => {
  return {
    showMediana: statistics.showMediana,
    timeLineDreams: statistics.timeLineDreams,
    dreams: date.dreams,
    DreamIndicator: statistics.colorDreamIndicator,
    StatisticIndicator: statistics.colorStatisticIndicator,
    gesture: statistics.gesture,
    indicator: statistics.colorDreamIndicator,
    restDreams: app.restDreams,
    restView: app.restView,
    statisticSection: app.statisticSection,
    statisticsView: app.statisticsView,
    statisticsDreams: app.statisticsDreams,
    languages: app.languages,
    theme: app.activeTheme,
  };
};

export default connect(mapStateToProps, {
  setTimeLineDreams,
  getStatisticsDreamsTC,
  setStatisticsSectionTC,
  setStatisticsViewTC,
  setStatisticsDreamsTC,
  setLanguagesTC,
  setDreamColorStatistic,
  setGestureActive,
  setStatisticColorStatistic,
})(
  ({
    showMediana,
    timeLineDreams,
    dreams,
    restDreams,
    restView,
    gesture,
    DreamIndicator,
    StatisticIndicator,
    statisticsView,
    statisticsDreams,
    statisticSection,
    setStatisticsSectionTC,
    getStatisticsViewTC,
    setStatisticsDreamsTC,
    setStatisticsViewTC,
    languages,
    indicator,
    theme,
    setDreamColorStatistic,
    setGestureActive,
    setStatisticColorStatistic,
  }) => {
    return (
      <SettingsStatisticsScreen
        showMediana={showMediana}
        timeLineDreams={timeLineDreams}
        dreams={dreams}
        setStatisticsSectionTC={setStatisticsSectionTC}
        statisticSection={statisticSection}
        restDreams={restDreams}
        restView={restView}
        DreamIndicator={DreamIndicator}
        StatisticIndicator={StatisticIndicator}
        gesture={gesture}
        languages={languages}
        statisticsView={statisticsView}
        statisticsDreams={statisticsDreams}
        setStatisticsViewTC={setStatisticsViewTC}
        setStatisticsDreamsTC={setStatisticsDreamsTC}
        theme={theme}
        getStatisticsViewTC={getStatisticsViewTC}
        indicator={indicator}
        setDreamColorStatistic={setDreamColorStatistic}
        setGestureActive={setGestureActive}
        setStatisticColorStatistic={setStatisticColorStatistic}
      />
    );
  }
);
