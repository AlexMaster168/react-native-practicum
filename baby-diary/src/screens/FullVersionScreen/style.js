import { StyleSheet } from "react-native";
import { accent } from "../../core/colors";

export const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flex: 1
  },
  advantages_container: {
    height: 60,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  advantages_text: {
    color: "#fff"
  },
  text: {
    color: "#fff",
    opacity: 0.7,
    paddingVertical: 5
  },
  subscriptions_container: {
    backgroundColor: "#231e29",
    borderColor: accent,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  }
});
