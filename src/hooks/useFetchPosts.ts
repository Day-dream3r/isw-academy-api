

import { useEffect, useState } from 'react'
import { TPostProps } from '../components/molecules/PostItem';
import { retrievePostsFromMMKV, savePostsInMMKV } from '../helpers/api';
import { getPostsWithAxios } from '../helpers/api/posts';

const useFetchPosts = () => {
    const [posts, setPosts] = useState<TPostProps[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage,setErrorMessage] = useState('')

    function handleRefresh() {
         getPostsWithAxios().then(onFetchPosts).catch(e => {
          const error = e.message
          if(error) setErrorMessage(error)
         }).finally(stopLoading);
        
    }

    function onFetchPosts(postItems: TPostProps[]) {
        setLoading(true)
        setPosts(postItems);
        savePostsInMMKV(postItems);
    }

    function stopLoading() {
        setLoading(false);
    }

    useEffect(() => {
        const storedPosts = retrievePostsFromMMKV();
        if (storedPosts.length > 0) setPosts(storedPosts);
        else getPostsWithAxios().then(onFetchPosts).finally(stopLoading);

    }, []);


    return ({ posts, loading, handleRefresh,errorMessage })
}

export default useFetchPosts

