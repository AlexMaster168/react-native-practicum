import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Switch,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";
import { useSelector } from "react-redux";
import {
  initialState,
  createInfo,
  deleteInfo,
  setDisableTags,
  editInfo,
  updatedInfo,
} from "../../redux/reducers/directoryReducer";
import { setTags } from "../../redux/reducers/directoryReducer";
import { styles } from "./style";
import { renderCreateButton } from "../../utils/renderDirectoryButton";
import { CreateInfoForm, AdBanner } from "../../components";
import { useDispatch } from "react-redux";
import DraggableFlatList from "react-native-draggable-flatlist";
import Swipeable from "react-native-gesture-handler/Swipeable";
import plus from "../../images/icons/ic_plus.png";
const TagsScreen = ({ theme, languages, disableTags, tags }) => {
  const swipeRef = React.useRef([]);

  const renderItem = ({ item, index, drag, isActive }) => (
    <TouchableOpacity onLongPress={drag}>
      <Swipeable
        ref={(el) => (swipeRef.current[item.id] = el)}
        key={item.id}
        renderRightActions={(progress) => renderRightActions(progress, item)}
        renderLeftActions={(progress) => renderLeftActions(progress, item.id)}
      >
        <View
          style={{
            ...styles.settingStatisticItem,
            backgroundColor: theme.navigator,
            paddingVertical: 10,
          }}
        >
          <Text style={{ color: theme.text }}>
            {languages.tags_item[item.id] || item.value}
          </Text>
          <View
            style={{
              backgroundColor: item?.color,
              height: 20,
              width: 20,
              borderRadius: 50,
            }}
          ></View>
        </View>
      </Swipeable>
    </TouchableOpacity>
  );
  const renderRightActions = (progress, value) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setEditMode(true);
          setModalWindow(true);
          setSelectTag(value);
          swipeRef.current[value.id].close();
        }}
        style={{
          ...styles.settingStatisticItem,
          backgroundColor: "orange",
          paddingVertical: 10,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "#333",
          }}
        >
          {languages.edit}
        </Text>
      </TouchableOpacity>
    );
  };
  console.log("d", initialState.tags);
  const renderLeftActions = (progress, id) => {
    console.log(id);
    return (
      <TouchableOpacity
        onPress={() => deleteTag(id)}
        style={{
          ...styles.settingStatisticItem,
          backgroundColor: "red",
          paddingVertical: 10,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "#333",
          }}
        >
          {languages.delete}
        </Text>
      </TouchableOpacity>
    );
  };
  const [selectTag, setSelectTag] = useState("");
  const [mode, setEditMode] = useState(false);
  const deleteTag = (id) => {
    const newTags = tags.filter((tag) => {
      return tag.id !== id;
    });

    dispatch(updatedInfo("tags", newTags));
  };
  const dispatch = useDispatch();
  const toggleEnableAdds = () => {
    dispatch(setDisableTags(!disableTags));
  };
  const [modalWindow, setModalWindow] = useState(false);
  const [listTags, setListTags] = useState();

  useEffect(() => {
    setListTags(
      <DraggableFlatList
        data={tags}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onDragEnd={({ data }) => {
          dispatch(updatedInfo("tags", data));
        }}
      />
    );
  }, [tags]);

  return (
    <React.Fragment>
      <View
        style={{
          backgroundColor: theme.background,
          flex: 1,
          padding: 10,
        }}
      >
        <View
          style={{
            ...styles.settingStatisticItem,
            backgroundColor: theme.navigator,
          }}
        >
          <Text style={{ color: theme.text }}>{languages.on}</Text>
          <Switch
            onValueChange={toggleEnableAdds}
            value={!disableTags}
          ></Switch>
        </View>

        <View style={styles.settingsDescription}>
          <Text style={{ color: theme.text, opacity: 0.8 }}>
            {languages.places_instruct[0]}
          </Text>
          <Text style={{ color: theme.text, opacity: 0.8 }}>
            {languages.places_instruct[1]}
          </Text>
        </View>

        {listTags}
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            position: "absolute",
            bottom: 0,
            padding: 20,
          }}
          onPress={() => setModalWindow(true)}
        >
          <Image source={plus} style={styles.img_plus} />
        </TouchableOpacity>
        <Modal
          transparent={true}
          visible={modalWindow}
          onRequestClose={() => {
            setEditMode(false);
            setModalWindow(false);
            setSelectTag("");
          }}
          animationType="slide"
        >
          <TouchableHighlight
            underlayColor="transparent"
            style={{ flex: 1 }}
            onPress={() => {
              setEditMode(false);
              setModalWindow(false);
              setSelectTag("");
            }}
          >
            <View />
          </TouchableHighlight>
          <CreateInfoForm
            visible={modalWindow}
            type="tags"
            editMode={mode}
            setEditMode={setEditMode}
            setVisible={setModalWindow}
            infoValue={selectTag}
          />
        </Modal>
      </View>
      <AdBanner />
    </React.Fragment>
  );
};
export default TagsScreen;
