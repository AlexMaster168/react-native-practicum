import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Button, Card, Checkbox, Text, useTheme } from 'react-native-paper';
import { useTodos } from '@/context/TodoContext';
import { EditTodoDialog } from '@/components/EditTodoDialog';

export default function TodoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { todos, updateTodo, removeTodo, toggleTodo } = useTodos();
  const theme = useTheme();
  const [editing, setEditing] = useState(false);

  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return (
      <View style={styles.center}>
        <Text variant="bodyLarge">Задача не найдена</Text>
      </View>
    );
  }

  const onDelete = () => {
    Alert.alert('Удаление дела', `Удалить «${todo.title}»?`, [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: () => {
          removeTodo(todo.id);
          router.back();
        },
      },
    ]);
  };

  const onSave = (title: string) => {
    updateTodo(todo.id, title);
    setEditing(false);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: todo.title }} />

      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <View style={styles.titleRow}>
            <Checkbox
              status={todo.done ? 'checked' : 'unchecked'}
              onPress={() => toggleTodo(todo.id)}
            />
            <Text
              variant="titleLarge"
              style={[styles.title, todo.done && styles.done]}
            >
              {todo.title}
            </Text>
          </View>
          <Text variant="bodySmall" style={styles.meta}>
            Создано: {new Date(todo.createdAt).toLocaleString()}
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button icon="pencil" onPress={() => setEditing(true)}>
            Изменить
          </Button>
        </Card.Actions>
      </Card>

      <View style={styles.buttons}>
        <Button mode="outlined" icon="arrow-left" onPress={() => router.back()}>
          Назад
        </Button>
        <Button
          mode="contained"
          icon="delete"
          buttonColor={theme.colors.error}
          onPress={onDelete}
        >
          Удалить
        </Button>
      </View>

      <EditTodoDialog
        visible={editing}
        initialValue={todo.title}
        onCancel={() => setEditing(false)}
        onSave={onSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: {},
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { flex: 1 },
  done: { textDecorationLine: 'line-through', opacity: 0.5 },
  meta: { marginTop: 12, opacity: 0.6 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between' },
});
