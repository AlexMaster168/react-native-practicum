import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Chip, Icon, Text } from 'react-native-paper';
import type { Post } from '@/types/post';

interface Props {
  post: Post;
  onOpen: (post: Post) => void;
}

function PostCardComponent({ post, onOpen }: Props) {
  return (
    <Card style={styles.card} mode="elevated" onPress={() => onOpen(post)}>
      {post.img ? <Card.Cover source={{ uri: post.img }} /> : null}
      <Card.Content style={styles.content}>
        <View style={styles.metaRow}>
          <Text variant="labelSmall">{new Date(post.date).toLocaleDateString()}</Text>
          {post.booked ? (
            <View style={styles.bookedRow}>
              <Icon source="star" size={14} />
              <Text variant="labelSmall"> В избранном</Text>
            </View>
          ) : null}
        </View>
        <Text variant="bodyMedium" numberOfLines={2} style={styles.text}>
          {post.text}
        </Text>
        {post.tags.length > 0 ? (
          <View style={styles.tags}>
            {post.tags.map((t) => (
              <Chip key={t} compact style={styles.chip}>
                {t}
              </Chip>
            ))}
          </View>
        ) : null}
      </Card.Content>
    </Card>
  );
}

export const PostCard = memo(PostCardComponent);

const styles = StyleSheet.create({
  card: { marginBottom: 14 },
  content: { paddingTop: 12 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bookedRow: { flexDirection: 'row', alignItems: 'center' },
  text: { marginTop: 4 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  chip: { marginRight: 0 },
});
