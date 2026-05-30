import React from 'react';
import { View } from 'react-native';
import { DayItem } from '../index';
import { styles } from './styles';

const DaysOfWeek = ({ days, theme }) => {
  return (
    <View style={styles.days}>
      {days &&
        days.map((day, index) => {
          return <DayItem key={index} day={day} theme={theme} />;
        })}
    </View>
  );
};

export default DaysOfWeek;
