import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

interface Props {
  onSubmit: (title: string) => void;
}

export function AddTodo({ onSubmit }: Props) {
  const [value, setValue] = useState('');

  const submit = () => {
    const title = value.trim();
    if (!title) return;
    onSubmit(title);
    setValue('');
  };

  return (
    <View style={styles.block}>
      <TextInput
        mode="outlined"
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder="Новая задача..."
        autoCapitalize="sentences"
        onSubmitEditing={submit}
        returnKeyType="done"
        dense
      />
      <Button mode="contained" icon="plus" onPress={submit} disabled={!value.trim()}>
        Добавить
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  block: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  input: { flex: 1 },
});
