import React from "react";
import { View, Text, Dimensions } from "react-native";
import { styles } from "./styles";
import { renderTime } from "../../utils/renderTime";
import { renderTotalSleepColor } from "../../utils/renderDreamColor";
import { differenceInDays } from "date-fns";
import { useSelector } from "react-redux";
const DreamTotalSleep = ({
  totalSleep,
  countDream,
  languages,
  tag,
  birthday,
  indicator,
}) => {
  const theme = useSelector(({ app }) => app.activeTheme);
  const { minutes, hours } = totalSleep;
  const amountOfDays = differenceInDays(new Date(), new Date(birthday));
  const { height } = Dimensions.get("window");
  const { width } = Dimensions.get("window");
  return (
    <View>
      <View
        style={{
          ...styles.dreamTotalSleep,
          height: height * 0.075,
          width: width * 0.13,
          backgroundColor:
            minutes || hours
              ? indicator
                ? renderTotalSleepColor(tag, amountOfDays, totalSleep, theme)
                : theme.background
              : theme.background,
        }}
      >
        {minutes || hours ? (
          <View style={{ ...styles.dreamTotalSleepFilled }}>
            {minutes || hours ? (
              renderTime(totalSleep, languages, "\n", true, theme)
            ) : (
              <Text
                style={{
                  ...styles.dreamTotalSleepFilled,
                  fontWeight: "bold",
                  color: theme.text,
                }}
              >
                {countDream}
              </Text>
            )}
          </View>
        ) : (
          <View>
            <Text style={{ color: theme.text }}>-</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default DreamTotalSleep;
