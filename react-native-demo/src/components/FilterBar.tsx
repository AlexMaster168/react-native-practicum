import { StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { FILTER_LABELS, type TodoFilter } from '@/types/todo';

interface Props {
  value: TodoFilter;
  onChange: (filter: TodoFilter) => void;
}

export function FilterBar({ value, onChange }: Props) {
  return (
    <SegmentedButtons
      value={value}
      onValueChange={(v) => onChange(v as TodoFilter)}
      buttons={(Object.keys(FILTER_LABELS) as TodoFilter[]).map((key) => ({
        value: key,
        label: FILTER_LABELS[key],
      }))}
      style={styles.bar}
    />
  );
}

const styles = StyleSheet.create({
  bar: { marginBottom: 12 },
});
