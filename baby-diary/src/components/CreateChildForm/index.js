import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button } from "../index";
import { createChildren, editChild } from "../../redux/reducers/childReducer";
import { styles } from "./styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const genders = (languages) => [
  { title: `${languages.gender_female}`, value: "female" },
  { title: `${languages.gender_male}`, value: "male" },
];

const CreateChildForm = ({ setLaunchTC, goToBack, child }) => {
  const [labelVisible, setLabelVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const languages = useSelector(({ app }) => app.languages);
  const activeLanguage = useSelector(({ app }) => app.activeLanguage);
  const theme = useSelector(({ app }) => app.activeTheme);
  const activeChild = useSelector(({ child }) => child.activeChild);
  const children = useSelector(({ child }) => child.children);
  const [placeholder, setPlaceholder] = useState(languages.name_child);

  const [name, setName] = useState((child && child.name) || "");
  const [date, setDate] = useState(
    (child && new Date(child && child.date)) || new Date()
  );
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [activeGender, setGender] = useState(
    (child && child.gender) || genders(languages)[0].value
  );

  const _handleGenderChange = (gender) => setGender(gender);

  const _handleDateChange = (date) => {
    setShow(false);
    setDate(date);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const DATE = moment(date).locale(activeLanguage).format("D MMMM YYYY");

  const _handleInputFocused = () => {
    setLabelVisible(true);
    setPlaceholder("");
    setIsFocus(true);
  };
  // create a child
  const _handleCreate = () => {
    if (name.trim() === "") {
      alert(languages.empty_child_name_error);
      return;
    }
    if (!child) {
      const payload = {
        name: name,
        gender: activeGender,
        date: date,
      };
      dispatch(createChildren(payload));
    } else {
      const payload = {
        id: child.id,
        name: name.trim(),
        gender: activeGender,
        date: date,
      };

      dispatch(editChild(payload, activeChild));
    }
    if (children?.length) {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <View>
        <View style={{ ...styles.formChild, backgroundColor: theme.navigator }}>
          {/* <View style={styles.headerGender}>
            <Text style={{ ...styles.headerGenderText }}>
              {languages[`gender_${activeGender}`]}
            </Text>
          </View> */}
          <View
            style={[
              styles.inputContainer,
              isFocus && styles.inputContainerFocused,
            ]}
          >
            <Text
              style={[
                styles.formInputText,
                !labelVisible && { display: "none" },
              ]}
            >
              {languages.name}
            </Text>
            <TextInput
              blurOnSubmit
              onFocus={_handleInputFocused}
              style={styles.formInput}
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
              placeholder={placeholder}
              placeholderTextColor="#7c708c"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.formInputText}>{languages.birthday}</Text>
            <TouchableOpacity
              style={styles.datePickerShow}
              onPress={showDatepicker}
            >
              <Text style={styles.datePickerShowText}>{DATE}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={show}
              date={date}
              mode={mode}
              onConfirm={_handleDateChange}
              onCancel={() => setShow(false)}
              maximumDate={new Date()}
            />
          </View>
          {/* <View style={styles.gendersContainer}>
            {genders(languages).map((gender, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.genderButton,
                  gender.value === activeGender && styles.genderButtonActive,
                ]}
                onPress={() => _handleGenderChange(gender.value)}
              >
                <Text
                  style={
                    gender.value !== activeGender
                      ? { color: "#fff" }
                      : { color: "#000" }
                  }
                >
                  {gender.value === "male" ? (
                    <Image
                      source={require("../../images/icons/ic_boy.png")}
                      style={{
                        ...styles.genderIcon,
                        ...(gender.value !== activeGender
                          ? styles.genderFocus
                          : styles.genderUnFocus),
                      }}
                    />
                  ) : (
                    <Image
                      source={require("../../images/icons/ic_girl.png")}
                      style={{
                        ...styles.genderIcon,
                        ...(gender.value !== activeGender
                          ? styles.genderFocus
                          : styles.genderUnFocus),
                      }}
                    />
                  )}
                  {gender.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View> */}
        </View>
        <View style={{ ...styles.btnCreate, marginTop: "5%" }}>
          <Button
            pressHandler={_handleCreate}
            buttonText={(child && languages.save) || languages.create}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateChildForm;
