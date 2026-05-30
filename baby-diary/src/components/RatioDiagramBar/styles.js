import { StyleSheet } from "react-native";
import { main } from "../../core/colors";

export const styles = StyleSheet.create({
  ratioColumn: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 12,
    color: main,
  },
  sumText: {
    fontWeight: "bold",
  },
  noData: {
    textAlign: "center",
    position: "relative",
    marginTop: 10,
    left: 50,
    transform: [
      {
        translateX: -50,
      },
    ],
  },
  modalContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 0,
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
  },
});
