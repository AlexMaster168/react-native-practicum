import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { changeChild } from "../../redux/reducers/childReducer";
import { setDreams } from "../../redux/reducers/mainReducer";
import { styles } from "./styles";

const ChildSelect = () => {
  const theme = useSelector(({ app }) => app.activeTheme);
  const languages = useSelector(({ app }) => app.languages);
  const activeChild = useSelector(({ child }) => child.activeChild);
  const children = useSelector(({ child }) => child.children);

  const dispatch = useDispatch();
  const [childrenModalVisible, setChildrenModalVisible] = useState(false);

  const handleActiveChild = (child) => {
    setChildrenModalVisible(false);
    dispatch(changeChild(child));
    // dispatch(setDreams([]));
  };

  return (
    <>
      <TouchableOpacity
        style={{
          ...styles.changeChildBtn,
          backgroundColor: theme.navigator,
          marginLeft: 10,
        }}
        onPress={() => setChildrenModalVisible(!childrenModalVisible)}
      >
        <Text style={{ ...styles.changeChildBtnText, color: theme.text }}>
          {activeChild && activeChild.name[0]}
        </Text>
      </TouchableOpacity>

      {childrenModalVisible && (
        <Modal
          isVisible={childrenModalVisible}
          onBackButtonPress={() => setChildrenModalVisible(false)}
          onBackdropPress={() => setChildrenModalVisible(false)}
          hideModalContentWhileAnimating
          backdropOpacity={0.4}
          style={styles.modalContainer}
        >
          <View
            style={{
              ...styles.listOfChildrenContainer,
              backgroundColor: theme.navigator,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ ...styles.headerText, color: theme.text }}>
                {languages.choose_child}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setChildrenModalVisible(false);
                }}
              >
                <Image
                  style={{ ...styles.modalIconClose }}
                  source={require("../../images/icons/ic_delete.png")}
                />
              </TouchableOpacity>
            </View>
            {children.map((child) => (
              <TouchableOpacity
                onPress={() => handleActiveChild(child)}
                style={styles.childName}
                key={child.id}
              >
                <Text style={{ ...styles.childNameText, color: theme.text }}>
                  {child.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      )}
    </>
  );
};

export default ChildSelect;
