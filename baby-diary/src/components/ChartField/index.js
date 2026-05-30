import React from "react";
import { View, Text, Platform, TouchableNativeFeedback } from "react-native";
import { CartesianChart, Line } from "victory-native";
import { useFont } from "@shopify/react-native-skia";
import { renderTime } from "../../utils/renderTime";
import { styles } from "./styles";
import moment from "moment";
import {
  calcMedianaTotalSleep,
  calcMedianaTotalSleepDay,
  calcMedianaTotalSleepNight,
  calcMedianaWakefulness,
  calcTotalSleep,
  calcWakefulness,
  getDreamByType,
} from "../../utils/calcStatistics";
import { useDispatch, useSelector } from "react-redux";
import { updateChartSettings } from "../../redux/reducers/statisticsReducer";

const fontFile = require("../../../assets/fonts/PTSans-Regular.ttf");

const _renderDataTotalTime = (weeks, dreams, calcMethod, language) => {
  let methodForData;
  if (language[calcMethod] === language.total_sleep) {
    methodForData = calcTotalSleep;
  }

  if (language[calcMethod] === language.wakefulness_text) {
    methodForData = calcWakefulness;
  }

  return weeks.map((item, index) => {
    let time = methodForData(dreams[index]?.dream);
    let totalMinutes = (time.minutes + time.hours * 60) / 60;
    if (totalMinutes) {
      time = renderTime(time);
    } else {
      time = "";
      totalMinutes = "";
    }
    return { x: index + 1, y: totalMinutes, time: time };
  });
};

const _renderDataByType = (weeks, dreams, calcMethod, language) => {
  let methodForData;
  let typeOfTime;

  if (language[calcMethod] === language.day_sleep) {
    methodForData = getDreamByType;
    typeOfTime = "day";
  }
  if (language[calcMethod] === language.night_sleep) {
    methodForData = getDreamByType;
    typeOfTime = "night";
  }

  return weeks.map((item, index) => {
    let totalMinutes = methodForData(typeOfTime, dreams[index]?.dream);
    if (totalMinutes.length === 0) {
      return { x: index + 1, y: null, time: null };
    }
    totalMinutes = calcTotalSleep(totalMinutes);
    let time = renderTime(totalMinutes);
    totalMinutes = (totalMinutes.minutes + totalMinutes.hours * 60) / 60;
    return { x: index + 1, y: totalMinutes, time: time };
  });
};

