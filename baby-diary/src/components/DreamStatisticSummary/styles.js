import { StyleSheet } from "react-native";
import { accent } from "../../core/colors";

export const styles = StyleSheet.create({
  dreamsStatisticsContainer: {
    paddingVertical: 20,
  },
  dreamsStatisticsTotal: {
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  victoryAxis: {
    axis: { stroke: "none", padding: 0 },
    ticks: { stroke: "none", size: 0, padding: 0 },
    tickLabels: {
      fontSize: 15,
      padding: 0,
    },
    grid: { stroke: "none", padding: 0 },
  },
  dreamsStatisticsText: {
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 5,
    textTransform: "uppercase",
  },
  dreamsStatistics: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#2E2E2E",
    justifyContent: "space-around",
  },
});
