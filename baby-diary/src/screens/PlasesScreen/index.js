import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Switch,
  TextInput,
} from "react-native";
import { useDispatch } from "react-redux";
import { AdBanner } from "../../components";
import { styles } from "./style";
import { renderCreateButton } from "../../utils/renderDirectoryButton";
import {
  editPlace,
  updatedInfo,
  setDisablePlaces,
  deletePlace,
} from "../../redux/reducers/directoryReducer";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Modal from "react-native-modal";
const deviceWidth = Dimensions.get("window").width;
import DraggableFlatList from "react-native-draggable-flatlist";

const PlacesScreen = ({ theme, languages, disablePlaces, placess }) => {
  const swipeRef = React.useRef([]);
  const dispatch = useDispatch();
  const [isPlacesVisible, setIsPlacesVisible] = useState(false);

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
            {languages.places[item.id] || item.value}
          </Text>
        </View>
      </Swipeable>
    </TouchableOpacity>
  );
  const [modalWindow, setModalWindow] = useState(false);
  const [text, setText] = useState("");
  const [selectPlace, setSelectPlace] = useState("");
  const [places, setPlaces] = useState(placess);
  const _handleCreateInfo = () => {
    const trimmedPlace = text.trim();
    setModalWindow(false);
    if (trimmedPlace.length > 0) dispatch(editPlace("places", trimmedPlace, selectPlace.id));
  };

  const renderRightActions = (progress, place, ref) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setText(place.value);
          setSelectPlace(place);
          setModalWindow(true);
          swipeRef.current[place.id].close();
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
  const renderLeftActions = (progress, id) => {
    return (
      <TouchableOpacity
        onPress={() => {
          deletePlaces(id);
          swipeRef.current[id].close();
        }}
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

  const [listPlaces, setListPlaces] = useState(
    <DraggableFlatList
      data={places}
      renderItem={renderItem}
      dragItemOverflow={true}
      keyExtractor={(item, index) => index.toString()}
      onDragEnd={({ data }) => {
        dispatch(updatedInfo("places", data));
      }}
    />
  );
  const deletePlaces = (id) => {
    const newPlaces = places.filter((place) => {
      return place.id !== id;
    });
    dispatch(deletePlace(id));
    setPlaces(newPlaces);
  };
  const toggleEnableAdds = () => {
    dispatch(setDisablePlaces(!disablePlaces));
  };

  useEffect(() => {
    setListPlaces(
      <DraggableFlatList
        data={places}
        renderItem={renderItem}
        onScrollOffsetChange={(offset) => console.log(offset)}
        keyExtractor={(item, index) => index.toString()}
        onDragEnd={({ data }) => {
          dispatch(updatedInfo("places", data));
        }}
      />
    );
  }, [places]);
  useEffect(() => {
    setPlaces(placess);
  }, [placess]);
  return (
    <React.Fragment>
      <View style={{ backgroundColor: theme.background, flex: 1, padding: 10 }}>
        <View
          style={{
            ...styles.settingStatisticItem,
            backgroundColor: theme.navigator,
          }}
        >
          <Text style={{ color: theme.text }}>{languages.on}</Text>
          <Switch
            onValueChange={() => dispatch(setDisablePlaces(!disablePlaces))}
            value={!disablePlaces}
          ></Switch>
        </View>
        <View style={styles.settingsDescription}>
          <Text style={{ color: theme.text, opacity: 0.8, fontSize: 11 }}>
            {languages.places_instruct[0]}
          </Text>
          <Text style={{ color: theme.text, opacity: 0.8, fontSize: 11 }}>
            {languages.places_instruct[1]}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: 10,
          }}
        >
          {renderCreateButton(
            languages.create,
            "places",
            () => setIsPlacesVisible(true),
            isPlacesVisible,
            setIsPlacesVisible
          )}
        </View>
        {listPlaces}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: 10,
          }}
        >
          <Modal
            isVisible={modalWindow}
            onBackButtonPress={() => setModalWindow(false)}
            onBackdropPress={() => setModalWindow(false)}
            hideModalContentWhileAnimating
            backdropOpacity={0.4}
            style={styles.modalContainer}
          >
            <View
              style={{
                ...styles.modalContent,
                width: deviceWidth - 40,
                backgroundColor: theme.navigator,
                height: 150,
              }}
            >
              <Text
                style={{
                  color: theme.text,
                  opacity: 0.7,
                  alignSelf: "flex-start",
                  padding: 5,
                }}
              >
                {languages.name_place}
              </Text>
              <TextInput
                style={{
                  borderRadius: 5,
                  ...styles.modalInput,
                  color: theme.text,
                  backgroundColor: theme.background,
                  marginBottom: 10,
                }}
                value={text}
                onChangeText={(text) => setText(text)}
              ></TextInput>
              <TouchableOpacity onPress={_handleCreateInfo}>
                <Text
                  style={{
                    textAlign: "center",
                    color: theme.text,
                    backgroundColor: theme.background,
                    padding: 7,
                    borderRadius: 5,
                  }}
                >
                  {languages.edit}
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
      <AdBanner />
    </React.Fragment>
  );
};

export default PlacesScreen;
