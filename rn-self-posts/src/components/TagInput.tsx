import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip, TextInput } from 'react-native-paper';

interface Props {
  tags: string[];
  onChange: (tags: string[]) => void;
}

/** Поле ввода тегов: добавление по Enter/кнопке, удаление крестиком на чипе. */
export function TagInput({ tags, onChange }: Props) {
  const [draft, setDraft] = useState('');

  const add = () => {
    const t = draft.trim().toLowerCase();
    if (t && !tags.includes(t)) {
      onChange([...tags, t]);
    }
    setDraft('');
  };

  const remove = (t: string) => onChange(tags.filter((x) => x !== t));

  return (
    <View>
      <TextInput
        mode="outlined"
        label="Теги"
        placeholder="например: путешествия"
        value={draft}
        onChangeText={setDraft}
        onSubmitEditing={add}
        returnKeyType="done"
        right={<TextInput.Icon icon="plus" onPress={add} />}
      />
      {tags.length > 0 ? (
        <View style={styles.tags}>
          {tags.map((t) => (
            <Chip key={t} onClose={() => remove(t)} style={styles.chip}>
              {t}
            </Chip>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  chip: { marginRight: 0 },
});
