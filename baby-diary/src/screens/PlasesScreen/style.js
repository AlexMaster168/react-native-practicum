import { StyleSheet } from "react-native";
import { main, accent } from "../../core/colors";

export const styles = StyleSheet.create({
  img_plus: {
    borderRadius: 5,
    backgroundColor: "#ebcc34",
    width: 32,
    height: 32,
    tintColor: accent,
  },
  settingStatisticItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    marginBottom: 10,
    borderStyle: "solid",
    paddingHorizontal: 15,
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
    marginVertical: 5,
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
  directoryContainer: {
    backgroundColor: "#F4F0F8",
    paddingTop: 20,
    flex: 1,
  },
  formHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  createInfoButton: {
    marginHorizontal: 10,
  },
  modalContent: {
    alignSelf: "center",
    marginVertical: "50%",

    borderRadius: 3,
    borderColor: accent || "#fff",
    borderWidth: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  modalContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  buttonText: {
    color: main,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  inputStyle: {
    paddingHorizontal: 3,
    paddingVertical: 10,
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderColor: "#1994B1",
    borderRadius: 3,
    marginBottom: 10,
  },
  topLine: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  modalInput: {
    paddingHorizontal: 5,
  },
});
