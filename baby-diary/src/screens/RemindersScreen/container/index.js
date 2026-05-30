import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setLanguagesTC } from '../../../redux/reducers/appReducer';
import RemindersScreen from '../index';

const mapStateToProps = ({ app, directory }) => ({
  languages: app.languages,
  theme: app.activeTheme,
  reminders: directory.reminders,
});
export default connect(mapStateToProps, { setLanguagesTC })(
  ({ languages, theme, reminders }) => {
    const navigation = useNavigation();

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {});
      return unsubscribe;
    }, []);
    return (
      <RemindersScreen
        languages={languages}
        theme={theme}
        reminders={reminders}
      />
    );
  }
);
