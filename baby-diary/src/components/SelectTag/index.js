import React, { useState } from "react";
import { updateDreamTC } from "../../redux/reducers/mainReducer";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SheetManager } from "react-native-actions-sheet";
import { styles } from "./styles";
import { accent } from "../../core/colors";

const SelectPlaces = ({ dream, date }) => {
  const tags = useSelector(({ directory }) => directory.tags);
  const languages = useSelector(({ app }) => app.languages);
  const theme = useSelector(({ app }) => app.activeTheme);
  const [selectedTags, setSelectedTags] = useState(dream.tags || []);
  console.log(tags[0].value);
  const dispatch = useDispatch();
  const _handleSelectTag = (tag) => {
    if (!selectedTags.find((sTag) => sTag.id === tag.id)) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      setSelectedTags(selectedTags.filter((sTag) => sTag.value !== tag.value));
    }
  };

  const changeTags = () => {
    const payload = {
      ...dream,
      tags: selectedTags,
    };
    const prevDate = {
      startDate: dream.startDate,
      endDate: dream.endDate,
    };
    dispatch(updateDreamTC(date, payload, dream.id, prevDate, true));
    SheetManager.hide("mysheet");
  };
  return (
    <View style={{ height: 400 }}>
      <Text style={{ color: theme.text, padding: 20, fontSize: 20 }}>
        {languages.tags}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            flex: 1,
          }}
        >
          {tags.map((tag, index) => (
            <TouchableOpacity
              style={[
                { ...styles.tagItem, borderColor: tag.color },
                !!selectedTags.find((sTag) => sTag.id === tag.id) && {
                  backgroundColor: (tag.color && tag.color) || accent,
                },
              ]}
              onPress={() => _handleSelectTag(tag)}
              key={tag.id}
            >
              <Text
                style={{ fontSize: 16, color: theme.text, textAlign: "left" }}
              >
                {languages.tags_item[tag.id] || tag.value}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity
        onPress={changeTags}
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
