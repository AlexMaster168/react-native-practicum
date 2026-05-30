import { StyleSheet } from "react-native";
import { accent } from "../../core/colors";

export const styles = StyleSheet.create({
  addTagsContainer: {
    flex: 1,
    padding: 20
  },
  unselectedTagDot: {
    width: 18,
    height: 18,
    borderRadius: 10
  },
  tagItem: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5
  },
  selectedTag: {
    borderRadius: 3,
    backgroundColor: accent
  }
});
