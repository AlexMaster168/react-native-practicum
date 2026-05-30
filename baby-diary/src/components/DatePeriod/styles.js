import { StyleSheet } from "react-native";
import { main, accent } from "../../core/colors";

export const styles = StyleSheet.create({
  date: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  textDay: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  textDate: {
    borderRadius: 10,
    paddingHorizontal: "30%",
    backgroundColor: main,
    alignItems: "center",
  },
  arrowIcon: {
    width: 24,
    height: 24,
  },
  iconCalendar: {
    width: 24,
    height: 24,
    marginRight: 30,
  },
  buttonsRight: {
    justifyContent: "center",
    flexDirection: "row",
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: accent,
  },
});
