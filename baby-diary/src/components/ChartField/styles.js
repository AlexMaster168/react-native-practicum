import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  title: {
    opacity: 0.7,
    fontSize: 13,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 5,
  },
  chartContainer: {},
  chartDescriptionContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  chartDescriptionItem: {
    borderRadius: 10,
    padding: 5,
    width: "24%",
    height: 75,
    flexDirection: "row",
  },
  chartDescriptionLine: {
    marginTop: 10,
    marginLeft: 3,
    width: 20,
    height: 3,
    flexDirection: "column",
    justifyContent: "center",
  },
});
