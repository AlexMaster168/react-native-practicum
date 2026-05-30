import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Modal from "react-native-modal";
import ListReminder from "../ListReminder";
import { styles } from "./styles";
const deviceWidth = Dimensions.get("window").width;

export const ConfirmDelete = ({
  setConfirmDeleting,
  confirmDeleting,
  handleDelete,
  scrolled,
  reminder,
  theme,
  languages,
}) => {
  const isLong = confirmDeleting.positionY - scrolled + 65 > deviceWidth;

  return (
    <Modal
      animationIn={"slideInLeft"}
      animationOut={"slideInLeft"}
      animationInTiming={1}
      animationOutTiming={1}
      backdropOpacity={0.9}
      style={{ margin: 0 }}
      onBackButtonPress={() =>
        setConfirmDeleting({ visible: false, id: null, positionY: null })
      }
      onBackdropPress={() =>
        setConfirmDeleting({ visible: false, id: null, positionY: null })
      }
      isVisible={confirmDeleting.visible}
    >
      {isLong && (
        <TouchableOpacity
          style={{
            position: "absolute",
            alignSelf: "center",
            top: confirmDeleting.positionY - scrolled + 25,
          }}
          onPress={() => {
            setConfirmDeleting({
              visible: false,
              id: null,
              positionY: null,
            });
            handleDelete(confirmDeleting.id);
          }}
        >
          <View
            style={{
              ...styles.delete_button,
            }}
          >
            <Text style={{ color: "#871619", fontSize: 14 }}>
              {languages.delete}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      <View
        style={{
          position: "absolute",
          top: confirmDeleting.positionY - scrolled + 65,
          width: "100%",
        }}
      >
        {reminder && (
          <ListReminder
            theme={theme}
            reminder={reminder}
            languages={languages}
            onReminderDelete={handleDelete}
          />
        )}
        {!isLong && (
          <TouchableOpacity
            onPress={() => {
              setConfirmDeleting({
                visible: false,
                id: null,
                positionY: null,
              });
              handleDelete(confirmDeleting.id);
            }}
          >
            <View style={styles.delete_button}>
              <Text style={{ color: "#871619", fontSize: 14 }}>
                {languages.delete}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};
