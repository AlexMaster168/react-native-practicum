import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getInfo } from '../../../redux/reducers/directoryReducer';
import { setLanguagesTC } from '../../../redux/reducers/appReducer';
import { useNavigation, useRoute } from '@react-navigation/native';

import AddChild from '../index';

const mapStateToProps = ({ directory, app, child }) => ({
  children: child.children || [],

  tags: directory.tags,
  languages: app.languages,
  theme: app.activeTheme,
});

export default connect(mapStateToProps, {
  getInfo,
  setLanguagesTC,
})(({ getInfo, tags, setLanguagesTC, languages, theme }) => {
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const { goToBack } = params;

  const { child } = params;

  useEffect(() => {
    setLanguagesTC();
  }, [languages]);

  return (
    <AddChild
      navigate={navigate}
      goToBack={goToBack}
      languages={languages}
      child={child}
      theme={theme}
    />
  );
});
