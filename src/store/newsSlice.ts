/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { News, Comment, CommentWithKids } from '../types';

export interface NewsState {
  news: News[] | [];
  comments: {
    [id: number]: CommentWithKids[] | [];
  };
}

const initialState: NewsState = {
  news: [],
  comments: {},
};

export const newsSlice = createSlice({
  name: 'newsList',
  initialState,
  reducers: {
    addNews: (state, action: PayloadAction<News[]>) => {
      state.news = [...action.payload];
    },
    addComments: (
      state,
      action: PayloadAction<{ id: number; comments: CommentWithKids[] }>
    ) => {
      const { id, comments } = action.payload;
      state.comments[id] = comments;
    },
  },
});

export const { addNews, addComments } = newsSlice.actions;
export default newsSlice.reducer;
