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
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalIconClose: {
    width: 30,
    height: 30,
  },
  line: {
    opacity: 0.5,
    marginLeft: 12,
    flex: 0.95,
    height: 0.5,
  },
  modalView: {
    backgroundColor: "#231e29",
    marginTop: "auto",
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  textTime: {
    fontWeight: "bold",
    opacity: 0.6,
    fontSize: 14,
    paddingHorizontal: 6,
  },
  buttonBlock: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0)",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 15,
    alignItems: "center",
  },
  eventItem: {
    padding: 8,
    paddingLeft: 28,
    paddingRight: 28,
    borderRadius: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    // justifyContent: "space-between",
    fontSize: 16,
  },
  itemType: {
    opacity: 0.6,
    fontSize: 16,
    marginLeft: 15,
  },
  itemData: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemComment: {
    fontSize: 16,
    color: "gray",
  },
  addEventButton: { flex: 5 },
  actionSheetIcon: {
    width: 25,
    height: 25,
  },
  icon: {
    width: 36,
    height: 36,
    tintColor: "#fff",
    marginBottom: 5,
  },
});
