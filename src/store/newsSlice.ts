/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { News } from '../types';

export interface NewsState {
  news: News[] | [];
}

const initialState: NewsState = {
  news: [],
};

export const newsSlice = createSlice({
  name: 'newsList',
  initialState,
  reducers: {
    addNews: (state, action: PayloadAction<News[]>) => {
      state.news = [...action.payload];
    },
  },
});

export const { addNews } = newsSlice.actions;
export default newsSlice.reducer;
