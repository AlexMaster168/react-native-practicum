import React, { useRef, useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createInfo, editInfo } from "../../redux/reducers/directoryReducer";
import { styles } from "./styles";
import RadioGroup from "react-native-radio-buttons-group";
const CreateInfoForm = ({
  type,
  setVisible,
  setEditMode,
  id,
  editMode,
  infoValue,
}) => {
  console.log("if", infoValue);
  const languages = useSelector(({ app }) => app.languages);
  const theme = useSelector(({ app }) => app.activeTheme);

  const radioButtonsData = useRef([
    {
      id: "1",
      label: languages.tag_negative,
      value: "red",
      color: "red",
      labelStyle: {
        color: theme.text,
      },
    },
    {
      id: "2",
      label: languages.tag_neutral,
      value: "orange",
      color: "orange",
      labelStyle: {
        color: theme.text,
      },
    },
    {
      id: "3",
      label: languages.tag_positive,
      value: "green",
      color: "green",
      labelStyle: {
        color: theme.text,
      },
    },
  ]);

  const [value, setValue] = useState("");
  const [color, setColor] = useState("orange");
  const dispatch = useDispatch();
  const [radioButtons, setRadioButtons] = useState(radioButtonsData.current);

  useEffect(() => {
    if (editMode) {
      setValue(infoValue.value);
      setColor(infoValue.color);
    } else {
      setValue("");
      setColor("orange");
    }
  }, [editMode, infoValue]);

  const _handleTextChanged = (value) => setValue(value);
  const _handleEditInfo = () => {
    console.warn("editing");
    dispatch(editInfo(type, value.trim(), infoValue.id, color));
    setVisible(false);
    setEditMode(false);
    setValue("");
    setColor("");
  };
  const _handleCreateInfo = () => {
    console.warn("creating");
    dispatch(createInfo(type, value, color));
    setVisible(false);
    setValue("");
  };
  const onPress = () => {
    if (value.trim().length) editMode ? _handleEditInfo() : _handleCreateInfo();
    setVisible(false);
    setEditMode(false);
    setValue("");
    setColor("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={20}
      style={{
        ...styles.modalView,
        backgroundColor: theme.navigator || "#000000",
      }}
    >
      <View style={styles.modalHeader}>
        <Text
          style={{
            ...styles.heading,
            color: theme.text,
            alignSelf: "flex-start",
            paddingHorizontal: 15,
          }}
        >
          {editMode
            ? `${languages.edit_form} ${languages.tag}`
            : languages.new_tag}
        </Text>
        <TouchableOpacity style={{ paddingHorizontal: 15 }} onPress={onPress}>
          <Text
            style={{
              ...styles.buttonText,
              color: theme.text,
              backgroundColor: theme.background,
              padding: 7,
              borderRadius: 5,
            }}
          >
            {editMode ? languages.edit_form : languages.add}
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          ...styles.heading,
          color: theme.text,
          opacity: 0.7,
          alignSelf: "flex-start",
          paddingHorizontal: 15,
        }}
      >
        {languages.name_tag}
      </Text>
      <TextInput
        value={value}
        onChangeText={_handleTextChanged}
        style={{
          ...styles.modalInput,
          backgroundColor: theme.background,
          color: theme.text,
        }}
      ></TextInput>
      <Text
        style={{
          ...styles.heading,
          color: theme.text,
          opacity: 0.7,
          alignSelf: "flex-start",
          paddingHorizontal: 15,
        }}
      >
        {languages.tag_charact}
      </Text>

      <ScrollView horizontal>
        <RadioGroup
          containerStyle={{
            ...styles.sectionDirectory,
            paddingHorizontal: 15,
            paddingVertical: 10,
            color: theme.text,
          }}
          radioButtons={radioButtons}
          onPress={(radioButtonsArray) => {
            if (
              radioButtonsArray.map((item) =>
                item.selected ? setColor(item.value) : "s"
              )
            )
              setRadioButtons(radioButtonsArray);
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateInfoForm;
