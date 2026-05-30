import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./styles";
import { Button } from "../../components";

const AddTagsScreen = ({
  navigation,
  tags,
  languages,
  setTags,
  activeTags,
  theme,
}) => {
  const [selectedTags, setSelectedTags] = useState(activeTags || []);
  const _handleSelectTag = (tag) => {
    if (!selectedTags.find((sTag) => sTag.id === tag.id)) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      setSelectedTags(selectedTags.filter((sTag) => sTag.value !== tag.value));
    }
  };

  return (
    <View
      style={{ ...styles.addTagsContainer, backgroundColor: theme.background }}
    >
      <ScrollView>
        {tags.map((tag) => (
          <TouchableOpacity
            style={[
              styles.tagItem,
              !!selectedTags.find((sTag) => sTag.id === tag.id) &&
                styles.selectedTag,
            ]}
            onPress={() => _handleSelectTag(tag)}
            key={tag.id}
          >
            <Text style={{ fontSize: 16, color: theme.text }}>
              {languages.tags_item[tag.id] || tag.value}
            </Text>
            <View
              style={{
                ...styles.unselectedTagDot,
                backgroundColor: tag.color,
              }}
            ></View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View>
        <Button
          pressHandler={() => {
            setTags(selectedTags);
            navigation.goBack();
          }}
          buttonText={languages.select}
        />
      </View>
    </View>
  );
};

export default AddTagsScreen;
