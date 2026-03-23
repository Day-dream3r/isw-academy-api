import { PostProps } from '../../components/molecules/PostItem';
import { client } from './request';

export function getPostsWithAxios() {
  return client.get('/posts').then(response => {
    const responseJson = response.data;
    return responseJson;
  });
}

export async function getPostsWithFetch(): Promise<PostProps[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const responseJson = await response.json();
  return responseJson;
}
