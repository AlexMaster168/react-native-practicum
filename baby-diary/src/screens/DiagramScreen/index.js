import React from 'react';
import { View, Dimensions } from 'react-native';
import { Coordinate } from '../../components';
import { styles } from './styles';

const _getTimeLine = (length) => {
  let count = 0;
  let array = new Array(length);
  for (let i = 0; i < length; i++) {
    array[i] = count < 10 ? `0${count}` : `${count}`;
    count += 1;
  }
  return array;
};

const _calcMinutesOffset = (height) => {
  return height / 1440;
};
const _calcHourOffset = (height) => {
  return height / 24;
};

const Diagram = ({ dreams, weeks, languages, tableMode }) => {
  const { width, height } = Dimensions.get('window');
  // Функция для подчсета единичного отрезка, по формуле height / 1440 (минут в сутках)
  let offset;
  let hourOffset;
  if (tableMode === languages.ratio_diagram) {
    offset = _calcMinutesOffset(width * 0.8);
    hourOffset = _calcHourOffset(height * 0.8);
  } else {
    offset = _calcMinutesOffset(height * 0.5);
    hourOffset = _calcHourOffset(height * 0.5);
  }

  return (
    <React.Fragment>
      {tableMode === 'ratio_diagram' ? (
        <View style={styles.ratioDiagram}>
          <Coordinate
            languages={languages}
            offset={offset}
            tableMode={tableMode}
            weeks={weeks}
            dreams={dreams}
            hourOffset={hourOffset}
          />
        </View>
      ) : (
        <View style={{ ...styles.diagram }}>
          {/*<TimeLine offset={offset} timeLine={timeLine} hourOffset={hourOffset}/>*/}
          <Coordinate
            languages={languages}
            offset={offset}
            tableMode={tableMode}
            weeks={weeks}
            dreams={dreams}
            hourOffset={hourOffset}
          />
          {/*<TimeLine offset={offset} timeLine={timeLine} hourOffset={hourOffset}/>*/}
        </View>
      )}
    </React.Fragment>
  );
};

export default Diagram;
