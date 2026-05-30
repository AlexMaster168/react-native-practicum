import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Menu, Searchbar } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loadPosts, selectAllPosts, selectAllTags } from '@/store/postsSlice';
import { selectVisiblePosts } from '@/store/selectors';
import {
  selectActiveTag,
  selectSearch,
  selectSort,
  setActiveTag,
  setSearch,
  setSort,
} from '@/store/uiSlice';
import { PostList } from '@/components/PostList';
import { TagFilterBar } from '@/components/TagFilterBar';
import { SORT_LABELS, type Post, type SortOrder } from '@/types/post';

export default function MainScreen() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectVisiblePosts);
  const totalCount = useAppSelector(selectAllPosts).length;
  const tags = useAppSelector(selectAllTags);
  const search = useAppSelector(selectSearch);
  const sort = useAppSelector(selectSort);
  const activeTag = useAppSelector(selectActiveTag);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  const openPost = (post: Post) => router.push(`/post/${post.id}`);

  const header = (
    <View style={styles.header}>
      <Searchbar
        placeholder="Поиск по постам"
        value={search}
        onChangeText={(t) => dispatch(setSearch(t))}
        style={styles.search}
      />
      <View style={styles.controls}>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button mode="outlined" icon="sort" onPress={() => setMenuVisible(true)}>
              {SORT_LABELS[sort]}
            </Button>
          }
        >
          {(Object.keys(SORT_LABELS) as SortOrder[]).map((key) => (
            <Menu.Item
              key={key}
              title={SORT_LABELS[key]}
              leadingIcon={sort === key ? 'check' : undefined}
              onPress={() => {
                dispatch(setSort(key));
                setMenuVisible(false);
              }}
            />
          ))}
        </Menu>
      </View>
      <TagFilterBar
        tags={tags}
        active={activeTag}
        onToggle={(t) => dispatch(setActiveTag(t))}
      />
    </View>
  );

  return (
    <PostList
      data={posts}
      onOpen={openPost}
      ListHeaderComponent={header}
      emptyText={totalCount === 0 ? 'Постов пока нет. Создайте первый!' : 'Ничего не найдено'}
    />
  );
}

const styles = StyleSheet.create({
  header: { paddingBottom: 8, gap: 10 },
  search: {},
  controls: { flexDirection: 'row', justifyContent: 'flex-start' },
});
