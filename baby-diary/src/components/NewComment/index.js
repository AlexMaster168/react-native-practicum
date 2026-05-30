import React, { useState } from 'react';
import { updateDreamTC } from '../../redux/reducers/mainReducer';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SheetManager } from 'react-native-actions-sheet';

const NewComment = ({ dream, date }) => {
  const [newComment, setNewComment] = useState(dream.comment);
  const languages = useSelector(({ app }) => app.languages);
  const theme = useSelector(({ app }) => app.activeTheme);
  console.log(dream.place);
  const dispatch = useDispatch();
  const changeComment = () => {
    const payload = {
      ...dream,
      comment: newComment,
    };
    const prevDate = {
      startDate: dream.startDate,
      endDate: dream.endDate,
    };
    dispatch(updateDreamTC(date, payload, dream.id, prevDate, true));
    SheetManager.hide('mysheet');
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <Text style={{ color: theme.text, padding: 20, fontSize: 20 }}>
          {languages.comment}
        </Text>
        <TextInput
          multiline={true}
          style={{
            color: theme.text,
            height: 70,
            marginBottom: 20,
            backgroundColor: theme.background,
            padding: 10,
            borderRadius: 10,
          }}
          value={newComment}
          onChangeText={(text) => setNewComment(text)}
        />
        <TouchableOpacity
          onPress={changeComment}
          style={{
            width: '100%',
            alignSelf: 'center',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: theme.text,
          }}
        >
          <Text
            style={{ color: theme.text, fontSize: 20, textAlign: 'center' }}
          >
            {languages.add}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default NewComment;
