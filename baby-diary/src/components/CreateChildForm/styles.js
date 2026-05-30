import { StyleSheet } from "react-native";
import { main } from "../../core/colors";

export const styles = StyleSheet.create({
  createChildForm: {
    //marginVertical: 10,
  },
  formChild: {
    borderWidth: 2,
    borderColor: "#7c708c",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    padding: 15,
    marginTop: 25,
  },
  headerGender: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  headerGenderText: {
    fontSize: 18,
    textTransform: "capitalize",
    color: "#fff",
  },
  formInputText: {
    color: "#7c708c",
    marginLeft: 12,
    fontSize: 17,
    //fontWeight: "bold",
    height: 20,
  },
  inputContainerFocused: {
    borderColor: main,
  },
  formInput: {
    fontSize: 18,
    textAlign: "left",
    paddingVertical: 5,
    paddingHorizontal: 12,
  },

  btnCreate: {
    width: 125,
    marginLeft: "auto",
    marginRight: "auto",
  },
  inputContainer: {
    paddingVertical: 5,
    marginVertical: 10,
    borderColor: "#979698",
    borderBottomWidth: 2,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  gendersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10,
  },
  genderButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: main,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 3,
    width: "50%",
  },
  genderButtonActive: {
    backgroundColor: "#fff",
  },
  genderButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  genderIcon: {
    width: 20,
    height: 20,
  },
  genderFocus: {
    tintColor: "#fff",
  },
  genderUnFocus: {
    tintColor: "#000",
  },

  datePickerShow: {
    width: "100%",
    height: 20,
    margin: 10,
  },

  datePickerShowText: {
    fontSize: 18,
  },
});
