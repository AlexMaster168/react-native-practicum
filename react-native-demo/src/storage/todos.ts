import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Todo } from '@/types/todo';

const STORAGE_KEY = 'todos:v1';

/** Загружает задачи из локального хранилища (заменяет старый Firebase). */
export async function loadTodos(): Promise<Todo[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Todo[];
  } catch (e) {
    console.warn('Не удалось прочитать задачи из хранилища:', e);
    return [];
  }
}

/** Сохраняет полный список задач в локальное хранилище. */
export async function saveTodos(todos: Todo[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (e) {
    console.warn('Не удалось сохранить задачи:', e);
  }
}
