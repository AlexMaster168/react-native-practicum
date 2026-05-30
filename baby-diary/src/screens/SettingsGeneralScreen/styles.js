import { StyleSheet } from "react-native";
import { main } from "../../core/colors";

export const styles = StyleSheet.create({
  settingStatisticItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // borderRadius: 10,
    borderStyle: "solid",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  setting: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderRadius: 10,
    marginBottom: 5,
    borderColor: "#E1E1E1",
    borderStyle: "solid",

    backgroundColor: "#fff",
  },
  settingsDescription: {
    textAlign: "left",
    fontSize: 11,
    marginTop: 15,
    marginBottom: 35,
    color: "#95a5a6",
    marginLeft: 15,
  },
  settingStatisticsContainer: {
    padding: 10,
    paddingVertical: 20,
  },
  settingsSectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: main,
    marginLeft: 15,
  },
  settingsTimePicker: {
    fontWeight: "bold",
    color: "#E1E1E1",
  },
  settingsNightTime: {
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionSheetIcon: {
    width: 25,
    height: 25,
  },
});
