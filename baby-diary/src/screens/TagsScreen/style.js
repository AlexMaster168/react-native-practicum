import { StyleSheet } from "react-native";
import { main, accent } from "../../core/colors";

export const styles = StyleSheet.create({
  img_plus: {
    borderRadius: 5,
    backgroundColor: "#ebcc34",
    width: 32,
    height: 32,
    tintColor: accent
  },
  settingStatisticItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    marginBottom: 10,

    borderStyle: "solid",
    paddingHorizontal: 15
  },
  setting: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderRadius: 10,
    marginBottom: 5,
    borderColor: "#E1E1E1",
    borderStyle: "solid",

    backgroundColor: "#fff"
  },
  settingsDescription: {
    textAlign: "left",
    fontSize: 11,
    marginVertical: 20,
    color: "#95a5a6",
    marginLeft: 15
  },
  settingStatisticsContainer: {
    padding: 10,
    paddingVertical: 20
  },
  settingsSectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: main,
    marginLeft: 15
  },
  settingsTimePicker: {
    fontWeight: "bold",
    color: "#E1E1E1"
  },
  settingsNightTime: {
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: "white"
  },
  separator: {
    backgroundColor: "rgb(200, 199, 204)",
    height: StyleSheet.hairlineWidth
  },
  fromText: {
    fontWeight: "bold",
    backgroundColor: "transparent"
  },
  messageText: {
    color: "#999",
    backgroundColor: "transparent"
  },
  dateText: {
    backgroundColor: "transparent",
    position: "absolute",
    right: 20,
    top: 10,
    color: "#999",
    fontWeight: "bold"
  },
  actionSheetIcon: {
    width: 25,
    height: 25
  }
});
