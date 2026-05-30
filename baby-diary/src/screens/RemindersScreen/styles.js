import { StyleSheet } from "react-native";
import { accent } from "../../core/colors";

export const styles = StyleSheet.create({
  text: {
    textAlign: "left",
    color: "#fff",
    fontSize: 20,
  },
  img_plus: {
    borderRadius: 5,
    backgroundColor: "#ebcc34",
    width: 32,
    height: 32,
    tintColor: accent,
  },
  img_module: {
    width: 34,
    height: 34,
  },
  container_module: {
    flex: 0.5,
    marginTop: "auto",
    padding: 20,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: "#231e29",
    paddingBottom: 35,
    borderColor: accent,
    borderWidth: 1,
  },
  header_modal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
});
