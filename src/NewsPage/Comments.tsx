import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import { addComments, deleteComments } from '../store/commentsSlice';
// import { getComments } from '../utils/utils';
import { testObj2 } from '../testObj';
import CommentCard from './CommentCard';
import ButtonReload from './ButtonReload';
import { News } from '../types';

const CommentTitle = styled.h3`
  display: inline-block;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

type Props = {
  id: number;
  news: News;
};

const Comments = ({ id, news }: Props) => {
  const { entities: comments } = useSelector(
    (state: RootState) => state.comments
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (news && !comments[id]) {
      // const loadComments = async () => {
      //   const loadedComments = await getComments(news.kids);
      //   dispatch(addComments({ id, comments: loadedComments }));
      // };

      // loadComments();
      dispatch(addComments({ id, comments: testObj2 }));
    }
  }, [news, comments[id]]);

  return (
    <>
      <Wrapper>
        <CommentTitle>Comments</CommentTitle>
        <ButtonReload action={() => dispatch(deleteComments())} />
      </Wrapper>
      {comments[id] &&
        comments[id].map((comment) => (
          <CommentCard key={comment.id} comment={comment} padding={0} />
        ))}
    </>
  );
};

export default Comments;
