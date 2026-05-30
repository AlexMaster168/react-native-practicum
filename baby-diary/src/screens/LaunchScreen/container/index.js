import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  setLanguagesTC,
  setLaunchTC,
  setNightTimeTC,
  setTheme,
  setLaunchNumber,
} from '../../../redux/reducers/appReducer';
import LaunchScreen from '../';
import { initChildren } from '../../../redux/reducers/childReducer';
import {
  createDefaultInfo,
  initReminders,
} from '../../../redux/reducers/directoryReducer';
import { useColorTheme } from '../../../hooks/useTheme';

const mapStateToProps = ({ app }) => ({
  isLaunched: app.isLaunched,
  theme: app.activeTheme,
  languages: app.languages,
  activeLaunchNumber: app.activeLaunchNumber,
});

export default connect(mapStateToProps, {
  setLaunchTC,
  setLanguagesTC,
  setNightTimeTC,
  initChildren,
  initReminders,
  createDefaultInfo,
  setTheme,
  setLaunchNumber,
})(
  ({
    initChildren,
    initReminders,
    setNightTimeTC,
    activeLaunchNumber,
    isLaunched,
    setLaunchTC,
    setLanguagesTC,
    languages,
    createDefaultInfo,
    setTheme,
    setLaunchNumber,
  }) => {
    useEffect(() => {
      setLanguagesTC();
    }, [languages]);

    useEffect(() => {
      setLaunchTC();
      setNightTimeTC('start');
      setNightTimeTC('end');
      initChildren();
      initReminders();
      createDefaultInfo('places', languages);
      createDefaultInfo('tags', languages);
      setTheme();
      setLaunchNumber();
    }, []);

    const theme = useColorTheme();

    return (
      <LaunchScreen
        theme={theme}
        isLaunched={isLaunched}
        setLaunchTC={setLaunchTC}
        activeLaunchNumber={activeLaunchNumber}
      />
    );
  }
);
