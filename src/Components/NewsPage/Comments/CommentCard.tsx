import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { addComments } from 'src/store/commentsSlice';
import { Comment } from 'src/types';
import { getShortDate } from 'src/utils/utils';
import { getComments } from 'src/api';
import { Statuses } from 'src/Enums/Enums';

const Container = styled.li<{ isKids: boolean; disabled: boolean }>`
  border: 1px solid white;
  padding: 15px;
  margin-bottom: 15px;
  cursor: ${(props) => (props.isKids ? 'pointer' : 'auto')};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  &:hover {
    ${(props) => (props.isKids ? 'background-color: #4b4b4b92' : '')}
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const Author = styled.h3`
  display: inline-block;
  margin-right: 10px;
`;

const Date = styled.span`
  color: gray;
`;

const IndentComments = styled.ul<{ padding: number }>`
  padding-left: ${(props) => `${props.padding}px`};
`;

const Text = styled.p`
  overflow-wrap: break-word;
`;

const Error = styled.span`
  color: red;
`;

type Props = {
  padding: number;
  comment: Comment;
};

const CommentCard = ({ comment, padding }: Props) => {
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(Statuses.fulfilled);
  const { entities: comments } = useSelector(
    (state: RootState) => state.comments
  );
  const indent = 15;

  const { by, time, id, text, kids } = comment;

  const handleClick = async () => {
    setShowComments((previous) => !previous);
    if (kids && !comments[id]) {
      setStatus(Statuses.pending);
      try {
        const childComments = await getComments(kids);
        dispatch(addComments({ id, comments: childComments }));
        setStatus(Statuses.fulfilled);
        setShowComments(true);
      } catch {
        setStatus(Statuses.rejected);
      }
    }
  };

  return (
    <>
      <Container
        isKids={Boolean(kids)}
        onClick={handleClick}
        disabled={status === Statuses.pending}
      >
        <Wrapper>
          <div>
            <Author>{by}</Author>
            <Date>{getShortDate(time)}</Date>
          </div>
          {status === Statuses.rejected && (
            <Error>Error loading comments, please try again</Error>
          )}
        </Wrapper>
        <Text>{text}</Text>
      </Container>
      {showComments && comments[id] && (
        <IndentComments padding={indent}>
          {comments[id].map((child) => (
            <CommentCard
              key={child.id}
              padding={padding + indent}
              comment={child}
            />
          ))}
        </IndentComments>
      )}
    </>
  );
};

export default CommentCard;
