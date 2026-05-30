import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  statisticsOnce: {
    maxHeight: 210,
    backgroundColor: "#fff",
  },
  statisticsOnceText: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderStyle: "solid",
    borderColor: "#F5F5F5",
  },
  statisticsOnceContainer: {
    marginTop: 5,
    paddingVertical: 3,
    paddingHorizontal: 5,
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
    margin: 5,
    height: 100,
    alignSelf: "auto",
    padding: 0,
    borderRadius: 20,
  },
  timesContainer: {
    borderRadius: 3,
    padding: 1,
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
