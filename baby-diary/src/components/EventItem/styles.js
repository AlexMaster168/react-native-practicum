import { StyleSheet } from "react-native";
import { main, accent } from "../../core/colors";

export const styles = StyleSheet.create({
  statisticsText: {
    textTransform: "uppercase",
    marginLeft: 15,
    marginVertical: 7,
    fontWeight: "bold",
  },
  changeStyleBtnContainer: {
    flexDirection: "row",
    position: "absolute",
    right: 15,
  },
  main: {
    paddingHorizontal: 5,
    flex: 1,
    flexDirection: "column",
  },
  headerText: {
    fontSize: 24,
    marginBottom: 15,
  },
  textAreaStyle: {
    borderStyle: "solid",
    borderColor: "#95a5a6",
    marginTop: 15,
    borderRadius: 8,
    padding: 10,
    paddingRight: 0,
  },
  textAreaLabel: {
    fontSize: 13,
    fontWeight: "700",
  },
  addCommentButton: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f39c12",
    borderRadius: 3,
    marginTop: 20,
  },
  headerDreamItem: {
    borderBottomColor: accent,
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  label: {
    padding: 10,
    overflow: "hidden",
    borderRadius: 5,
    marginRight: 25,
  },
  placesBlock: {
    marginVertical: 10,
  },
  places: {
    flexDirection: "row",
  },
  timeBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  text: { fontSize: 26, textAlign: "center" },
  time: {
    marginRight: 20,
    backgroundColor: "#6f7075",
    borderRadius: 8,
    width: "45%",
  },
  data: {
    fontSize: 30,
  },
  modal: {
    paddingTop: 20,
    marginTop: 20,
    flex: 0,
  },
  line: {
    opacity: 0.5,
    marginLeft: 12,
    flex: 0.95,
    height: 0.5,
  },
  eventItem: {
    padding: 10,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  itemType: {
    fontSize: 16,
    marginLeft: 5,
  },
  itemComment: {
    fontSize: 14,
    paddingRight: 10,
    flexWrap: "wrap",
  },
  actionSheetIcon: {
    width: 25,
    height: 25,
  },
  timeAndRow: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginVertical: 5,
  },
  row: {
    paddingTop: 1.4,
    backgroundColor: "gray",
    marginLeft: 5,
    flex: 4,
  },
});
