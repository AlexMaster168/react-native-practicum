import React from "react";
import { View, Text, Dimensions } from "react-native";
import { CreateChildForm } from "../../components";
import { styles } from "./styles";
import AdBanner from "../../components/AdBanner";
import { useSelector } from "react-redux";

const deviceHeight = Dimensions.get("window").height;

export const CreateChild = ({ children, setLaunchTC }) => {
  const languages = useSelector(({ app }) => app.languages);
  const theme = useSelector(({ app }) => app.activeTheme);

  return (
    <View
      style={[
        { height: deviceHeight },
        styles.createChildContainer,
        { backgroundColor: theme.background },
      ]}
    >
      <Text style={{ ...styles.createFormTitle, color: theme.text }}>
        {languages.launch_first}
      </Text>
      <Text style={{ ...styles.createFormDesc, color: theme.text }}>
        {languages.launch_second}
      </Text>
      <CreateChildForm children={children} setLaunchTC={setLaunchTC} />
      <AdBanner />
    </View>
  );
};

export default CreateChild;
