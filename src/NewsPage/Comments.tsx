import React from 'react';
import styled from 'styled-components';
import { CommentWithKids } from '../types';
import { getShortDate } from '../utils/utils';

const Container = styled.div`
  border: 1px solid white;
  padding: 15px;
  margin-bottom: 15px;
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

  word-break: break-all;
`;

const Wrapper = styled.div`
  margin-bottom: 5px;
`;

const Comments = ({ comments, padding }: Props) => (
  <IndentComments padding={padding}>
    {comments.map(({ id, by, text, time, kids }) => (
      <React.Fragment key={id}>
        <Container>
          <Wrapper>
            <Author>{by}</Author>
            <Date>{getShortDate(time)}</Date>
          </Wrapper>
          <p>{text}</p>
        </Container>
        {kids ? <Comments comments={kids} padding={padding + 10} /> : ''}
      </React.Fragment>
    ))}
  </IndentComments>
);

export default Comments;
