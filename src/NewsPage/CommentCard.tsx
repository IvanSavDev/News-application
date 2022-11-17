import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addComments } from '../store/commentsSlice';
import { Comment } from '../types';
import { getComments, getShortDate } from '../utils/utils';

const Container = styled.div<{ isKids: boolean }>`
  border: 1px solid white;
  padding: 15px;
  margin-bottom: 15px;
  cursor: ${(props) => (props.isKids ? 'pointer' : 'auto')};
  &:hover {
    ${(props) => (props.isKids ? 'background-color: #4b4b4b92' : '')}
  }
`;

const Wrapper = styled.div`
  margin-bottom: 5px;
`;

const Author = styled.h3`
  display: inline-block;
  margin-right: 10px;
`;

const Date = styled.span`
  color: gray;
`;
const IndentComments = styled.div<{ padding: number }>`
  padding-left: ${(props) => `${props.padding}px`};

  word-break: break-all;
`;
type Props = {
  padding: number;
  comment: Comment;
};
const CommentCard = ({ comment, padding }: Props) => {
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const { entities: comments } = useSelector(
    (state: RootState) => state.comments
  );

  const { by, time, id, text, kids } = comment;

  return (
    <>
      <Container
        isKids={Boolean(kids)}
        onClick={async () => {
          setShowComments((previous) => !previous);
          if (kids && !comments[id]) {
            const currentComments = await getComments(kids);
            dispatch(addComments({ id, comments: currentComments }));
          }
        }}
      >
        <Wrapper>
          <Author>{by}</Author>
          <Date>{getShortDate(time)}</Date>
        </Wrapper>
        <p>{text}</p>
      </Container>
      {showComments && comments[id] && (
        <IndentComments padding={15}>
          {comments[id].map((child) => (
            <CommentCard
              key={child.id}
              padding={padding + 15}
              comment={child}
            />
          ))}
        </IndentComments>
      )}
    </>
  );
};

export default CommentCard;
