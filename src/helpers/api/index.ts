import { createMMKV } from 'react-native-mmkv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostProps } from '../../components/molecules/PostItem';

const storage = createMMKV();

export function savePostsInMMKV(postsToSave: PostProps[]) {
  storage.set('posts', JSON.stringify(postsToSave));
}

export function retrievePostsFromMMKV(): PostProps[] {
  const postsMMKV = storage.getString('posts');
  if (postsMMKV) return JSON.parse(postsMMKV);
  return [];
}

export const savePostsWithAsyncStorage = (posts: PostProps) =>
  AsyncStorage.setItem('posts', JSON.stringify(posts));

export async function retrievePostsFromAsyncStorage(): Promise<PostProps[]> {
  const storedPosts = await AsyncStorage.getItem('posts');
  if (storedPosts) return JSON.parse(storedPosts);
  return [];
}
