import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getInfo } from '../../../redux/reducers/directoryReducer';
import { setLanguagesTC } from '../../../redux/reducers/appReducer';
import {
  getCurrentDream,
  startDreamTC,
  endDreamTC,
} from '../../../redux/reducers/mainReducer';
import { LogBox } from 'react-native';
import SettingGrafScreen from '../index';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const mapStateToProps = ({ directory, app, date, statistics }) => ({
  chartSettings: statistics.chartSettings,
});

export default connect(mapStateToProps, {
  getInfo,
  setLanguagesTC,
  getCurrentDream,
  startDreamTC,
  endDreamTC,
})(({ setLanguagesTC, languages, chartSettings }) => {
  useEffect(() => {
    setLanguagesTC();
  }, [languages]);

  return <SettingGrafScreen chartSettings={chartSettings} />;
});
