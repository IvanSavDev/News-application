/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { News } from '../types';

export interface NewsState {
  entities: News[] | [];
}

const initialState: NewsState = {
  entities: [],
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addNews: (state, action: PayloadAction<News[]>) => {
      state.entities = [...action.payload];
    },
  },
});

export const { addNews } = newsSlice.actions;
export default newsSlice.reducer;
