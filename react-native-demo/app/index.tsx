import { useMemo, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import { useTodos } from '@/context/TodoContext';
import { AddTodo } from '@/components/AddTodo';
import { TodoItem } from '@/components/TodoItem';
import { FilterBar } from '@/components/FilterBar';
import { EmptyState } from '@/components/EmptyState';
import type { TodoFilter } from '@/types/todo';

export default function HomeScreen() {
  const { todos, loading, addTodo, toggleTodo, removeTodo } = useTodos();
  const [filter, setFilter] = useState<TodoFilter>('all');
  const [search, setSearch] = useState('');

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return todos.filter((t) => {
      if (filter === 'active' && t.done) return false;
      if (filter === 'completed' && !t.done) return false;
      if (q && !t.title.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [todos, filter, search]);

  const confirmRemove = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    Alert.alert('Удаление дела', `Удалить «${todo?.title ?? ''}»?`, [
      { text: 'Отмена', style: 'cancel' },
      { text: 'Удалить', style: 'destructive', onPress: () => removeTodo(id) },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  const header = (
    <View style={styles.header}>
      <AddTodo onSubmit={addTodo} />
      {todos.length > 0 ? (
        <>
          <Searchbar
            placeholder="Поиск по делам"
            value={search}
            onChangeText={setSearch}
            style={styles.search}
          />
          <FilterBar value={filter} onChange={setFilter} />
        </>
      ) : null}
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={styles.content}
      data={visible}
      keyExtractor={(t) => t.id}
      ListHeaderComponent={header}
      renderItem={({ item }) => (
        <TodoItem
          todo={item}
          onToggle={toggleTodo}
          onOpen={(id) => router.push(`/todo/${id}`)}
          onRemove={confirmRemove}
        />
      )}
      ListEmptyComponent={
        <EmptyState text={todos.length === 0 ? 'Дел пока нет. Добавьте первое!' : 'Ничего не найдено'} />
      }
    />
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, flexGrow: 1 },
  header: { marginBottom: 4 },
  search: { marginBottom: 12 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
