import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import { ChartSwitchSettings } from '../../components';
import { ChartField } from '../../components';
import { styles } from './styles';
import moment from 'moment';
import { setPrevWeekTC } from '../../redux/reducers/statisticsReducer';
import { eachDayOfInterval } from 'date-fns';
import { useDispatch } from 'react-redux';

const Chart = ({
  dreams,
  weeks,
  languages,
  chartSettings,
  setChartSettings,
  theme,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const deviceWidth = Dimensions.get('window').width * 1.1;
  const deviceHeight = Dimensions.get('window').height * 0.5;

  const dispatch = useDispatch();

  useEffect(() => {
    const prevEnd = weeks[0];
    const diff = moment(weeks[weeks.length - 1]).diff(prevEnd);
    console.log(diff, 'diff');
    dispatch(
      setPrevWeekTC(
        eachDayOfInterval({
          start: new Date(moment(prevEnd).diff(diff)),
          end: prevEnd,
        })
      )
    );
  }, [weeks]);

  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.settingButton}
      ></TouchableOpacity>
      <ChartField
        theme={theme}
        dreams={dreams}
        weeks={weeks}
        languages={languages}
        chartSettings={chartSettings}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
      />
      {modalVisible && (
        <ChartSwitchSettings
          languages={languages}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          chartSettings={chartSettings}
          setChartSettings={setChartSettings}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}
        />
      )}
    </React.Fragment>
  );
};

export default Chart;
