/**
 * Доменная модель поста.
 * В SQLite booked хранится как 0/1, tags — как JSON-строка; слой db/posts.ts
 * отвечает за конвертацию в эти удобные для UI типы и обратно.
 */
export interface Post {
  id: number;
  text: string;
  img: string;
  /** ISO-дата создания (new Date().toJSON()) */
  date: string;
  booked: boolean;
  tags: string[];
}

/** Данные для создания поста — без id (его выдаёт БД). */
export type NewPost = Omit<Post, 'id'>;

/** Варианты сортировки списка постов. */
export type SortOrder = 'date_desc' | 'date_asc';

export const SORT_LABELS: Record<SortOrder, string> = {
  date_desc: 'Сначала новые',
  date_asc: 'Сначала старые',
};
