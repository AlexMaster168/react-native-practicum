import { StyleSheet } from "react-native";
import { accent } from "../../core/colors";

export const styles = StyleSheet.create({
  addTagsContainer: {
    flex: 1,
    padding: 20,
  },

  tagItem: {
    marginRight: 5,
    borderWidth: 1,
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  selectedTag: {
    backgroundColor: accent,
  },
});
