import { View, ScrollView } from "react-native";
import React from "react";
import { DiagramScreen } from "../index";
import { ChartScreen } from "../index";
import {
  AdBanner,
  SwitchMonth,
  DaysOfWeek,
  DreamStatistic,
  DreamStatisticSummary,
} from "../../components";
import {
  setMonthMaxLimitDate,
  setMonthMinLimitDate,
  setNinetyMaxLimitDate,
  setNinetyMinLimitDate,
  setTwoWeeksMaxLimitDate,
  setTwoWeeksMinLimitDate,
} from "../../utils/statisticLimits";
import DatePeriod from "../../components/DatePeriod";
import { useSelector } from "react-redux";

export const StatisticsScreen = ({
  dreams,
  weeks,
  setWeeksTC,
  statisticsDreams,
  statisticsView,
  languages,
  theme,
  activeChild,
  indicator,
}) => {
  const { value: tableMode } = useSelector(
    ({ statistics }) => statistics.tableMode
  );

  const chooseComponent = (tableMode) => {
    if (tableMode === "table") {
      return (
        <>
          <DatePeriod tableMode="table" />
          <View>
            <DaysOfWeek days={weeks} theme={theme} />
            <DreamStatistic
              tableMode={tableMode}
              languages={languages}
              statisticsDreams={statisticsDreams}
              statisticsView={statisticsView}
              dreams={dreams}
              weeks={weeks}
              theme={theme}
              birthday={activeChild.date}
              indicator={indicator}
              setWeeksTC={setWeeksTC}
            />
          </View>
        </>
      );
    }
    if (tableMode === "summary") {
      return (
        <>
          <SwitchMonth
            setWeeksTC={setWeeksTC}
            weeks={weeks}
            tableMode="summary"
            setMinDateLimit={setTwoWeeksMinLimitDate}
            setMaxDateLimit={setTwoWeeksMaxLimitDate}
            theme={theme}
          />
          <View>
            <DreamStatisticSummary
              statisticsView={statisticsView}
              dreams={dreams}
              weeks={weeks}
            />
          </View>
        </>
      );
    }
    if (tableMode === "diagram") {
      return (
        <>
          <SwitchMonth
            setWeeksTC={setWeeksTC}
            weeks={weeks}
            tableMode="diagram"
            setMinDateLimit={setTwoWeeksMinLimitDate}
            setMaxDateLimit={setTwoWeeksMaxLimitDate}
            theme={theme}
          />
          <View style={{ paddingHorizontal: 30 }}>
            <DiagramScreen languages={languages} tableMode={tableMode} />
          </View>
        </>
      );
    }
    if (tableMode === "event_diagram") {
      return (
        <>
          <SwitchMonth
            setWeeksTC={setWeeksTC}
            weeks={weeks}
            tableMode="event_diagram"
            setMinDateLimit={setTwoWeeksMinLimitDate}
            setMaxDateLimit={setTwoWeeksMaxLimitDate}
            theme={theme}
          />
          <View style={{ paddingHorizontal: 30 }}>
            <DiagramScreen languages={languages} tableMode={tableMode} />
          </View>
        </>
      );
    }
    if (tableMode === "ratio_diagram") {
      return (
        <>
          <SwitchMonth
            setWeeksTC={setWeeksTC}
            weeks={weeks}
            tableMode="ratio_diagram"
            setMinDateLimit={setNinetyMinLimitDate}
            setMaxDateLimit={setNinetyMaxLimitDate}
            theme={theme}
          />
          <View>
            <DiagramScreen languages={languages} tableMode={tableMode} />
          </View>
        </>
      );
    }
    if (tableMode === "graph") {
      return (
        <>
          <SwitchMonth
            setWeeksTC={setWeeksTC}
            weeks={weeks}
            tableMode="graph"
            setMinDateLimit={setMonthMinLimitDate}
            setMaxDateLimit={setMonthMaxLimitDate}
            theme={theme}
          />
          <View>
            <ChartScreen languages={languages} />
          </View>
        </>
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView>{chooseComponent(tableMode)}</ScrollView>
      <AdBanner />
    </View>
  );
};
export default StatisticsScreen;
