import * as SQLite from 'expo-sqlite';
import type { NewPost, Post } from '@/types/post';

/** Форма строки, как она лежит в SQLite (booked: 0/1, tags: JSON-строка). */
interface PostRow {
  id: number;
  text: string;
  img: string;
  date: string;
  booked: number;
  tags: string | null;
}

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync('posts.db');
  }
  return dbPromise;
}

function rowToPost(row: PostRow): Post {
  let tags: string[] = [];
  if (row.tags) {
    try {
      const parsed = JSON.parse(row.tags);
      if (Array.isArray(parsed)) tags = parsed.map(String);
    } catch {
      tags = [];
    }
  }
  return {
    id: row.id,
    text: row.text,
    img: row.img,
    date: row.date,
    booked: !!row.booked,
    tags,
  };
}

/**
 * Создаёт таблицу и при необходимости мигрирует старую схему
 * (база из старой версии приложения не имела колонки tags).
 */
export async function initDb(): Promise<void> {
  const db = await getDb();
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY NOT NULL,
      text TEXT NOT NULL,
      img TEXT,
      date TEXT,
      booked INTEGER DEFAULT 0,
      tags TEXT DEFAULT '[]'
    );
  `);

  const cols = await db.getAllAsync<{ name: string }>('PRAGMA table_info(posts)');
  if (!cols.some((c) => c.name === 'tags')) {
    await db.execAsync(`ALTER TABLE posts ADD COLUMN tags TEXT DEFAULT '[]'`);
  }
}

export async function getPosts(): Promise<Post[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<PostRow>('SELECT * FROM posts ORDER BY date DESC');
  return rows.map(rowToPost);
}

export async function createPost(post: NewPost): Promise<number> {
  const db = await getDb();
  const result = await db.runAsync(
    'INSERT INTO posts (text, img, date, booked, tags) VALUES (?, ?, ?, ?, ?)',
    post.text,
    post.img,
    post.date,
    post.booked ? 1 : 0,
    JSON.stringify(post.tags ?? [])
  );
  return result.lastInsertRowId;
}

export async function updateBooked(id: number, booked: boolean): Promise<void> {
  const db = await getDb();
  await db.runAsync('UPDATE posts SET booked = ? WHERE id = ?', booked ? 1 : 0, id);
}

export async function removePost(id: number): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM posts WHERE id = ?', id);
}
