import { Alert, Image, Platform, ScrollView, Share, StyleSheet, View } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Button, Chip, Text, useTheme } from 'react-native-paper';
import * as Sharing from 'expo-sharing';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removePost, selectPostById, toggleBooked } from '@/store/postsSlice';
import { HeaderIcon } from '@/components/HeaderIcon';

export default function PostScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const postId = Number(id);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const post = useAppSelector(selectPostById(postId));

  if (!post) {
    return (
      <View style={styles.center}>
        <Text variant="bodyLarge">Пост не найден</Text>
      </View>
    );
  }

  const onToggle = () => dispatch(toggleBooked(post));

  const onRemove = () => {
    Alert.alert('Удаление поста', 'Вы точно хотите удалить пост?', [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: () => {
          dispatch(removePost(post.id));
          router.back();
        },
      },
    ]);
  };

  const onShare = async () => {
    const tagsLine = post.tags.length ? '\n\n' + post.tags.map((t) => `#${t}`).join(' ') : '';
    const message = `${post.text}${tagsLine}`;
    try {
      // RN Share: текст уходит на обеих платформах, фото прикрепляется на iOS.
      await Share.share(
        post.img && Platform.OS === 'ios' ? { message, url: post.img } : { message },
        { dialogTitle: 'Поделиться постом' }
      );
    } catch {
      // Фоллбэк: поделиться хотя бы файлом фото через нативный диалог.
      if (post.img && (await Sharing.isAvailableAsync())) {
        await Sharing.shareAsync(post.img);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          title: 'Пост от ' + new Date(post.date).toLocaleDateString(),
          headerRight: ({ tintColor }) => (
            <View style={styles.headerActions}>
              <HeaderIcon
                icon="share-variant"
                color={tintColor}
                accessibilityLabel="Поделиться"
                onPress={onShare}
              />
              <HeaderIcon
                icon={post.booked ? 'star' : 'star-outline'}
                color={tintColor}
                accessibilityLabel="В избранное"
                onPress={onToggle}
              />
            </View>
          ),
        }}
      />
      {post.img ? <Image source={{ uri: post.img }} style={styles.image} /> : null}
      <View style={styles.body}>
        <Text variant="bodyLarge">{post.text}</Text>
        {post.tags.length > 0 ? (
          <View style={styles.tags}>
            {post.tags.map((t) => (
              <Chip key={t} style={styles.chip}>
                {t}
              </Chip>
            ))}
          </View>
        ) : null}
        <Button
          mode="contained"
          icon="delete"
          buttonColor={theme.colors.error}
          onPress={onRemove}
          style={styles.removeBtn}
        >
          Удалить
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 24 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: 240 },
  body: { padding: 16, gap: 16 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: {},
  headerActions: { flexDirection: 'row' },
  removeBtn: { marginTop: 8 },
});
