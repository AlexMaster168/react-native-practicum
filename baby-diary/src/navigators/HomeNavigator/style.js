import { StyleSheet } from "react-native";
import React from "react";
import { main, accent } from "../../core/colors";

export const styles = StyleSheet.create({
  editorText: {
    fontSize: 13,
    color: "#fff",
    marginRight: 15,
    textTransform: "uppercase",
  },
  shareImage: { width: 25, height: 25 },
  addImage: {
    width: 22,
    height: 22,
  },
  headerButtons: {
    // width: '20%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginRight: 15,
  },
  settingsText: {
    textTransform: "uppercase",
    opacity: 0.5,
    fontSize: 14,
    marginTop: 15,
  },
  modalContent: {
    borderRadius: 3,
    backgroundColor: "#fff",
    padding: 15,
  },
  modalContainer: {
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },

  listOfShareContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 3,
  },

  headerText: {
    fontSize: 25,
  },

  itemOfShare: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },

  itemOfShareText: {
    fontSize: 20,
  },

  shareButton: {
    color: "#fff",
    backgroundColor: accent,
    borderRadius: 4,
    marginVertical: 10,
  },
  changeChildBtn: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: "#29272b",
    marginLeft: 30,
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    height: 32,
    width: 32,
    fontSize: 20,
  },

  changeChildBtnText: {
    textTransform: "uppercase",
    color: "#fff",
  },
  modalContainer: {
    alignItems: "center",
  },

  listOfChildrenContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 4,
    borderColor: accent,
    borderWidth: 1,
  },
  modalIconClose: {
    width: 30,
    height: 30,
    tintColor: accent,
  },
  childName: {
    margin: 10,
  },

  childNameText: {
    fontSize: 18,
  },
});
