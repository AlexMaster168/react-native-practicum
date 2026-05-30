import React, { useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  calcAverage,
  calcTotalSleep,
  calcWakefulness,
  calcMedianaTotalSleep,
  calcMedianaTotalSleepDay,
  calcMedianaTotalSleepNight,
  calcMedianaAverageSleep,
  calcMedianaAvarageSleepDay,
  calcMedianaAvarageSleepNight,
  calcMedianaWakefulness,
} from "../../utils/calcStatistics";

import { styles } from "./styles";
import { useSelector } from "react-redux";
import { isNaN, sortBy } from "lodash";
import { CartesianChart, StackedBar } from "victory-native";
import { useFont } from "@shopify/react-native-skia";

import { accent } from "../../core/colors";

const fontFile = require("../../../assets/fonts/PTSans-Regular.ttf");

// Цвет основного (заполненного) сегмента столбца — раньше был Math.random()
// на каждый рендер, из-за чего цвет мерцал. Зафиксирован.
const BAR_FILL = "#765F89";

const _renderStatisticsSection = ({
  statisticsView,
  value,
  index,
  theme,
  title,
  mediana,
  languages,
  data,
  font,
}) => {
  const isDisable = !!statisticsView?.find(
    (setting) => setting.value === value
  );

  // Единый набор данных для StackedBar: value (сон) + rest (остаток до 24ч, фон)
  const chartData = data.map((arr, i) => {
    const hasValue = isNaN(arr.earnings) !== true && arr.earnings !== "";
    const earnings = hasValue ? arr.earnings : 0;
    return {
      x: i,
      label: arr.quarter,
      value: earnings,
      rest: hasValue ? Math.max(0, 24 - earnings) : 0,
    };
  });

  return !isDisable ? (
    <View key={index} style={styles.dreamsStatisticsTotal}>
      <Text
        style={{
          ...styles.dreamsStatisticsText,
          color: theme.text,
          fontWeight: "normal",
          marginTop: 20,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          backgroundColor: theme.navigator,
          borderRadius: 10,
        }}
      >
        <View style={{ alignItems: "center", height: 250, width: "100%" }}>
          <CartesianChart
            data={chartData}
            xKey="x"
            yKeys={["value", "rest"]}
            domain={{ y: [0, 24] }}
            padding={{ top: 10, left: 10, right: 10, bottom: 20 }}
            domainPadding={{ left: 25, right: 25, top: 10 }}
            xAxis={{
              font,
              labelColor: theme.text,
              lineColor: theme.text ? `${theme.text}33` : "#cccccc",
              formatXLabel: (v) => `${chartData[Math.round(v)]?.label ?? ""}`,
            }}
            yAxis={[
              {
                font,
                tickCount: 5,
                labelColor: theme.text,
                lineColor: theme.text ? `${theme.text}22` : "#e0e0e0",
                formatYLabel: (v) => `${Math.round(v)}`,
              },
            ]}
          >
            {({ points, chartBounds }) => (
              <StackedBar
                chartBounds={chartBounds}
                points={[points.value, points.rest]}
                colors={[BAR_FILL, `${accent}33`]}
                innerPadding={0.3}
                animate={{ type: "timing", duration: 400 }}
                barOptions={({ isTop }) => ({
                  roundedCorners: isTop
                    ? { topLeft: 8, topRight: 8 }
                    : undefined,
                })}
              />
            )}
          </CartesianChart>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              ...styles.dreamsStatisticsText,
              color: theme.text,
              fontWeight: "normal",
            }}
          >
            {languages.mediana}:
          </Text>
          <Text
            style={{
              overflow: "hidden",
              backgroundColor: theme.navigator,
              height: 20,
              borderRadius: 5,
              color: theme.text,
              paddingHorizontal: 10,
            }}
          >
            {mediana}
          </Text>
        </View>
      </View>
    </View>
  ) : null;
};
const statisticsSections = () => Array(7).fill({});

const DreamStatisticSummary = ({ dreams, statisticsView, weeks }) => {
  const languages = useSelector(({ app }) => app.languages);
  const theme = useSelector(({ app }) => app.activeTheme);
  const font = useFont(fontFile, 11);

  const days = useMemo(
    () =>
      weeks.map((day) => {
        return day.toString().slice(8, 10);
      }),
    [weeks]
  );
  const createData = (dreams, days) => {
    let data = dreams.map((_, index) => ({
      quarter: index.toString(),
      earnings: 0,
      minutes: 0,
    }));

    for (let i = 0; i < data.length; i++) {
      if (!isNaN(dreams[i]?.hours)) {
        data[i].earnings = dreams[i]?.hours;
        data[i].minutes = dreams[i]?.minutes;
        data[i].quarter = days[i] || null;
      }
    }
    return data;
  };
  const arrData = useMemo(() => {
    return [
      createData(
        sortBy(
          dreams.map((dream) => {
            return calcTotalSleep(dream.dream);
          })
        ).filter((i) => i !== 0),
        days
      ),
      createData(
        dreams
          .map((dream) => {
            return dream.dream.filter((dream) => dream.timeOfDay === "day");
          })
          .filter((arr) => arr !== undefined)
          .map((dream) => {
            return calcTotalSleep(dream);
          }),
        days
      ),
      createData(
        dreams
          .map((dream) => {
            return dream.dream.filter((dream) => dream.timeOfDay === "night");
          })
          .filter((arr) => arr !== undefined)
          .map((dream) => {
            return calcTotalSleep(dream);
          }),
        days
      ),
      createData(
        sortBy(
          dreams
            .map((dream) => {
              return dream.dream;
            })
            .map((dream) => {
              return calcAverage(calcTotalSleep(dream), dream.length);
            })
        ),
        days
      ),
      createData(
        dreams
          .map((dream) => {
            return dream.dream.filter((dream) => dream.timeOfDay === "day");
          })
          .map((dream) => {
            return calcAverage(calcTotalSleep(dream), dream.length);
          }),
        days
      ),
      createData(
        dreams
          .map((dream) => {
            return dream.dream.filter((dream) => dream.timeOfDay === "night");
          })
          .map((dream) => {
            return calcAverage(calcTotalSleep(dream), dream.length);
          }),
        days
      ),
      createData(
        sortBy(
          dreams.map((dream) => {
            return calcWakefulness(dream.dream);
          })
        ),
        days
      ),
    ];
  }, [dreams]);

  const arrMedians = [
    { value: languages.total_sleep, madians: calcMedianaTotalSleep(dreams) },
    {
      value: languages.total_day_sleep,
      madians: calcMedianaTotalSleepDay(dreams),
    },
    {
      value: languages.total_night_sleep,
      madians: calcMedianaTotalSleepNight(dreams),
    },
    {
      value: languages.average_sleep,
      madians: calcMedianaAverageSleep(dreams),
    },
    {
      value: languages.average_day_sleep,
      madians: calcMedianaAvarageSleepDay(dreams),
    },
    {
      value: languages.average_night_sleep,
      madians: calcMedianaAvarageSleepNight(dreams),
    },
    {
      value: languages.total_wakefulness,
      madians: calcMedianaWakefulness(dreams),
    },
  ];
  return (
    <React.Fragment>
      <View>
        <ScrollView style={styles.dreamsStatisticsContainer}>
          <View>
            {statisticsSections().map((_, index) =>
              _renderStatisticsSection({
                languages,
                statisticsView,
                index,
                theme,
                title: arrMedians[index].value,
                mediana: arrMedians[index].madians,
                data: arrData[index],
                font,
              })
            )}
          </View>
        </ScrollView>
      </View>
    </React.Fragment>
  );
};

export default DreamStatisticSummary;
