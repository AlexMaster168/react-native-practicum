import { useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Text, TextInput } from 'react-native-paper';
import { useAppDispatch } from '@/store/hooks';
import { addPost } from '@/store/postsSlice';
import { PhotoPicker } from '@/components/PhotoPicker';
import { TagInput } from '@/components/TagInput';

export default function CreateScreen() {
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [img, setImg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    Keyboard.dismiss();
    setSaving(true);
    try {
      await dispatch(
        addPost({
          date: new Date().toJSON(),
          text: text.trim(),
          img: img ?? '',
          booked: false,
          tags,
        })
      ).unwrap();
      setText('');
      setTags([]);
      setImg(null);
      router.replace('/');
    } catch (e) {
      console.warn('Не удалось сохранить пост:', e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container}>
      <Text variant="titleMedium" style={styles.title}>
        Создай новый пост
      </Text>
      <TextInput
        mode="outlined"
        label="Текст заметки"
        value={text}
        onChangeText={setText}
        multiline
        numberOfLines={4}
        style={styles.textarea}
      />
      <View style={styles.section}>
        <TagInput tags={tags} onChange={setTags} />
      </View>
      <View style={styles.section}>
        <PhotoPicker onPick={setImg} />
      </View>
      <Button
        mode="contained"
        icon="content-save"
        onPress={save}
        loading={saving}
        disabled={!text.trim() || saving}
      >
        Создать пост
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { textAlign: 'center', marginBottom: 16 },
  textarea: { minHeight: 100 },
  section: { marginTop: 16 },
});
