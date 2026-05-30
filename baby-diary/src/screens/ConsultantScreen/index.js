import React, { useState } from 'react';
import AdBanner from '../../components/AdBanner';
import { Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
const ConsultantScreen = () => {
  const theme = useSelector(({ app }) => app.activeTheme);
  const [isVisible, setSetIsVisible] = useState(false);
  //   const { languages } = useSelector(({ app }) => app.activeTheme);
  console.log(theme);

  return (
    <React.Fragment>
      <View style={{ backgroundColor: theme.background, flex: 1 }}>
        <TouchableOpacity
          onPress={() => setSetIsVisible(!isVisible)}
          style={{
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../../images/consultant.png')}
            style={{
              position: 'relative',
              marginTop: 20,
              borderRadius: 20,
              width: '95%',
              borderColor: theme.navigator,
              borderWidth: 2,
              height: 200,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              color: theme.text,
              opacity: 0.8,
              padding: 6,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              width: '95%',
              backgroundColor: '#333',
              position: 'absolute',
              bottom: 0,
            }}
          >
            Татьяна Ларье
          </Text>
        </TouchableOpacity>
        {isVisible && (
          <View style={{ paddingHorizontal: 15 }}>
            <View
              style={{
                alignSelf: 'center',
                width: '50%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('http://t.me/Tanyalare_bot').catch((err) =>
                    console.error('An error occurred', err)
                  )
                }
              >
                <Image source={require('../../images/icons/telegram.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('http://www.instagram.com/tanyalare/').catch(
                    (err) => console.error('An error occurred', err)
                  )
                }
              >
                <Image source={require('../../images/icons/instagram.png')} />
              </TouchableOpacity>
            </View>
            <Text
              style={{ color: theme.text, marginTop: 20, textAlign: 'auto' }}
            >
              Меня зовут Татьяна Ларье. Я сомнолог|коснультант по детскому сну.
              Автор собственной методики по коррекции нарушений сна детей и
              проекта о здоровом взосрлом и детском сне "Ларье про сон".
            </Text>
          </View>
        )}
      </View>
      <AdBanner />
    </React.Fragment>
  );
};
export default ConsultantScreen;
