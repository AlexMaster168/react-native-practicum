import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';

const selectItems = (s: RootState) => s.posts.items;
const selectSearch = (s: RootState) => s.ui.search;
const selectSort = (s: RootState) => s.ui.sort;
const selectActiveTag = (s: RootState) => s.ui.activeTag;

/**
 * Посты для главного экрана с применёнными поиском, фильтром по тегу
 * и сортировкой. createSelector кэширует результат, пока входы не изменились.
 */
export const selectVisiblePosts = createSelector(
  [selectItems, selectSearch, selectSort, selectActiveTag],
  (items, search, sort, activeTag) => {
    let result = items;

    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (p) =>
          p.text.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (activeTag) {
      result = result.filter((p) => p.tags.includes(activeTag));
    }

    return [...result].sort((a, b) => {
      const da = new Date(a.date).getTime();
      const dbt = new Date(b.date).getTime();
      return sort === 'date_desc' ? dbt - da : da - dbt;
    });
  }
);
