import { StyleSheet } from "react-native";
import { main, accent } from "../../core/colors";

export const styles = StyleSheet.create({
  recommendationContainer: {
    backgroundColor: "#fff"
  },
  recommendationItem: {
    backgroundColor: main,
    padding: 5,
    marginVertical: 5,
    borderRadius: 5
  },
  recommendationTitle: {
    fontSize: 14
  },
  recommendationText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    opacity: 0.7
  },
  recommendationValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff"
  },
  text: {
    padding: 5,
    textAlign: "left",
    fontSize: 13,
    color: "#fff",
    opacity: 0.8
  },
  containers_piccker: {
    padding: 10,
    flexDirection: "column",

    justifyContent: "space-around"
  },
  container_slider: {
    marginBottom: 15,
    paddingHorizontal: 20,

    borderRadius: 10,
    backgroundColor: "#231e29"
  }
});
