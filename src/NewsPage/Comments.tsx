import React from 'react';
import styled from 'styled-components';
import { CommentWithKids } from '../types';
import { getDate } from '../utils/utils';

const Wrapper = styled.div`
  border: 1px solid white;
  padding: 15px;
`;

const Author = styled.h3`
  display: inline-block;
  margin-right: 10px;
`;

const Date = styled.span`
  color: gray;
`;

type Props = {
  comments: CommentWithKids[];
  padding: number;
};

const IndentComments = styled.div<{ padding: number }>`
  padding-left: ${(props) => `${props.padding}px`};

  word-wrap: break-word;
`;

const Comments = ({ comments, padding }: Props) => (
  <IndentComments padding={padding}>
    {comments.map(({ id, by, text, time, kids }) => (
      <React.Fragment key={id}>
        <Wrapper>
          <div>
            <Author>{by}</Author>
            <Date>{getDate(time)}</Date>
          </div>
          <p>{text}</p>
        </Wrapper>
        {kids ? <Comments comments={kids} padding={padding + 10} /> : ''}
      </React.Fragment>
    ))}
  </IndentComments>
);

export default Comments;