export const ChartField = ({
  weeks,
  dreams,
  languages,
  chartSettings,
  theme,
  deviceWidth,
  deviceHeight,
}) => {
  const activeLanguage = useSelector(({ app }) => app.activeLanguage);
  const prevWeeks = useSelector(({ statistics }) => statistics.prevWeeks);
  const dispatch = useDispatch();
  const font = useFont(fontFile, 11);

  const xLabels = weeks.map((item) =>
    moment(item).locale(activeLanguage).format("DD.MM")
  );

  // Активные (включённые) линии графика
  const activeLines = chartSettings
    .map((setting, index) => ({ setting, index }))
    .filter(({ setting }) => setting.chart);

  // Точки по каждой активной линии (старая логика расчётов сохранена)
  const lineData = activeLines.map(({ setting }) => {
    const isTotal =
      languages[setting.nameOfChart] === languages.total_sleep ||
      languages[setting.nameOfChart] === languages.wakefulness_text;
    return isTotal
      ? _renderDataTotalTime(weeks, dreams, setting.nameOfChart, languages)
      : _renderDataByType(weeks, dreams, setting.nameOfChart, languages);
  });

  // Единый набор данных для CartesianChart: { x, y0, y1, ... }
  const chartData = weeks.map((_, i) => {
    const point = { x: i };
    activeLines.forEach((_, li) => {
      const v = lineData[li][i]?.y;
      point[`y${li}`] = typeof v === "number" && !isNaN(v) ? v : 0;
    });
    return point;
  });
  const yKeys = activeLines.map((_, li) => `y${li}`);

  const medians = [
    calcMedianaTotalSleep(dreams),
    calcMedianaTotalSleepDay(dreams),
    calcMedianaTotalSleepNight(dreams),
    calcMedianaWakefulness(dreams),
  ];
  const prevMedians = [
    calcMedianaTotalSleep(prevWeeks),
    calcMedianaTotalSleepDay(prevWeeks),
    calcMedianaTotalSleepNight(prevWeeks),
    calcMedianaWakefulness(prevWeeks),
  ];

  return (
    <View>
      <View style={{ ...styles.chartContainer, height: deviceHeight }}>
        {yKeys.length > 0 ? (
          <CartesianChart
            data={chartData}
            xKey="x"
            yKeys={yKeys}
            domainPadding={{ left: 35, right: 25, top: 30, bottom: 10 }}
            padding={{ top: 10, left: 10, right: 16, bottom: 20 }}
            xAxis={{
              font,
              tickCount: Math.min(xLabels.length, 8),
              labelColor: theme.text,
              lineColor: theme.text ? `${theme.text}33` : "#cccccc",
              labelRotate: 60,
              formatXLabel: (value) => xLabels[Math.round(value)] ?? "",
            }}
            yAxis={[
              {
                font,
                tickCount: 6,
                labelColor: theme.text,
                lineColor: theme.text ? `${theme.text}22` : "#e0e0e0",
                formatYLabel: (value) =>
                  Number.isInteger(value) ? `${value}` : "",
              },
            ]}
          >
            {({ points }) => (
              <>
                {activeLines.map(({ setting }, li) => (
                  <Line
                    key={li}
                    points={points[`y${li}`]}
                    color={setting.chartColor}
                    strokeWidth={2.5}
                    curveType="natural"
                    animate={{ type: "timing", duration: 300 }}
                  />
                ))}
              </>
            )}
          </CartesianChart>
        ) : null}
      </View>
      <View style={{ marginBottom: 20, marginTop: 20 }}>
        <Text
          style={{
            ...styles.title,
            color: theme.text,
          }}
        >
          {languages.medianaGraf} ( {moment(weeks[0]).format("DD")} -{" "}
          {moment(weeks[weeks.length - 1]).format("DD")}{" "}
          {moment(weeks[0]).locale(activeLanguage).format("MMM")})
        </Text>
        <View style={styles.chartDescriptionContainer}>
          {chartSettings.map((setting, index) => {
            return (
              <TouchableNativeFeedback
                key={index}
                background={
                  Platform.OS === "android"
                    ? TouchableNativeFeedback.SelectableBackground()
                    : ""
                }
                value={setting.chart}
                onPress={() =>
                  dispatch(
                    updateChartSettings(
                      chartSettings,
                      setting.nameOfChart,
                      !setting.chart,
                      "chart"
                    )
                  )
                }
              >
                <View
                  style={{
                    ...styles.chartDescriptionItem,
                    backgroundColor: setting.chart
                      ? setting.chartColor
                      : theme.navigator,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 11,
                        paddingTop: 5,
                        paddingLeft: 5,
                      }}
                    >
                      {languages[setting.nameOfChart]}
                    </Text>
                    <Text
                      style={{
                        color: "#fff",
                        position: "absolute",
                        bottom: 5,
                        left: 5,
                      }}
                    >
                      {medians[index]}
                    </Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
            );
          })}
        </View>
        <View style={{ marginTop: 5 }}>
          <Text style={{ marginTop: 10, ...styles.title, color: theme.text }}>
            {languages.medianaGraf} ( {moment(prevWeeks[0]?.date).format("DD")}{" "}
            - {moment(prevWeeks[prevWeeks.length - 1]?.date).format("DD")}{" "}
            {moment(weeks[0]).locale(activeLanguage).format("MMM")})
          </Text>
        </View>
        <View style={{ ...styles.chartDescriptionContainer, marginBottom: 10 }}>
          {chartSettings.map((setting, index) => {
            return (
              <TouchableNativeFeedback
                key={index}
                background={
                  Platform.OS === "android"
                    ? TouchableNativeFeedback.SelectableBackground()
                    : ""
                }
                value={setting.chart}
                onPress={() =>
                  dispatch(
                    updateChartSettings(
                      chartSettings,
                      setting.nameOfChart,
                      !setting.chartPrev,
                      "chartPrev"
                    )
                  )
                }
              >
                <View
                  style={{
                    ...styles.chartDescriptionItem,
                    backgroundColor: setting.chartPrev
                      ? setting.chartColor
                      : theme.navigator,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 11,
                        paddingTop: 5,
                        paddingLeft: 5,
                      }}
                    >
                      {languages[setting.nameOfChart]}
                    </Text>
                    <Text
                      style={{
                        color: "#fff",
                        position: "absolute",
                        bottom: 5,
                        left: 5,
                      }}
                    >
                      {prevMedians[index]}
                    </Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default ChartField;
