import { StyleSheet } from "react-native";
import { main, accent } from "../../core/colors";
export const styles = StyleSheet.create({
  statisticsOnce: {
    maxHeight: 200,
    backgroundColor: "#fff",
  },
  statisticsOnceText: {
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderStyle: "solid",
    borderColor: "#F5F5F5",
  },
  statisticsOnceContainer: {
    paddingVertical: 3,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  statisticsOnceItem: {
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 5,
  },
  statisticsOnceItemAlternative: {
    width: "48%",
    // margin: 5,
    marginRight: 5,
    marginLeft: 5,
    height: 90,
    // paddingHorizontal: 5,
    borderRadius: 5,
  },
  timesContainer: {
    borderRadius: 3,
    padding: 3,
    alignSelf: "flex-start",
  },
  bottomSheetIdText: {
    alignItems: "center",
    marginTop: 5,
  },
  bottomSheetUpperContainer: {
    padding: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  bottomSheetBottomContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
  recommendedContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  recommendedTitle: {
    alignItems: "center",
    marginTop: 20,
  },
  leftLine: {
    backgroundColor: "red",
    padding: 10,
    paddingRight: "5%",
    paddingLeft: "5%",
    marginRight: 3,
    borderBottomLeftRadius: 3,
    borderTopLeftRadius: 3,
  },
  middle: {
    backgroundColor: "green",
    padding: 10,
    paddingRight: "20%",
    paddingLeft: "20%",
  },
  rightLine: {
    backgroundColor: "yellow",
    padding: 10,
    paddingRight: "5%",
    paddingLeft: "5%",
    marginLeft: 3,
    borderBottomRightRadius: 3,
    borderTopRightRadius: 3,
  },
});
