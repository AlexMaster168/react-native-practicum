import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Checkbox, List } from 'react-native-paper';
import type { Todo } from '@/types/todo';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onOpen: (id: string) => void;
  onRemove: (id: string) => void;
}

function TodoItemComponent({ todo, onToggle, onOpen, onRemove }: Props) {
  return (
    <List.Item
      title={todo.title}
      titleStyle={todo.done ? styles.done : undefined}
      onPress={() => onOpen(todo.id)}
      onLongPress={() => onRemove(todo.id)}
      left={() => (
        <Checkbox
          status={todo.done ? 'checked' : 'unchecked'}
          onPress={() => onToggle(todo.id)}
        />
      )}
      right={(p) => <List.Icon {...p} icon="chevron-right" />}
    />
  );
}

export const TodoItem = memo(TodoItemComponent);

const styles = StyleSheet.create({
  done: { textDecorationLine: 'line-through', opacity: 0.5 },
});
