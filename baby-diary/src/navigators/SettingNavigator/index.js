import React from 'react';
import {
  PlacesScreen,
  SettingsStatisticsScreen,
  TagsScreen,
} from '../../screens';
import { Text, Alert } from 'react-native';
import { useNavigator } from '../../hooks/useNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

const { Navigator, Screen } = createStackNavigator();

const screens = (languages) => [
  {
    name: 'PlacesScreen',
    component: PlacesScreen,
    options: {
      headerShown: false,
      headerTitle: () => (
        <Text style={styles.navTitle}>{languages.sleeping_places}</Text>
      ),
    },
  },
  {
    name: 'TagsScreen',
    component: TagsScreen,

    options: {
      headerShown: false,
      headerTitle: () => (
        <Text style={styles.navTitle}>{languages.settings}</Text>
      ),
    },
  },
  {
    name: 'SettingsStatisticsScreen',
    component: SettingsStatisticsScreen,
    options: {
      headerTitle: () => (
        <Text style={styles.navTitle}>{languages.settings}</Text>
      ),
    },
  },
  {
    name: 'View',
    component: SettingsStatisticsScreen,
    options: {
      headerShown: false,

      headerTitle: () => (
        <Text style={styles.navTitle}>{languages.settings_statistics}</Text>
      ),
    },
  },
  {
    name: 'SettingStatisic',
    component: SettingsStatisticsScreen,
    options: {
      headerShown: false,

      headerTitle: () => (
        <Text style={styles.navTitle}>{languages.settings_statistics}</Text>
      ),
    },
  },
];

export const SettingssNavigator = () => {
  const languages = useSelector(({ app }) => app.languages);
  const navigator = useNavigator(screens(languages));
  return (
    <Navigator
      initialRouteName='TagsScreen'
      screenOptions={{
        headerTitle: () => (
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
            {headerTitle || ''}
          </Text>
        ),

        headerStyle: {
          backgroundColor: '#333',
          elevation: 0,
        },
        headerTintColor: '#fff',
      }}
    >
      {screens.map((screen, index) => (
        <Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Navigator>
  );
};

const styles = {
  navTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
};
