import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import ActionSheet, { registerSheet } from "react-native-actions-sheet";
import { useSelector } from "react-redux";
import NewComment from "../NewComment";
import SelectPlaces from "../SelectPlaces";
import SelectTag from "../SelectTag";

const ExampleSheet = ({ sheetId }) => {
  const actionSheetRef = useRef(null);
  const theme = useSelector(({ app }) => app.activeTheme);
  const [selectType, setSelectType] = useState({
    dream: "",
    date: "",
    typ: "",
  });

  return (
    <ActionSheet
      containerStyle={{ backgroundColor: theme.navigator }}
      initialOffsetFromBottom={0.7}
      onBeforeShow={({ dream, date, typ }) => {
        setSelectType({ dream: dream, date: date, typ: typ });
      }}
      id={sheetId}
      ref={actionSheetRef}
      statusBarTranslucent
      bounceOnOpen={true}
      drawUnderStatusBar={true}
      gestureEnabled={true}
      defaultOverlayOpacity={0.3}>
      <View style={{ height: 450, backgroundColor: theme.navigator }}>
        {selectType.typ === "place" && (
          <SelectPlaces dream={selectType.dream} date={selectType.date} />
        )}
        {selectType.typ === "tag" && (
          <SelectTag dream={selectType.dream} date={selectType.date} />
        )}
        {selectType.typ === "comment" && (
          <NewComment dream={selectType.dream} date={selectType.date} />
        )}
        <View style={styles.footer} />
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 100,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  placeholder: {
    height: 15,
    backgroundColor: "#f0f0f0",
    marginVertical: 15,
    borderRadius: 5,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  btnLeft: {
    width: 30,
    height: 30,
    backgroundColor: "#f0f0f0",
    borderRadius: 100,
  },
  input: {
    width: "100%",
    minHeight: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
});

export default ExampleSheet;

registerSheet("mysheet", ExampleSheet);
