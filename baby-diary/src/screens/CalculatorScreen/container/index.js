import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setLanguagesTC } from "../../../redux/reducers/appReducer";
import CalculatorScreen from "../index";
const mapStateToProps = ({ app }) => ({
  languages: app.languages,
  theme: app.activeTheme
});
export default connect(mapStateToProps, { setLanguagesTC })(
  ({ languages, theme }) => {
    const navigation = useNavigation();

    useEffect(() => {
      const unsubscribe = navigation.addListener("focus", () => {});
      return unsubscribe;
    });
    return <CalculatorScreen languages={languages} theme={theme} />;
  }
);
