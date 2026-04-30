import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import postsReducer from './slices/postSlice';
import { persistReducer } from 'redux-persist';
import EncryptedStorage from 'react-native-encrypted-storage';

const combinedReducer = combineReducers({
  counter: counterReducer,
  posts: postsReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  blacklist: [],
  storage: EncryptedStorage,
};
const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
