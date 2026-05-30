import type { ColorValue } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useThemeMode, type ThemeMode } from '@/context/ThemeContext';

const ICON: Record<ThemeMode, string> = {
  system: 'theme-light-dark',
  light: 'white-balance-sunny',
  dark: 'moon-waning-crescent',
};

/** Кнопка в хедере: циклически переключает тему system → light → dark. */
export function ThemeToggleButton({ color }: { color?: ColorValue }) {
  const { mode, cycle } = useThemeMode();
  return (
    <IconButton
      icon={ICON[mode]}
      iconColor={color as string | undefined}
      accessibilityLabel="Сменить тему"
      onPress={cycle}
    />
  );
}
