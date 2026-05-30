import { type ReactElement } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { PostCard } from './PostCard';
import type { Post } from '@/types/post';

interface Props {
  data: Post[];
  onOpen: (post: Post) => void;
  ListHeaderComponent?: ReactElement | null;
  emptyText?: string;
}

export function PostList({
  data,
  onOpen,
  ListHeaderComponent,
  emptyText = 'Постов пока нет',
}: Props) {
  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={data}
      keyExtractor={(p) => String(p.id)}
      renderItem={({ item }) => <PostCard post={item} onOpen={onOpen} />}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text variant="bodyLarge" style={styles.emptyText}>
            {emptyText}
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  content: { padding: 12, flexGrow: 1 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyText: { opacity: 0.6 },
});
