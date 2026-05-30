import { StyleSheet } from "react-native";
import { accent } from "../../core/colors";

export const styles = StyleSheet.create({
  settingStatisticItem: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
  settingStatisticItemAlter: {
    marginTop: 10,
    marginRight: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  settingStatisticsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  settingsSectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 10,
    borderColor: "#bdc3c7",
    borderStyle: "solid",
    borderBottomWidth: 1,
    paddingLeft: 10,
    color: accent || "#ffffff"
  }
});
