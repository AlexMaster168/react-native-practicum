import { StyleSheet } from 'react-native';
import { accent } from '../../core/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  themesContainer: {
    borderRadius: 15,
    padding: 10,
    overflow: 'hidden',
  },
  theme: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: accent,
    padding: 15,
  },
  selected: {
    borderRadius: 50,
    paddingHorizontal: 4,
    backgroundColor: '#910791',
  },
});
