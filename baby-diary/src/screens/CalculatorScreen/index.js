import React, { useState, useEffect } from "react";
import { styles } from "./style";
import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Calculator, AdBanner } from "../../components";
const CalculatorScreen = ({ languages, theme }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("period"); // default calc type
  const [items, setItems] = useState([
    {
      label: `${languages.calculator_types[0]}`,
      value: `period`,
    },
    {
      label: `${languages.calculator_types[1]}`,
      value: `dateAndTime`,
    },
    {
      label: `${languages.calculator_types[2]}`,
      value: `sum`,
    },
  ]);
  const [margin, setMargin] = useState({});
  useEffect(() => {
    open ? setMargin({ marginBottom: 140 }) : setMargin({ marginBottom: 0 });
  }, [open]);
  return (
    <React.Fragment>
      <View style={{ flex: 1, padding: 10, backgroundColor: theme.background }}>
        <View style={margin}>
          <Text style={{ ...styles.text, color: theme.text }}>
            {languages.calculator_type}{" "}
          </Text>
          <DropDownPicker
            dropDownDirection="AUTO"
            bottomOffset={100}
            placeholder={languages.calculator_types[0]}
            style={{
              backgroundColor: theme.background,
              borderColor: theme.borderColor,
            }}
            labelStyle={{
              color: theme.text,
            }}
            arrowIconStyle={{
              tintColor: theme.text,
            }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
        <Calculator languages={languages} type={value} theme={theme} />
      </View>
      <AdBanner />
    </React.Fragment>
  );
};
export default CalculatorScreen;
