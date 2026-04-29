import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from '../../src/api/client';
import { PostProp } from '../../src/api/post';

export interface PostsState {
  posts: PostProp[];
  isLoading?: boolean;
  errorMessage?: string;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  errorMessage: '',
};

type errorMessage = {
  message: string;
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/posts');
      return response.data;
    } catch (e) {
      const error = e as errorMessage;
      return rejectWithValue(error.message);
    }
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<PostProp[]>) => {
        state.isLoading = false;
        state.posts = action.payload;
      },
    );
    builder.addCase(
      fetchPosts.rejected,
      (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      },
    );
  },
});

// Action creators are generated for each case reducer function
//export const { increment, decrement, incrementByAmount } = postsSlice.actions

export default postsSlice.reducer;
