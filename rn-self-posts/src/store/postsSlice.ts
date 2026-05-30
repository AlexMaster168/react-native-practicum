import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { File, Paths } from 'expo-file-system';
import * as db from '@/db/posts';
import type { NewPost, Post } from '@/types/post';
import type { RootState } from './index';

interface PostsState {
  items: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PostsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const loadPosts = createAsyncThunk('posts/load', async () => {
  return db.getPosts();
});

export const addPost = createAsyncThunk('posts/add', async (input: NewPost): Promise<Post> => {
  // Картинка из камеры/галереи лежит во временном кэше — переносим её
  // в постоянный каталог приложения, иначе ОС со временем её удалит.
  let imgPath = input.img;
  if (input.img) {
    try {
      const source = new File(input.img);
      const fileName = `${Date.now()}-${source.name}`;
      const dest = new File(Paths.document, fileName);
      await source.copy(dest);
      imgPath = dest.uri;
    } catch (e) {
      console.warn('Не удалось перенести фото, использую исходный uri:', e);
    }
  }

  const toSave: NewPost = { ...input, img: imgPath };
  const id = await db.createPost(toSave);
  return { ...toSave, id };
});

export const removePost = createAsyncThunk('posts/remove', async (id: number) => {
  await db.removePost(id);
  return id;
});

export const toggleBooked = createAsyncThunk('posts/toggleBooked', async (post: Post) => {
  const next = !post.booked;
  await db.updateBooked(post.id, next);
  return { id: post.id, booked: next };
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Не удалось загрузить посты';
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(toggleBooked.fulfilled, (state, action) => {
        const post = state.items.find((p) => p.id === action.payload.id);
        if (post) post.booked = action.payload.booked;
      });
  },
});

export default postsSlice.reducer;

/* ---------------------- селекторы ---------------------- */

export const selectAllPosts = (s: RootState) => s.posts.items;
export const selectPostsStatus = (s: RootState) => s.posts.status;
export const selectPostsError = (s: RootState) => s.posts.error;
export const selectBookedPosts = (s: RootState) => s.posts.items.filter((p) => p.booked);
export const selectPostById = (id: number) => (s: RootState) =>
  s.posts.items.find((p) => p.id === id);

/** Уникальные теги по всем постам (для фильтра и подсказок). */
export const selectAllTags = (s: RootState) => {
  const set = new Set<string>();
  s.posts.items.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort((a, b) => a.localeCompare(b, 'ru'));
};
