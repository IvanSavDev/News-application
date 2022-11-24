/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { News } from '../types/types';

export interface NewsState {
  entities: {
    [id: number]: News;
  };
}

const initialState: NewsState = {
  entities: {},
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addNews: (state, action: PayloadAction<{ id: number; news: News }>) => {
      const { id, news } = action.payload;
      state.entities[id] = news;
    },
    addSomeNews: (state, action: PayloadAction<News[]>) => {
      action.payload.forEach((news) => (state.entities[news.id] = news));
    },
    deleteAllNews: (state) => {
      state.entities = {};
    },
  },
});

export const { addNews, addSomeNews } = newsSlice.actions;
export default newsSlice.reducer;
