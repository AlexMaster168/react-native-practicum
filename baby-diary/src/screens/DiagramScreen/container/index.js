import React from 'react';
import { connect } from 'react-redux';
import {
  setWeeksTC,
  setDreamsTC,
} from '../../../redux/reducers/statisticsReducer';
import Diagram from '../index';

const mapStateToProps = ({ statistics }) => ({
  weeks: statistics.weeks,
  dreams: statistics.dreams,
  activeDate: statistics.activeDate,
  loading: statistics.loading,
});

export default connect(mapStateToProps, {
  setWeeksTC,
  setDreamsTC,
})(({ dreams, weeks, activeDate, languages, tableMode }) => {
  return (
    <Diagram
      languages={languages}
      dreams={dreams}
      weeks={weeks}
      tableMode={tableMode}
      setWeeksTC={setWeeksTC}
    />
  );
});
