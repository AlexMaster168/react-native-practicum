import { StyleSheet } from "react-native";
import { accent, main } from "../../core/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F0F8",
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    color: main,
  },
  timeItem: {
    marginHorizontal: 0,
    alignItems: "center",
  },
  times: {
    flexDirection: "column",
    marginTop: 5,
  },
  placesBlock: {},
  places: {},
  timeOfDayLabel: {
    textAlign: "center",
    paddingVertical: 8,
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  label: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 16,
    paddingHorizontal: 10,
  },
  labelFocused: {
    backgroundColor: accent,
  },
  isDreamFinish: {
    marginTop: 5,
    // paddingRight: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionDirectory: {
    marginBottom: 5,
    paddingHorizontal: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  countFeedingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  counterFeeding: {
    flexDirection: "row",
    alignItems: "center",
  },
  tag: {
    flexDirection: "row",
  },

  counterButton: {
    padding: 3,
    borderRadius: 2,
    backgroundColor: "#fff",
  },
  counterText: {
    fontWeight: "bold",
    fontSize: 17,
    marginHorizontal: 7,
  },
  buttonText: {
    color: main,
    marginLeft: 10,
    fontWeight: "bold",
    // textTransform: "uppercase",
    fontSize: 14,
  },

  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff0045",
    padding: 5,
    marginVertical: 10,
    borderRadius: 5,
  },

  errorText: {
    color: "#fff",
  },

  errorImage: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 3,
  },
  modalWindoow: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  errorContainerText: {
    marginLeft: 8,
    width: "80%",
  },
  eventItem: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    marginBottom: 20,
    borderRadius: 4,
    fontSize: 16,
    borderColor: accent,
    borderWidth: 2,
  },
  itemType: {
    fontSize: 16,
  },
  itemData: {
    fontSize: 16,
  },
  itemComment: {
    fontSize: 16,
  },
});
