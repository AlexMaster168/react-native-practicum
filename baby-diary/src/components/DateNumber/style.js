import { StyleSheet } from "react-native";
import { main, accent } from "../../core/colors";

export const styles = StyleSheet.create({
  date: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
  textDate: {
    borderRadius: 25,
    paddingHorizontal: "20%",
    alignItems: "center",
    marginVertical: 5,
    padding: 5,
  },
  textDay: {
    fontSize: 13,
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
    padding: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
});
