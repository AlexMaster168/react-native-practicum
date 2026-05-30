import { useEffect, useState } from 'react';
import { Button, Dialog, HelperText, Portal, TextInput } from 'react-native-paper';

interface Props {
  visible: boolean;
  initialValue: string;
  onCancel: () => void;
  onSave: (title: string) => void;
}

export function EditTodoDialog({ visible, initialValue, onCancel, onSave }: Props) {
  const [title, setTitle] = useState(initialValue);

  useEffect(() => {
    if (visible) setTitle(initialValue);
  }, [visible, initialValue]);

  const tooShort = title.trim().length < 3;

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>Редактировать задачу</Dialog.Title>
        <Dialog.Content>
          <TextInput
            mode="outlined"
            value={title}
            onChangeText={setTitle}
            autoFocus
            maxLength={64}
          />
          <HelperText type="error" visible={tooShort}>
            Минимальная длина названия — 3 символа
          </HelperText>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel}>Отмена</Button>
          <Button onPress={() => onSave(title.trim())} disabled={tooShort}>
            Сохранить
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
