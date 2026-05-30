import React, { useState } from "react";
import AdBanner from "../../components/AdBanner";
import { View, ScrollView, TouchableOpacity, Image, Modal } from "react-native";
import { Child } from "../../components";
import plus from "../../images/icons/ic_plus.png";
import { accent } from "../../core/colors";
import { useNavigation } from "@react-navigation/native";
import { setLaunchTC } from "../../redux/reducers/appReducer";

const ChildrenScreen = ({
  children,
  loading,
  changeChild,
  activeChild,
  languages,
  theme,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { navigate } = useNavigation();
  const _handleClick = () => {
    navigate("AddChild", {
      setLaunchTC,
      goToBack: true,
    });
  };

  return (
    <React.Fragment>
      <View
        style={{
          padding: 10,

          backgroundColor: theme.background,
          flex: 1,
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ScrollView>
          {children &&
            children.map((child, index) => (
              <Child
                languages={languages}
                changeChild={changeChild}
                activeChild={activeChild}
                key={index}
                child={child}
                childrenCount={children.length}
                theme={theme}
              />
            ))}
        </ScrollView>
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
          }}
          onPress={_handleClick}
        >
          <Image
            source={plus}
            style={{
              borderRadius: 5,
              backgroundColor: "#ebcc34",
              width: 32,
              height: 32,
              bottom: 0,
              alignSelf: "flex-end",
              tintColor: accent,
            }}
          />
        </TouchableOpacity>
        <Modal visible={false}>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
            }}
          >
            <Image
              source={plus}
              style={{
                width: 40,
                height: 40,
                bottom: 0,
                alignSelf: "flex-end",
                tintColor: accent,
              }}
            />
          </TouchableOpacity>
          {/* <AddChildScreen goToBack={true} navigate={navigate} /> */}
        </Modal>
      </View>
      <AdBanner />
    </React.Fragment>
  );
};
export default ChildrenScreen;
