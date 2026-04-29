import { RootState } from '../reduxStore/store';

export const PostSelector = (postReduxState: RootState) => postReduxState.posts;
