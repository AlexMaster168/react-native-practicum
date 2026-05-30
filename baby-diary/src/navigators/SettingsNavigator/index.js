import React from 'react';
import {
  AboutAppScreen,
  Recommendations,
  ReservationScreen,
  CalculatorScreen,
  AddChild,
  RemindersScreen,
  PlacesScreen,
  ChildrenScreen,
  EventSettingScreen,
  TagsScreen,
} from '../../screens';
import { Text, TouchableOpacity, Image, Alert } from 'react-native';
import SettingsTabNavigator from '../SettingsTabNavigator';
import { useNavigator } from '../../hooks/useNavigator';
import DirectoryTabNavigator from '../DirectoryTabNavigator';
import { useSelector } from 'react-redux';
const _createAlert = (languages) =>
  Alert.alert(languages.reference, languages.reference_text, [{ text: 'OK' }], {
    cancelable: true,
  });
import { createStackNavigator } from '@react-navigation/stack';
const { Navigator, Screen } = createStackNavigator();
const screens = (languages) => [
  {
    name: 'Calculator',
    component: CalculatorScreen,
    options: {
      headerTitle: () => (
        <Text style={styles.navTitle}>{languages.calculator}</Text>
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
    name: 'EventSettingScreen',
    component: EventSettingScreen,

    options: {
      headerShown: false,
      headerTitle: () => (
        <Text style={styles.navTitle}>{languages.settings}</Text>
      ),
    },
  },
  // {
  //   name: 'ChildrenScreen',
  //   component: ChildrenScreen,
  //   options: {
  //     headerTitle: () => (
  //       <Text style={styles.navTitle}>{languages.settings}</Text>
  //     ),
  //   },
  // },
  {
    name: 'AddChild',
    component: AddChild,
    options: {
      headerShown: false,
      headerTitle: () => (
        <Text style={styles.navTitle}>{languages.adding_child}</Text>
      ),
    },
  },
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
    name: 'Directory',
    component: DirectoryTabNavigator,
    options: {
      headerTitle: () => (
        <Text style={styles.navTitle}>{languages.ref_book}</Text>
      ),
    },
  },
  {
    name: 'Recommendations',
    component: Recommendations,
    options: {
      headerTitle: () => (
        <Text style={styles.navTitle}>{languages.recommendation}</Text>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => _createAlert(languages)}
          style={{ marginRight: 10 }}
        >
          <Image
            source={require('../../images/icons/ic_help.png')}
            style={{ tintColor: '#fff', width: 24, height: 24 }}
          />
        </TouchableOpacity>
      ),
    },
  },
  {
    name: 'Reminders',
    component: RemindersScreen,
    options: {
      headerTitle: () => (
        <Text style={styles.navTitle}>{languages.reminders}</Text>
      ),
    },
  },

  {
    name: 'SettingsView',
    component: SettingsTabNavigator,
    options: {
      headerShown: false,
      headerTitle: () => (
        <Text style={styles.navTitle}>{languages.settings}</Text>
      ),
    },
  },

  {
    name: 'Reservation',
    component: ReservationScreen,
    options: {
      headerTitle: () => (
        <Text style={styles.navTitle}>{languages.reservation}</Text>
      ),
    },
  },

  {
    name: 'AboutApp',
    component: AboutAppScreen,
    options: {
      headerTitle: () => (
        <Text style={styles.navTitle}>{languages.about_app}</Text>
      ),
    },
  },
];

export const SettingsNavigator = () => {
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
      {screens(languages).map((screen, index) => (
        <Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Navigator>
  );
  // return navigator;
};

const styles = {
  navTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
};
