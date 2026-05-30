import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  childContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%"
  },
  childItem: { borderRadius: 10, marginBottom: 5, paddingVertical: 5 },
  childImage: {
    width: 32,
    height: 32,
    marginHorizontal: 5
  },
  childNameText: {
    fontSize: 18,
    marginRight: 10,
    color: "#fff"
  },
  childBirthdayText: {
    fontSize: 14
  },
  checkIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  checkIconContainer: {
    marginLeft: "auto"
  },
  actionSheetIcon: {
    width: 25,
    height: 25
  }
});
