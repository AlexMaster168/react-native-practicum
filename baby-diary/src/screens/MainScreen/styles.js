import { StyleSheet } from "react-native";
import React from "react";
import { main, accent } from "../../core/colors";

export const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 5,
    // flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    backgroundColor: "#F4F0F8",
  },
  button: {
    backgroundColor: "#e91e63",
    marginBottom: 10,
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
  dreams: {
    marginTop: 10,
  },
  statisticsText: {
    textTransform: "uppercase",
    marginLeft: 15,
    marginVertical: 7,
    fontWeight: "bold",
  },
  yesterdayDream: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
  },
  changeChildBtn: {
    flex: 0.5,
    marginRight: 5,
    backgroundColor: main,
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    borderRadius: 10,
    height: 40,
    top: 10,
  },

  changeChildBtnText: {
    color: "#fff",
    textAlign: "center",
  },

  startOrEndSleepBtn: { flex: 5 },

  modalContainer: {
    alignItems: "center",
  },

  listOfChildrenContainer: {
    paddingHorizontal: 40,
    paddingVertical: 50,
    width: "90%",
    backgroundColor: "#fff",
  },

  childName: {
    margin: 10,
  },

  childNameText: {
    fontSize: 18,
  },

  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  changeStyleBtn: {
    marginRight: 5,
  },
  changeStyleBtnContainer: {
    flexDirection: "row",
    position: "absolute",
    right: 15,
  },
  modalWindow: {
    padding: 5,
    flex: 1,
    borderWidth: 1,
    borderColor: accent,
    borderRadius: 10,
  },
  modalItems: {
    padding: 10,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});
