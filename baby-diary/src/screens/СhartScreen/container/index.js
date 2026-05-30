import React from 'react';
import {
  setWeeksTC,
  setDreamsTC,
  setChartSettings,
} from '../../../redux/reducers/statisticsReducer';
import Chart from '../index';
import { connect } from 'react-redux';

const mapStateToProps = ({ statistics, app }) => ({
  weeks: statistics.weeks,
  dreams: statistics.dreams,
  activeDate: statistics.activeDate,
  loading: statistics.loading,
  chartSettings: statistics.chartSettings,
  theme: app.activeTheme,
});

export default connect(mapStateToProps, {
  setWeeksTC,
  setDreamsTC,
  setChartSettings,
})(
  ({
    dreams,
    weeks,
    setWeeksTC,
    languages,
    chartSettings,
    setChartSettings,
    theme,
  }) => {
    return (
      <Chart
        languages={languages}
        dreams={dreams}
        weeks={weeks}
        chartSettings={chartSettings}
        setChartSettings={setChartSettings}
        setWeeksTC={setWeeksTC}
        theme={theme}
      />
    );
  }
);
