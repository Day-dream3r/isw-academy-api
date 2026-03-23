import { useEffect, useState, useCallback } from 'react';
import PostItem, { PostProps } from '../molecules/PostItem';
import { ActivityIndicator, Alert, FlatList, StyleSheet } from 'react-native';
import { retrievePostsFromMMKV, savePostsInMMKV } from '../../helpers/api';
import { getPostsWithAxios } from '../../helpers/api/posts';

type ResponseError = {
  message: string;
};

export default function AllPosts() {
  const [posts, setPosts] = useState<PostProps[]>();
  const [loading, setLoading] = useState<Boolean>(true);

  function onFetchPosts(fetchedPosts: PostProps[]) {
    setPosts(fetchedPosts);
    savePostsInMMKV(fetchedPosts);
  }

  function stopLoading() {
    setLoading(false);
  }

  const onRefresh = useCallback(() => {
    setLoading(true);
    getPostsWithAxios()
      .then(onFetchPosts)
      .catch(e => {
        const error = e as ResponseError;
        Alert.alert('Error', error.message);
      })
      .finally(stopLoading);
  }, []);

  useEffect(() => {
    const storedPosts = retrievePostsFromMMKV();
    if (storedPosts.length > 0) {
      setPosts(storedPosts);
      setLoading(false);
    } else {
      onRefresh();
    }
  }, [onRefresh]);

  // Fetching and saving posts with AsyncStorage
  // useEffect(() => {
  //   retrievePostsFromAsyncStorage().then(retrievedPosts => {
  //     if (retrievedPosts.length > 0) {
  //       setPosts(retrievedPosts);
  //       setLoading(false);
  //     } else {
  //       getPostsWithAxios(setPosts);
  //     }
  //   });
  // }, []);

  return loading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostItem {...item} />}
      contentContainerStyle={styles.list}
      refreshing={loading}
      onRefresh={onRefresh}
    />
  );
}

const styles = StyleSheet.create({
  list: { gap: 16 },
});
