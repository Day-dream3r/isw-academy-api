import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { TPostProps } from '../../components/molecules/PostItem'
import { client } from '../../helpers/api/request'


export interface PostsState {
  posts: TPostProps[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await client.get('/posts');
        console.log({response},'response')
        return response.data
    } catch (error) {
        
    }
})
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
      builder.addCase(fetchPosts.pending, (state,action) => {
        state.isLoading = true;
      });
      builder.addCase(fetchPosts.fulfilled, (state,action: PayloadAction<TPostProps[]>) => {
        state.posts = action.payload;
        state.isLoading = false;
      });
      builder.addCase(fetchPosts.rejected, (state,action) => {
        state.error = action.error.message || 'Failed to fetch posts';
        state.isLoading = false;
      });
  },
})

// Action creators are generated for each case reducer function
export const {  } = postsSlice.actions


export default postsSlice.reducer