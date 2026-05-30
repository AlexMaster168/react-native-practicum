import { ScrollView, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

interface Props {
  tags: string[];
  active: string | null;
  onToggle: (tag: string) => void;
}

/** Горизонтальная лента тегов-фильтров. Повторный тап по активному снимает фильтр. */
export function TagFilterBar({ tags, active, onToggle }: Props) {
  if (tags.length === 0) return null;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {tags.map((t) => (
        <Chip
          key={t}
          selected={active === t}
          showSelectedCheck
          onPress={() => onToggle(t)}
          style={styles.chip}
        >
          {t}
        </Chip>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: 8, paddingVertical: 4, paddingRight: 12 },
  chip: { marginRight: 0 },
});
