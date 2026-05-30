import { Text, View, Dimensions } from 'react-native';
import React from 'react';
import { CoordinateColumn } from '../index';
import { styles } from './styles';
import moment from 'moment';
import { useSelector } from 'react-redux';

const deviceWidth = Dimensions.get('window').width;

//Функция для получения снов по дню, для отрисовки в конкретной колонке
const _getDreamsByDay = (dreams, day, index, prevDayDreams) => {
  // prevDayDreams - сны дня перед искомым интервалом, для получения ночных снов предыдущего дня
  const filteredDreams = [];

  dreams.forEach((dream) => {
    filteredDreams.push(
      ...dream.dream.filter((dream) => {
        const dreamStartDate = moment(dream.startDate).format('DD MMM');
        const dreamEndDate = moment(dream.endDate).format('DD MMM');
        const weekDay = moment(day).format('DD MMM');
        return (
          (weekDay === dreamStartDate || weekDay === dreamEndDate) &&
          !dream.started
        );
      })
    );
  });

  if (index === 0) {
    filteredDreams.push(
      ...prevDayDreams.filter(
        (prevDayDream) =>
          prevDayDream.timeOfDay === 'night' &&
          moment(prevDayDream.endDate).format('DD MMM') ===
            moment(day).format('DD MMM')
      )
    );
  }
  return filteredDreams; // сны для колонки
};

const Coordinate = ({
  dreams,
  weeks,
  offset,
  languages,
  hourOffset,
  tableMode,
}) => {
  const startNightSleep = useSelector(({ app }) => app.startNightSleep);
  const endNightSleep = useSelector(({ app }) => app.endNightSleep);
  const theme = useSelector(({ app }) => app.activeTheme);
  const diagramPrevDreams = useSelector(
    ({ statistics }) => statistics.diagramPrevDreams
  );

  return (
    <View
      style={
        tableMode === 'ratio_diagram'
          ? styles.ratioColumnsContainer
          : styles.columnsContainer
      }
    >
      {weeks.map((day, index) => (
        <CoordinateColumn
          key={index}
          languages={languages}
          columnIndex={index}
          tableMode={tableMode}
          offset={offset}
          hourOffset={hourOffset}
          daysLength={weeks.length}
          dreams={_getDreamsByDay(dreams, day, index, diagramPrevDreams)}
          day={day}
          startNightSleep={startNightSleep}
          endNightSleep={endNightSleep}
        />
      ))}
      {tableMode === 'ratio_diagram' ? (
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            width: deviceWidth,
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              color: theme.text,
              marginLeft: 16,
              opacity: 0.5,
            }}
          >
            {languages.date}
          </Text>
          <Text
            style={{
              color: theme.text,
              opacity: 0.5,

              marginLeft: 16,
            }}
          >
            {languages.dream_ratio}
          </Text>
          <Text
            style={{
              color: theme.text,
              opacity: 0.5,

              marginHorizontal: 6,
            }}
          >
            {languages.calculator_types[2]}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default Coordinate;
