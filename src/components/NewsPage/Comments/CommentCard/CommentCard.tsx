import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { addComments } from 'src/store/commentsSlice';
import { Comment } from 'src/types/types';
import { getShortDate } from 'src/utils/utils';
import { getComments } from 'src/api/api';
import { Statuses } from 'src/enums/enums';
import Error from './Error';

const Container = styled.li<{ isKids: boolean; disabled: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid white;
  padding: 15px;
  width: 100%;
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
`;

const Author = styled.h3`
  display: inline-block;
  margin-right: 10px;
`;

const Date = styled.span`
  color: gray;
`;

const IndentComments = styled.ul<{ padding: number }>`
  width: 100%;
  padding-left: ${(props) => `${props.padding}px`};
`;

const Text = styled.p`
  overflow-wrap: break-word;
`;

const CommentsCount = styled.p`
  color: gray;
  text-align: right;
`;

type Props = {
  padding?: number;
  comment: Comment;
};

const CommentCard = ({ comment, padding = 0 }: Props) => {
  const [status, setStatus] = useState(Statuses.Fulfilled);
  const [showComments, setShowComments] = useState(false);
  const { entities: comments } = useSelector(
    (state: RootState) => state.comments
  );
  const dispatch = useDispatch();
  const indentCommentCard = 15;

  const { by, time, id, text, kids } = comment;

  const handleClick = async () => {
    setShowComments((previous) => !previous);
    if (kids && !comments[id]) {
      try {
        setStatus(Statuses.Pending);
        const childComments = await getComments(kids);
        dispatch(addComments({ id, comments: childComments }));
        setStatus(Statuses.Fulfilled);
        setShowComments(true);
      } catch {
        setStatus(Statuses.Rejected);
      }
    }
  };

  return (
    <>
      <Container
        isKids={Boolean(kids)}
        onClick={handleClick}
        disabled={status === Statuses.Pending}
      >
        <Wrapper>
          <div>
            <Author>{by}</Author>
            <Date>{getShortDate(time)}</Date>
          </div>
          {status === Statuses.Rejected && <Error />}
        </Wrapper>
        <Text>{text}</Text>
        <CommentsCount>{`Comments: ${
          comment.kids ? comment.kids.length : 0
        }`}</CommentsCount>
      </Container>
      {showComments && comments[id] && (
        <IndentComments padding={indentCommentCard}>
          {comments[id].map((child) => (
            <CommentCard
              key={child.id}
              comment={child}
              padding={padding + indentCommentCard}
            />
          ))}
        </IndentComments>
      )}
    </>
  );
};

export default CommentCard;
