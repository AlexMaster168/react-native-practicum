import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="(tabs)"
        options={{ headerShown: false, drawerLabel: 'Главная', title: 'Главная' }}
      />
      <Drawer.Screen
        name="create"
        options={{ drawerLabel: 'Новый пост', title: 'Новый пост' }}
      />
      <Drawer.Screen
        name="about"
        options={{ drawerLabel: 'О приложении', title: 'О приложении' }}
      />
    </Drawer>
  );
}
