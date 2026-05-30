import type { ColorValue } from 'react-native';
import { useNavigation } from 'expo-router';
import { HeaderIcon } from './HeaderIcon';

/** Бургер для открытия Drawer из вложенных экранов (табы и т.п.). */
export function DrawerMenuButton({ color }: { color?: ColorValue }) {
  const navigation = useNavigation();

  const openDrawer = () => {
    // Drawer — предок табов. У его navigation есть метод openDrawer();
    // получаем его через getParent(). Фоллбэк — всплывающий raw-экшен.
    const self = navigation as { openDrawer?: () => void };
    if (typeof self.openDrawer === 'function') {
      self.openDrawer();
      return;
    }
    const parent = navigation.getParent() as { openDrawer?: () => void } | undefined;
    if (parent?.openDrawer) {
      parent.openDrawer();
      return;
    }
    navigation.dispatch({ type: 'OPEN_DRAWER' } as never);
  };

  return (
    <HeaderIcon
      icon="menu"
      color={color}
      accessibilityLabel="Открыть меню"
      onPress={openDrawer}
    />
  );
}
