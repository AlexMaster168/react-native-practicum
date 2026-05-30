import React from 'react';
import { connect } from 'react-redux';
import {
  initChildren,
  changeChild,
} from '../../../redux/reducers/childReducer';
import { setLanguagesTC } from '../../../redux/reducers/appReducer';
import ChildrenScreen from '../index';

const mapStateToProps = ({ child, app }) => ({
  children: child.children || [],
  loading: child.loading,
  activeChild: child.activeChild,
  languages: app.languages,
  theme: app.activeTheme,
});

export default connect(mapStateToProps, {
  initChildren,
  changeChild,
  setLanguagesTC,
})(({ children, loading, activeChild, changeChild, languages, theme }) => {
  return (
    <ChildrenScreen
      languages={languages}
      loading={loading}
      activeChild={activeChild}
      changeChild={changeChild}
      children={children}
      theme={theme}
    />
  );
});
