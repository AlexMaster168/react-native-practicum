import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  settingBlock: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    color: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#333",
    borderBottomWidth: 1
  },
  title: {
    color: "#fff",
    opacity: 0.7,
    padding: 4,
    paddingHorizontal: 10,
    fontSize: 12
  },
  text: {
    fontSize: 13,
    opacity: 0.9,
    color: "#fff"
  }
});
