/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from 'src/types/types';

export interface CommentsState {
  entities: {
    [id: number]: Comment[];
  };
}

const initialState: CommentsState = {
  entities: {},
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComments: (
      state,
      action: PayloadAction<{ id: number; comments: Comment[] }>
    ) => {
      const { id, comments } = action.payload;
      state.entities[id] = comments;
    },
  },
});

export const { addComments } = commentsSlice.actions;
export default commentsSlice.reducer;
