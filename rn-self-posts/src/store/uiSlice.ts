import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SortOrder } from '@/types/post';
import type { RootState } from './index';

export type ThemeMode = 'system' | 'light' | 'dark';

interface UiState {
  themeMode: ThemeMode;
  search: string;
  sort: SortOrder;
  activeTag: string | null;
}

const initialState: UiState = {
  themeMode: 'system',
  search: '',
  sort: 'date_desc',
  activeTag: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<ThemeMode>) {
      state.themeMode = action.payload;
    },
    /** Переключение по кругу: system → light → dark → system. */
    cycleThemeMode(state) {
      state.themeMode =
        state.themeMode === 'system' ? 'light' : state.themeMode === 'light' ? 'dark' : 'system';
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setSort(state, action: PayloadAction<SortOrder>) {
      state.sort = action.payload;
    },
    setActiveTag(state, action: PayloadAction<string | null>) {
      // повторный тап по активному тегу — сброс фильтра
      state.activeTag = state.activeTag === action.payload ? null : action.payload;
    },
    clearFilters(state) {
      state.search = '';
      state.activeTag = null;
    },
  },
});

export const { setThemeMode, cycleThemeMode, setSearch, setSort, setActiveTag, clearFilters } =
  uiSlice.actions;
export default uiSlice.reducer;

export const selectThemeMode = (s: RootState) => s.ui.themeMode;
export const selectSearch = (s: RootState) => s.ui.search;
export const selectSort = (s: RootState) => s.ui.sort;
export const selectActiveTag = (s: RootState) => s.ui.activeTag;
