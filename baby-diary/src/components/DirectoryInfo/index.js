import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image, Dimensions } from "react-native";
import { styles } from "./styles";
import { deleteInfo } from "../../redux/reducers/directoryReducer";
import { useDispatch } from "react-redux";
import Modal from "react-native-modal";
import { CreateInfoForm } from "../index";

const deviceWidth = Dimensions.get("window").width;

const _renderEditButton = ({ type, visible, setVisible, id, value }) => {
  console.log("render EDIT BUTTON", type, value, id);
  return (
    <View style={{ marginHorizontal: 20 }}>
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <Image
          style={styles.infoIcon}
          source={require("../../images/icons/ic_edit.png")}
        ></Image>
      </TouchableOpacity>
      {visible && (
        <Modal
          isVisible={visible}
          onBackButtonPress={() => setVisible(false)}
          onBackdropPress={() => setVisible(false)}
          hideModalContentWhileAnimating
          backdropOpacity={0.4}
          style={styles.modalContainer}
        >
          <View style={{ ...styles.modalContent, width: deviceWidth - 40 }}>
            <CreateInfoForm
              infoValue={value}
              visible={visible}
              editMode
              id={id}
              type={type}
              setVisible={setVisible}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

const DirectoryInfo = ({ type, value, id, theme }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const _handleDeleteInfo = () => {
    dispatch(deleteInfo(type, value));
  };

  return (
    <View style={{ ...styles.infoItem, backgroundColor: theme.navigator }}>
      <Text style={{ ...styles.infoItemText, color: theme.text }}>{value}</Text>
      <View style={styles.infoItemIcons}>
        {_renderEditButton({ type, value, id, setVisible, visible })}
        <TouchableOpacity onPress={_handleDeleteInfo}>
          <Image
            style={styles.infoIcon}
            source={require("../../images/icons/ic_delete.png")}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DirectoryInfo;
