import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import PeriodCalculator from "../calculators/PeriodCalculator";
import DateAndTimeCalculator from "../calculators/DateAndTimeCalculator";
import SumCalculator from "../calculators/SumCalculator";

const Calculator = ({ languages, theme, type }) => {
  const [result, setResult] = useState("");

  const [calculatorValues, setCalculatorValues] = useState({
    // local state of calculator values
    period: {
      timeStart: new Date(),
      timeEnd: new Date(),
      dateStart: new Date(),
      dateEnd: new Date(),
    },
    dateAndTime: {
      time: new Date(),
      date: new Date(),
      period: new Date(98, 1),
    },
    sum: [
      {
        id: Date.now(),
        value: new Date(98, 1),
        operation: "+",
        show: false,
      },
      {
        id: Date.now() + 1,
        value: new Date(98, 1),
        operation: "+",
        show: false,
      },
    ],
  });

  const getCalculatorPropsByType = () => {
    // gets default props and specific initState for calculators
    return {
      languages,
      theme,
      setResult,
      setCalculatorValues,
      state: calculatorValues[type],
    };
  };

  const renderCalculator = () => {
    switch (type) {
      case "period":
        return <PeriodCalculator {...getCalculatorPropsByType()} />;
      case "dateAndTime":
        return <DateAndTimeCalculator {...getCalculatorPropsByType()} />;
      case "sum":
        return <SumCalculator {...getCalculatorPropsByType()} />;
      default:
        break;
    }
  };
  const [calculator, setCalculator] = useState(
    <PeriodCalculator {...getCalculatorPropsByType()} /> // period calculator is a default one
  );
  useEffect(() => {
    setCalculator(renderCalculator());
  }, [type]); // rerenders on type chosen

  return (
    <>
      <View style={{ padding: 10 }}>{calculator}</View>
      <Text
        style={{
          color: theme.text,
          backgroundColor: theme.navigator,
          textAlign: "center",
          padding: 15,
        }}
      >
        {result}
      </Text>
    </>
  );
};
export default Calculator;
