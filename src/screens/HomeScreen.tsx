import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import { client } from '../api/request';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PostProps = {
  id?: number;
  userId?: number;
  title: string;
  body: string;
};

type AllPostsProps = {
  loading: Boolean;
  posts: PostProps[];
  refreshing: boolean;
  onRefresh: () => void;
};

type ErrorObj = {
  error: string;
  message: string;
};

const HomeScreen = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  function PostItem({ title, body }: PostProps) {
    return (
      <View style={styles.postItem}>
        <Text style={styles.postTitle}>{title}</Text>
        <Text>{body}</Text>
      </View>
    );
  }

  const getPostWithAxiosUsingAsyncStorage = () => {
    return client.get('/posts').then(response => {
      const responseJson = response.data;
      setPosts(responseJson);
      return AsyncStorage.setItem('posts', JSON.stringify(responseJson));
    });
  };

  async function retrievePostsFromAsyncStorage(): Promise<PostProps[]> {
    const storedPosts = await AsyncStorage.getItem('posts');
    if (storedPosts) {
      return JSON.parse(storedPosts);
    }
    return [];
  }

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await getPostWithAxiosUsingAsyncStorage();
    } catch (e) {
      const err = e as ErrorObj;
      Alert.alert('Error', err.message);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  function AllPosts({ loading, posts, refreshing, onRefresh }: AllPostsProps) {
    return loading ? (
      <ActivityIndicator />
    ) : (
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostItem {...item} />}
        // `gap` isn't supported in all React Native versions — use a separator instead
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    );
  }

  useEffect(() => {
    retrievePostsFromAsyncStorage().then(retrievedPosts => {
      if (retrievedPosts.length) {
        setPosts(retrievedPosts);
        setLoading(false);
      } else {
        return getPostWithAxiosUsingAsyncStorage();
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {error ? (
        <Text>{error}</Text>
      ) : (
        <AllPosts
          loading={loading}
          posts={posts}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postItem: {
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderColor: 'green',
    borderRadius: 10,
    borderWidth: 1,
  },
  postTitle: {
    marginBottom: 8,
  },
});

export default HomeScreen;
