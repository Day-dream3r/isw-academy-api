import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import PostItem from '../molecules/PostItem';
import { useDispatch, useSelector } from 'react-redux';
import { postSelector } from '../../redux/selectors/postSelectors';
import { AppDispatch } from '../../redux/store';
import { fetchPosts } from '../../redux/slices/postSlice';
import { useEffect } from 'react';

export default function AllPosts() {
  const { posts, isLoading, error } = useSelector(postSelector);
  const dispatch = useDispatch<AppDispatch>();

  function onRefresh() {
    dispatch(fetchPosts());
  }
  useEffect(() => {
    onRefresh();
  }, []);
  function handlePostRefresh() {
    onRefresh();
  }

  return isLoading ? (
    <ActivityIndicator />
  ) : error ? (
    <Text>{error}</Text>
  ) : (
    <FlatList
      data={posts}
      refreshing={isLoading}
      onRefresh={handlePostRefresh}
      renderItem={({ item }) => <PostItem {...item} />}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: { gap: 16 },
});
