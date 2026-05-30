import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import {
  connectActionSheet,
  useActionSheet,
} from "@expo/react-native-action-sheet";
import { formatDistanceStrict } from "date-fns";
import { deleteChild } from "../../redux/reducers/childReducer";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import { ru, enUS } from "date-fns/locale";
import { changeChild as handleChangeChild } from "../../redux/reducers/childReducer";
import { useNavigation } from "@react-navigation/native";
import { setLaunchTC } from "../../redux/reducers/appReducer";
const _renderAge = (date, languages) => {
  return formatDistanceStrict(new Date(), new Date(date), {
    locale: languages.fns_locale === "eu" ? enUS : ru,
  });
};

const _onOpenActionSheet = ({
  showActionSheetWithOptions,
  theme,
  child,
  childrenCount,
  dispatch,
  activeChild,
  languages,
  navigate,
}) => {
  const options = [languages.edit];
  const icons = [
    <Image
      style={styles.actionSheetIcon}
      source={require("../../images/icons/ic_edit.png")}
      tintColor="#7c708c"
    />,
  ];

  if (childrenCount > 1) {
    options.push(languages.select);
    options.push(languages.delete);
    icons.push(
      <Image
        style={styles.actionSheetIcon}
        source={require("../../images/icons/ic_check.png")}
        tintColor="#7c708c"
      />
    );
    icons.push(
      <Image
        style={styles.actionSheetIcon}
        source={require("../../images/icons/ic_delete.png")}
        tintColor="#7c708c"
      />
    );
  }
  const title = child.name;
  const containerStyle = { backgroundColor: theme.navigator || "#fff" };
  const titleTextStyle = { color: theme.text, fontSize: 18 };
  const textStyle = { color: theme.text };
  options.push(languages.cancel);
  showActionSheetWithOptions(
    {
      containerStyle,
      titleTextStyle,
      textStyle,
      options,
      title,
      icons,
      child,
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          navigate("AddChild", {
            setLaunchTC,
            goToBack: true,
            child,
          });
          break;
        case 1:
          dispatch(handleChangeChild(child));
          break;
        case 2:
          dispatch(deleteChild(child.id, activeChild));
          break;
        case 3:
          break;
      }
    }
  );
};

const Child = ({
  child,
  childrenCount,
  activeChild,
  changeChild,
  languages,

  theme,
}) => {
  const { navigate } = useNavigation();
  const { showActionSheetWithOptions } = useActionSheet();

  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() =>
        _onOpenActionSheet({
          showActionSheetWithOptions,
          theme,
          child,
          childrenCount,
          dispatch,
          activeChild,
          changeChild,
          navigate,
          languages,
          dispatch,
        })
      }
      style={{
        ...styles.childItem,
        backgroundColor: theme && theme.navigator,
      }}
    >
      <View style={styles.childContainer}>
        <View>
          {child.gender === "male" ? (
            <Image
              style={styles.childImage}
              source={require("../../images/icons/ic_boy.png")}
              tintColor="#7c708c"
            />
          ) : (
            <Image
              style={styles.childImage}
              source={require("../../images/icons/ic_girl.png")}
              tintColor="#7c708c"
            />
          )}
        </View>
        <View>
          <Text>
            <Text style={{ ...styles.childNameText }}>{child.name}</Text>
          </Text>
          <Text>
            <Text
              style={{
                ...styles.childBirthdayText,
                color: theme && theme.text,
              }}
            >
              {_renderAge(child.date, languages)}
            </Text>
          </Text>
        </View>
        <View style={styles.checkIconContainer}>
          {activeChild && child.id === activeChild.id ? (
            <View style={styles.checkIcon}>
              <Image
                source={require("../../images/icons/ic_check.png")}
                style={{
                  width: 26,
                  height: 26,
                  backgroundColor: "#7c708c",
                  borderRadius: 5,
                }}
                tintColor={theme.navigator}
              />
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default connectActionSheet(Child);
