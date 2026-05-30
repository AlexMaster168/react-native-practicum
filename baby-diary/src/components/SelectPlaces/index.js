import React, { useState } from "react";
import { updateDreamTC } from "../../redux/reducers/mainReducer";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Label } from "../index";
import { SheetManager } from "react-native-actions-sheet";

const SelectPlaces = ({ dream, date }) => {
  const places = useSelector(({ directory }) => directory.places);
  const languages = useSelector(({ app }) => app.languages);
  const theme = useSelector(({ app }) => app.activeTheme);
  const [activePlace, setActivePlace] = useState(dream.place);
  console.log(dream.place);
  console.log(places);
  const dispatch = useDispatch();
  const changePlace = () => {
    const payload = {
      ...dream,
      place: activePlace,
    };
    const prevDate = {
      startDate: dream.startDate,
      endDate: dream.endDate,
    };
    console.log(payload);
    dispatch(updateDreamTC(date, payload, dream.id, prevDate, true));
    SheetManager.hide("mysheet");
  };
  return (
    <View>
      <Text style={{ color: theme.text, padding: 20, fontSize: 20 }}>
        {languages.sleeping_places}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        {places.map(({ value, id }) => (
          <TouchableOpacity onPress={() => setActivePlace(value)} key={id}>
            <Label
              place={value}
              languages={languages}
              style={{
                color: theme.text,
                flexDirection: "row",
                alignItems: "center",
                padding: 7,
                borderRadius: 3,
                marginRight: 5,
              }}
              focused={value === activePlace}
            />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        onPress={changePlace}
        style={{
          paddingVertical: 5,
          marginTop: 20,
          width: "95%",
          alignSelf: "center",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: theme.text,
        }}
      >
        <Text style={{ color: theme.text, fontSize: 20, textAlign: "center" }}>
          {languages.add}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default SelectPlaces;
