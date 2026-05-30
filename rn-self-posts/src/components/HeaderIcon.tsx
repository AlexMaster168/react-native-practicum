import type { ColorValue } from 'react-native';
import { IconButton } from 'react-native-paper';

interface Props {
  icon: string;
  color?: ColorValue;
  onPress: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
}

/** Кнопка-иконка для хедера навигации (цвет берётся из tintColor хедера). */
export function HeaderIcon({ icon, color, onPress, disabled, accessibilityLabel }: Props) {
  return (
    <IconButton
      icon={icon}
      iconColor={color as string | undefined}
      size={24}
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      style={{ margin: 0 }}
    />
  );
}
