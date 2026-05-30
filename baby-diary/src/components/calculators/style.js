import { StyleSheet } from "react-native";
import { accent } from "../../core/colors";

export const styles = StyleSheet.create({
  copyBtn: {
    backgroundColor: accent,
    marginTop: 20,
    borderRadius: 4
  },

  button: {
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    padding: 2,
    borderRadius: 5,
    backgroundColor: accent
  },
  text: { color: "#fff", textAlign: "left", padding: 10 },
  hint: {
    fontSize: 13,
    color: "#888888",
    marginTop: 5
  },
  backupContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    alignItems: "center"
  }
});
