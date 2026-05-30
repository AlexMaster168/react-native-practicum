import { ScrollView, StyleSheet, View } from 'react-native';
import { Divider, List, SegmentedButtons, Text } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectThemeMode, setThemeMode, type ThemeMode } from '@/store/uiSlice';

export default function AboutScreen() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectThemeMode);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>
          Self Blog
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Лучшее приложение для личных заметок с фотографиями.
        </Text>
      </View>

      <Divider />

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Тема оформления
        </Text>
        <SegmentedButtons
          value={mode}
          onValueChange={(v) => dispatch(setThemeMode(v as ThemeMode))}
          buttons={[
            { value: 'system', label: 'Система', icon: 'theme-light-dark' },
            { value: 'light', label: 'Светлая', icon: 'white-balance-sunny' },
            { value: 'dark', label: 'Тёмная', icon: 'moon-waning-crescent' },
          ]}
        />
      </View>

      <Divider />

      <List.Section>
        <List.Item
          title="Версия"
          description="2.0.0"
          left={(p) => <List.Icon {...p} icon="information-outline" />}
        />
        <List.Item
          title="Стек"
          description="Expo SDK 56 · React Native 0.85 · TypeScript · Redux Toolkit"
          descriptionNumberOfLines={2}
          left={(p) => <List.Icon {...p} icon="layers-outline" />}
        />
        <List.Item
          title="Хранилище"
          description="Локальная база SQLite на устройстве"
          left={(p) => <List.Icon {...p} icon="database-outline" />}
        />
      </List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 24 },
  header: { padding: 24, alignItems: 'center' },
  title: { fontWeight: '700' },
  subtitle: { textAlign: 'center', marginTop: 8, opacity: 0.7 },
  section: { padding: 16 },
  sectionTitle: { marginBottom: 12 },
});
