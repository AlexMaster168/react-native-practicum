import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  setNightTimeTC,
  getNightTimeTC,
  setLanguagesTC,
  setActiveLanguageTC,
} from '../../../redux/reducers/appReducer';
import { enableAdds } from '../../../redux/reducers/directoryReducer';
import SettingsGeneralScreen from '../index';
import { useNavigation } from '@react-navigation/native';

const mapStateToProps = ({ app }) => {
  return {
    startNightSleep: app.startNightSleep,
    endNightSleep: app.endNightSleep,
    languages: app.languages,
    activeLanguage: app.activeLanguage,
    theme: app.activeTheme,
  };
};

export default connect(mapStateToProps, {
  setNightTimeTC,
  getNightTimeTC,
  setLanguagesTC,
  setActiveLanguageTC,
  enableAdds,
})(
  ({
    startNightSleep,
    setLanguagesTC,
    endNightSleep,
    setNightTimeTC,
    getNightTimeTC,
    languages,
    activeLanguage,
    setActiveLanguageTC,
    theme,
    enableAdds,
  }) => {
    const navigation = useNavigation();

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        getNightTimeTC('start');
        getNightTimeTC('end');
        setLanguagesTC();
      });
      return unsubscribe;
    }, [navigation, startNightSleep, endNightSleep, languages, activeLanguage]);

    return (
      <SettingsGeneralScreen
        languages={languages}
        activeLanguage={activeLanguage}
        startNightSleep={startNightSleep}
        endNightSleep={endNightSleep}
        setNightTimeTC={setNightTimeTC}
        setActiveLanguageTC={setActiveLanguageTC}
        theme={theme}
        enableAdds={enableAdds}
      />
    );
  }
);
