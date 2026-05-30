import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";

const TimePicker = ({ navigation: { goBack } }) => {
  const { params } = useRoute();
  const { type, updateDreamTime } = params;
  const { navigate } = useNavigation();

  const hideDatePicker = (newDate) => {
    console.log("time comfirm updateDreamTime", type, newDate);
    updateDreamTime(type, moment(newDate).format("HH:mm"));
    goBack();
  };
  const handleConfirm = (date) => {
    const newDate = moment(date);
    hideDatePicker(newDate);
  };

  return (
    <View style={{ marginTop: 30 }}>
      <DateTimePickerModal
        date={new Date()}
        isVisible={true}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={() => navigate("Home")}
        is24Hour={true}
      />
    </View>
  );
};

export default TimePicker;
