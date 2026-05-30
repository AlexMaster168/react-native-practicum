import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../screens/DirectoryScreen/styles";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { CreateInfoForm } from "../components";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { createInfo, editInfo } from "../redux/reducers/directoryReducer";
const deviceWidth = Dimensions.get("window").width;

export const renderCreateButton = (
  buttonText,
  type,
  pressHandler,
  visible,
  setVisible,
  style
) => {
  const languages = useSelector(({ app }) => app.languages);

  const dispatch = useDispatch();
  const theme = useSelector(({ app }) => app.activeTheme);

  const [value, setValue] = useState("");
  const _handleTextChanged = (value) => setValue(value);

  const _handleCreateInfo = () => {
    setVisible(false);
    const place = value.trim();
    setValue("");
    if (place.length > 0) {
      dispatch(createInfo(type, place));
    }
  };
  return (
    <View style={style}>
      <TouchableOpacity onPress={() => pressHandler()}>
        <Text
          style={{
            ...styles.buttonText,
            color: style ? style.color : theme.text,
          }}
        >
          {buttonText}
        </Text>
      </TouchableOpacity>
      <Modal
        isVisible={visible}
        onBackButtonPress={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
        onModalHide={() => setValue("")}
        hideModalContentWhileAnimating
        backdropOpacity={0.4}
        style={styles.modalContainer}
      >
        <View
          style={{
            ...styles.modalContent,
            width: deviceWidth - 40,
            backgroundColor: theme.navigator,
          }}
        >
          <Text
            style={{
              color: theme.text,
              opacity: 0.7,
              alignSelf: "flex-start",
              padding: 5,
              marginBottom: 10,
            }}
          >
            {languages.name_place}
          </Text>
          <TextInput
            style={{
              borderRadius: 5,
              ...styles.modalInput,
              backgroundColor: theme.background,
              marginBottom: 10,
              color: theme.text,
            }}
            value={value}
            onChangeText={_handleTextChanged}
          ></TextInput>
          <TouchableOpacity onPress={_handleCreateInfo}>
            <Text
              style={{
                textAlign: "center",
                color: theme.text,
                backgroundColor: theme.background,
                padding: 7,
                borderRadius: 5,
              }}
            >
              {languages.add}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
