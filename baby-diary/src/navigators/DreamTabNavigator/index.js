import React from 'react';
import { DreamComment, DreamEvent, NewDream } from '../../screens';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Text, TouchableOpacity } from 'react-native';
import { useNavigator } from '../../hooks/useNavigator';
import { removeDreamTC } from '../../redux/reducers/mainReducer';
import moment from 'moment';

const screens = (params, languages, theme, deleteDream) => [
  {
    name: 'Dream',
    children: (props) => {
      return <NewDream {...params} />;
    },
    options: {
      headerRight: () =>
        !params.isNew ? (
          <TouchableOpacity
            style={{
              marginRight: 15,
            }}
            onPress={() => deleteDream(params.dream)}
          >
            <Text
              style={{
                color: theme.text,
              }}
            >
              {languages.delete}
            </Text>
          </TouchableOpacity>
        ) : null,
    },
  },
];

const DreamTabNavigator = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const languages = useSelector(({ app }) => app.languages);
  const theme = useSelector(({ app }) => app.activeTheme);
  const dispatch = useDispatch();

  const handleDelete = (dream) => {
    Alert.alert(
      languages.delete,
      `${languages.delete_confirmation}${dream.startTime} - ${
        dream.endTime ? `${dream.endTime}?` : moment().format('HH:mm?')
      }`,
      [
        {
          text: languages.yes,
          onPress: () => {
            dispatch(removeDreamTC(params.date, params.dream));
            navigation.goBack();
          },
        },
        {
          text: languages.no,
          style: 'cancel',
        },
      ]
    );
  };

  const navigator = useNavigator(
    screens(params || {}, languages, theme, handleDelete),
    params.isNew ? languages.new_dream : languages.editing
  );
  return navigator;
};

export default DreamTabNavigator;
