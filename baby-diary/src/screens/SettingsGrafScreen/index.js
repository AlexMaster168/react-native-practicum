import React from "react";
import { View, Text, Switch, ScrollView } from "react-native";
import { AdBanner } from "../../components";
import { updateChartSettings } from "../../redux/reducers/statisticsReducer";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "./style";
const settingsList = (languages) => [
  { title: languages.total_sleep },
  { title: languages.day_sleep },
  { title: languages.night_sleep },
  { title: languages.awake_time },
];
const renderSettings = (
  settingsList,
  languages,
  theme,
  dispatch,
  chartSettings
) => {
  return chartSettings.map((setting, index) => (
    <View key={index} style={{ paddingVertical: 10 }}>
      <Text style={styles.title}>{settingsList(languages)[index].title}</Text>
      <View>
        <View
          style={{
            paddingHorizontal: 5,
            flexDirection: "column",
            backgroundColor: theme.navigator,
            borderRadius: 10,
          }}
        >
          <View style={{ ...styles.settingBlock }}>
            <Text style={{ ...styles.text, color: theme.text }}>
              {languages.on}{" "}
            </Text>
            <Switch
              value={setting.chart}
              onValueChange={() =>
                dispatch(
                  updateChartSettings(
                    chartSettings,
                    setting.nameOfChart,
                    !setting.chart,
                    "chart"
                  )
                )
              }
            />
          </View>
          <View style={{ ...styles.settingBlock }}>
            <Text style={{ ...styles.text, color: theme.text }}>
              {languages.last_period}{" "}
            </Text>
            <Switch
              onValueChange={() =>
                dispatch(
                  updateChartSettings(
                    chartSettings,
                    setting.nameOfChart,
                    !setting.chartPrev,
                    "chartPrev"
                  )
                )
              }
              value={setting.chartPrev}
            />
          </View>
          <View
            style={{
              ...styles.settingBlock,
              borderBottomWidth: 0,
            }}
          >
            <Text style={{ ...styles.text, color: theme.text }}>
              {languages.labels_on_the_chart}{" "}
            </Text>
            <Switch
              onValueChange={() =>
                dispatch(
                  updateChartSettings(
                    chartSettings,
                    setting.nameOfChart,
                    !setting.label,
                    "label"
                  )
                )
              }
              value={setting.label}
            />
          </View>
        </View>
      </View>
    </View>
  ));
};

const SettingGrafScreen = () => {
  const dispatch = useDispatch();
  const theme = useSelector(({ app }) => app.activeTheme);
  const languages = useSelector(({ app }) => app.languages);
  const chartSettings = useSelector(
    ({ statistics }) => statistics.chartSettings
  );

  return (
    <React.Fragment>
      <View
        style={{
          ...styles.wrapper,
          backgroundColor: theme.background,
        }}
      >
        <ScrollView style={{ width: "95%" }}>
          <View>
            {renderSettings(
              settingsList,
              languages,
              theme,
              dispatch,
              chartSettings
            )}
          </View>
        </ScrollView>
      </View>
      <AdBanner />
    </React.Fragment>
  );
};
export default SettingGrafScreen;
