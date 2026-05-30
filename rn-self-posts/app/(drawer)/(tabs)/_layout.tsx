import { Tabs, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerMenuButton } from '@/components/DrawerMenuButton';
import { HeaderIcon } from '@/components/HeaderIcon';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerLeft: ({ tintColor }) => <DrawerMenuButton color={tintColor} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Все',
          headerTitle: 'Мой блог',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-grid-outline" color={color} size={size} />
          ),
          headerRight: ({ tintColor }) => (
            <HeaderIcon
              icon="camera-plus"
              color={tintColor}
              accessibilityLabel="Создать пост"
              onPress={() => router.push('/create')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="booked"
        options={{
          tabBarLabel: 'Избранное',
          headerTitle: 'Избранное',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="star" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
