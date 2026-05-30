import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import { Button, CenterBlock, Child, AdBanner } from '../../components';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const _settingsSection = (languages) => [
  {
    route: 'Reservation',
    img: require('../../images/icons/ic_cloud.png'),
    title: languages.reservation,
  },
  {
    route: 'Recommendations',
    img: require('../../images/icons/ic_indicators.png'),
    title: languages.recommendation,
  },
  {
    route: 'Reminders',
    img: require('../../images/icons/ringing.png'),
    title: languages.reminders,
  },
  {
    route: 'Calculator',
    img: require('../../images/icons/keys.png'),
    title: languages.calculator,
  },
  {
    route: 'SettingsView',
    img: require('../../images/icons/ic_settings.png'),
    title: languages.settings,
  },

  {
    route: 'Directory',
    img: require('../../images/icons/ic_data.png'),
    title: languages.ref_book,
  },
  {
    route: 'AboutApp',
    img: require('../../images/icons/ic_help.png'),
    title: languages.about_app,
  },
];

export const SettingsScreen = ({
  children,
  loading,
  changeChild,
  activeChild,
  languages,
  theme,
}) => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const _handleClick = () => {
    navigate('AddChild', { goToBack: true, navigate });

    console.log('children', children);
  };
  const _handleNavigate = (path) => {
    navigate(path, { theme });
  };

  return (
    <React.Fragment>
      <ScrollView
        style={{
          ...styles.settingsContainer,
          backgroundColor: theme.background,
        }}
      >
        <View style={styles.childrenBlock}>
          <Text style={styles.settingsSectionTitle}>{languages.children}</Text>
          <View>
            {loading ? (
              <CenterBlock>
                <ActivityIndicator size='large' color='#e91e63' />
              </CenterBlock>
            ) : (
              children &&
              children.map((child, index) => (
                <Child
                  languages={languages}
                  changeChild={changeChild}
                  activeChild={activeChild}
                  key={index}
                  child={child}
                  childrenCount={children.length}
                  navigate={navigate}
                  theme={theme}
                />
              ))
            )}
          </View>
          <Button
            style={{ marginHorizontal: 15, color: theme.text }}
            buttonText={languages.create_child}
            pressHandler={_handleClick}
          />
        </View>
        <View>
          <Text style={{ ...styles.settingsSectionTitle, color: theme.text }}>
            {languages.additional}
          </Text>
          <View
            style={{ ...styles.addBlock, backgroundColor: theme.navigator }}
          >
            {_settingsSection(languages).map((section) => (
              <TouchableOpacity
                onPress={() => _handleNavigate(section.route)}
                style={{ ...styles.settingsLink }}
                key={section.title}
              >
                <View style={styles.iconContainer}>
                  <Image
                    style={styles.settingsLinkIcon}
                    source={section.img}
                    width={24}
                  />
                </View>
                <Text style={{ color: '#fff' }}>{section.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <AdBanner />
    </React.Fragment>
  );
};
export default SettingsScreen;
