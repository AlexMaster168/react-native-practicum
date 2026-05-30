import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';

import { accent } from '../../core/colors';
import { styles } from './style';
const FullVersionScreen = () => {
  const theme = useSelector(({ app }) => app.activeTheme);
  const languages = useSelector(({ app }) => app.languages);
  return (
    <View style={{ backgroundColor: theme.background, ...styles.wrapper }}>
      <View style={styles.advantages_container}>
        <Text style={{ color: theme.text }}>{languages.advantages}</Text>
        <FlatList
          data={languages.list_advantages}
          renderItem={(item) => (
            <Text style={{ color: theme.text }}>{item.item}</Text>
          )}
        />
      </View>
      <View style={{ width: '100%', flex: 1 }}>
        <View>
          <Text style={{ ...styles.text, color: theme.text }}>
            {languages.subscriptions}{' '}
          </Text>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(languages.attention, languages.make_purchase, [
                {
                  text: 'Yes',
                },

                {
                  text: 'No',
                },
              ])
            }
          >
            <View
              style={{
                ...styles.subscriptions_container,
                backgroundColor: theme.navigator,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ color: theme.text }}>1 месяц</Text>
                <Text style={{ color: theme.text }}>4,49$</Text>
              </View>
              <Text
                style={{
                  ...styles.text,
                  color: theme.text,
                  fontStyle: 'italic',
                }}
              >
                Доступ ко всем возможностям приложения
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={{ ...styles.text, color: theme.text }}>
            {languages.title_subscriptions}
          </Text>
        </View>
        <View>
          <Text style={{ ...styles.text, color: theme.text }}>
            {languages.purchases}{' '}
          </Text>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(languages.attention, languages.make_purchase, [
                {
                  text: 'Yes',
                },

                {
                  text: 'No',
                },
              ])
            }
          >
            <View
              style={{
                ...styles.subscriptions_container,
                backgroundColor: theme.navigator,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ color: theme.text }}>
                  {languages.full_version}
                </Text>
                <Text style={{ color: theme.text }}>37,49$</Text>
              </View>
              <Text
                style={{
                  ...styles.text,
                  color: theme.text,
                  fontStyle: 'italic',
                }}
              >
                Доступ ко всем возможностям приложения. Навсегда
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={{ ...styles.text, color: theme.text }}>
            {languages.title_purchases}
          </Text>
        </View>
        <Text style={{ ...styles.text, color: theme.text }}>
          {languages.prompt}
        </Text>
      </View>
      <TouchableOpacity style={{ alignSelf: 'flex-start' }}>
        <Text style={{ ...styles.text, color: accent }}>
          {languages.privacy}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ alignSelf: 'center' }}>
        <Text style={{ ...styles.text, color: accent }}>
          {languages.restore}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default FullVersionScreen;
