import { router } from 'expo-router';
import { useAppSelector } from '@/store/hooks';
import { selectBookedPosts } from '@/store/postsSlice';
import { PostList } from '@/components/PostList';
import type { Post } from '@/types/post';

export default function BookedScreen() {
  const posts = useAppSelector(selectBookedPosts);
  const openPost = (post: Post) => router.push(`/post/${post.id}`);

  return <PostList data={posts} onOpen={openPost} emptyText="В избранном пока пусто" />;
}
