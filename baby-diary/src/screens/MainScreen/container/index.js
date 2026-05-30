import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import {
  getDataTC,
  startDreamTC,
  endDreamTC,
  setLoading,
} from '../../../redux/reducers/mainReducer';
import MainScreen from '../index';
import { useNavigation } from '@react-navigation/native';
import { CenterBlock } from '../../../components';
import {
  getStatisticsSectionTC,
  setLaunchNumber,
} from '../../../redux/reducers/appReducer';
import {
  initChildren,
  changeChild,
} from '../../../redux/reducers/childReducer';
import { getCurrentRecommendation } from '../../../redux/reducers/childReducer';

const mapStateToProps = ({ date, app, child, statistics }) => {
  return {
    dreams: date.dreams,
    timeLineDreams: statistics.timeLineDreams,
    statisticSection: app.statisticSection,
    date: date.date,
    curTime: date.curTime,
    yesterdayDreams: date.yesterday,
    tomorrowDreams: date.tomorrow,
    isLoading: date.isLoading,
    statisticsView: app.statisticsView,
    children: child.children,
    activeChild: child.activeChild,
    currentRecommendation: child.recommendation,
    theme: app.activeTheme,
    indicator: statistics.colorDreamIndicator,
    gesture: statistics.gesture,
    activeLaunchNumber: app.activeLaunchNumber,
  };
};

export default connect(mapStateToProps, {
  getDataTC,
  startDreamTC,
  endDreamTC,
  getStatisticsSectionTC,
  initChildren,
  changeChild,
  getCurrentRecommendation,
  setLaunchNumber,
})(
  ({
    timeLineDreams,
    statisticSection,
    date,
    dreams,
    yesterdayDreams,
    tomorrowDreams,
    getDataTC,
    startDreamTC,
    endDreamTC,
    isLoading,
    statisticsView,
    children,
    activeChild,
    changeChild,
    theme,
    indicator,
    gesture,
    curTime,
    currentRecommendation,
    activeLaunchNumber,
    setLaunchNumber,
  }) => {
    const dispatch = useDispatch();
    useEffect(() => {
      // console.log('MAIN EFFECT 🧨', date, activeChild);
      dispatch(setLoading(true));
      getDataTC(date, activeChild);
    }, [date, activeChild]);

    return !isLoading ? (
      <MainScreen
        timeLineDreams={timeLineDreams}
        statisticSection={statisticSection}
        date={date}
        dreams={dreams}
        curTime={curTime}
        yesterdayDreams={yesterdayDreams}
        tomorrowDreams={tomorrowDreams}
        startDreamTC={startDreamTC}
        endDreamTC={endDreamTC}
        statisticsView={statisticsView}
        children={children}
        activeChild={activeChild}
        changeChild={changeChild}
        currentRecommendation={currentRecommendation}
        theme={theme}
        indicator={indicator}
        gesture={gesture}
        activeLaunchNumber={activeLaunchNumber}
        setLaunchNumber={setLaunchNumber}
      />
    ) : (
      <CenterBlock>
        <ActivityIndicator size='large' color='#1768AF' />
      </CenterBlock>
    );
  }
);
