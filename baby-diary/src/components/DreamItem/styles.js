import { StyleSheet } from "react-native";
import { main, accent } from "../../core/colors";

export const styles = StyleSheet.create({
  textTime: {
    fontWeight: "bold",
    opacity: 0.6,
    fontSize: 14,
    paddingHorizontal: 6,
  },
  dream: {
    padding: 6,
    borderRadius: 20,
    marginVertical: 7,
    //paddingBottom: -10,
  },
  line: {
    marginLeft: 12,
    flex: 1,
    opacity: 0.5,
    height: 0.5,
    backgroundColor: "#ebebeb",
  },
  timeBlock: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    borderStyle: "solid",
    paddingRight: 10,
    borderColor: "#E1E1E1",
  },
  distanceBlock: { marginBottom: 5 },
  distanceText: {
    textAlign: "left",
    fontSize: 14,
  },
  placeBlock: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 12,
  },

  commentBlock: {
    marginLeft: 2,
    width: "90%",
    marginTop: 5,
  },
  eventBlock: {
    width: "90%",
    marginTop: 15,
    marginBottom: 15,
    height: 50,
    backgroundColor: "#D7D7D7",
    borderRadius: 3,
  },
  eventBlockText: {
    color: "black",
  },

  commentBlockText: {
    fontSize: 11,
    opacity: 0.7,
    fontStyle: "italic",
    color: "#919191",
  },

  timeIcon: {
    width: 35,
    height: 35,
    marginVertical: 5,
  },
  wakefulnessBlock: {
    paddingVertical: 3,
  },
  wakefulnessText: { textAlign: "right", marginVertical: 5, marginLeft: 10 },
  wakefulnessValue: {
    fontWeight: "bold",
  },
  eventItem: {
    flexDirection: "row",
    backgroundColor: "#434473",
    marginBottom: 20,
    marginTop: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
    fontSize: 16,
    borderColor: accent,
    borderWidth: 1,
  },
  itemType: {
    fontSize: 16,
    marginLeft: "auto",
  },
  itemData: {
    fontSize: 16,
  },
  itemComment: {
    fontSize: 16,
  },
  actionSheetIcon: {
    width: 25,
    height: 25,
  },
});
