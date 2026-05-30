import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  setWeeksTC,
  setDreamsTC,
  setDiagramPrevDreamsTC,
} from '../../../redux/reducers/statisticsReducer';
import {
  getStatisticsViewTC,
  getStatisticsDreamsTC,
  setLanguagesTC,
} from '../../../redux/reducers/appReducer';
import moment from 'moment';
import { CenterBlock } from '../../../components';
import { ActivityIndicator } from 'react-native';
import { StatisticsScreen } from '../index';
import { eachDayOfInterval } from 'date-fns';
import { useIsFocused } from '@react-navigation/native';

const mapStateToProps = ({ statistics, app, child }) => ({
  weeks: statistics.weeks,
  dreams: statistics.dreams,
  prevActiveDate: statistics.prevActiveDate,
  nextActiveDate: statistics.nextActiveDate,
  loading: statistics.loading,
  statisticsDreams: app.statisticsDreams,
  statisticsView: app.statisticsView,
  languages: app.languages,
  theme: app.activeTheme,
  activeChild: child.activeChild,
  // tableMode: statistics.tableMode,
  statisticIndicator: statistics.colorStatisticIndicator,
});

export default connect(mapStateToProps, {
  setWeeksTC,
  setDreamsTC,
  getStatisticsViewTC,
  getStatisticsDreamsTC,
  setLanguagesTC,
})(
  ({
    dreams,
    weeks,
    statisticsView,
    statisticsDreams,
    loading,
    setLanguagesTC,
    languages,
    theme,
    activeChild,
    statisticIndicator,
  }) => {
    const dispatch = useDispatch();
    const chartRanges = useSelector(({ statistics }) => statistics.chartRanges);
    const { value: tableMode } = useSelector(
      ({ statistics }) => statistics.tableMode
    );
    const isFocused = useIsFocused();

    useEffect(() => {
      setLanguagesTC();
    }, [languages]);

    useEffect(() => {
      const start = chartRanges[tableMode].start;
      const end = chartRanges[tableMode].end;

      dispatch(setDreamsTC(eachDayOfInterval({ end, start })));
      dispatch(setWeeksTC(start, end));
      if (tableMode.includes('diagram')) {
        dispatch(setDiagramPrevDreamsTC(moment(start).subtract(1, 'day')));
      }
    }, [tableMode, chartRanges, activeChild, isFocused]);

    return !loading ? (
      <StatisticsScreen
        weeks={weeks}
        dreams={dreams}
        setWeeksTC={setWeeksTC}
        statisticsDreams={statisticsView}
        statisticsView={statisticsDreams}
        languages={languages}
        theme={theme}
        activeChild={activeChild}
        indicator={statisticIndicator}
      />
    ) : (
      <CenterBlock>
        <ActivityIndicator size='large' color='#1768AF' />
      </CenterBlock>
    );
  }
);
