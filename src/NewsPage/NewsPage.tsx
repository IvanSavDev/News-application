import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../store';
import { addComments, addNews } from '../store/newsSlice';
import { calculateCommentsCount, getFullDate } from '../utils/utils';
import { Comment, News } from '../types';
import { testNews, testObj } from '../testObj';
import Comments from './Comments';

const Article = styled.article`
  max-width: 760px;
  padding: 15px;
  background-color: #16181c;
  color: 'white';
  box-shadow: 0px 0px 6px 3px white;
`;

const getComments = async (idsComments: Number[]) => {
  const requestes = idsComments.map((idComment) =>
    axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${idComment}.json?print=pretty`
    )
  );

  const responses = await Promise.allSettled(requestes);
  const successfulResponses = responses.filter(
    ({ status }) => status === 'fulfilled'
  );

  const comments = successfulResponses.map(
    (res) => (res as PromiseFulfilledResult<{ data: Comment }>).value.data
  );

  return comments;
};

const Header = styled.h2`
  grid-area: title;
  display: inline-block;
  align-self: start;
`;

const List = styled.ul`
  grid-area: list;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0;
`;

const CommentTitle = styled.h3`
  margin-bottom: 10px;
`;

const WrapperNews = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'button title'
    '. list';
  gap: 10px;
  margin-bottom: 15px;
`;

const ButtonBack = styled(Link)`
  grid-area: button;
  align-self: center;
  border: 1px solid white;
  padding: 5px 10px;

  &:active {
    transform: scale(0.9);
  }
`;

const NewsPage = () => {
  const { id } = useParams();
  const { news, comments } = useSelector((state: RootState) => state.news);
  const dispatch = useDispatch();

  const currentNews = news.find((oneNews) => oneNews.id === +id);

  useEffect(() => {
    if (!currentNews) {
      dispatch(addNews(testNews));
    }
  }, []);

  useEffect(() => {
    dispatch(addComments({ id, comments: testObj.kids }));
    if (false) {
      if (!comments[id]) {
        const loadComments = async () => {
          // const response = await axios.get(
          //   `https://hacker-news.firebaseio.com/v0/item/${idNews}.json?print=pretty`
          // );

          const getKidsComments = async (comment: Comment | News) => {
            const copyComment = JSON.parse(JSON.stringify(comment));
            const kidsComments = copyComment?.kids;

            if (!kidsComments) {
              return comment;
            }

            // const requestes = kidsComments.map((idComment) =>
            //   axios.get(
            //     `https://hacker-news.firebaseio.com/v0/item/${idComment}.json?print=pretty`
            //   )
            // );

            // const responses = await Promise.allSettled(requestes);
            // const successfulResponses = responses.filter(
            //   ({ status }) => status === 'fulfilled'
            // );

            // const comments = successfulResponses.map(
            //   (res) => (res as PromiseFulfilledResult<{ data: Comment }>).value.data
            // );

            const comments = await getComments(kidsComments);

            const loadRestComments = comments.map((com) =>
              getKidsComments(com)
            );

            const result = await Promise.allSettled(loadRestComments);

            const successfulResult = result.filter(
              (res) => res.status === 'fulfilled'
            );

            const kids = successfulResult.map(
              (r) => (r as PromiseFulfilledResult<{ data: Comment }>).value
            );

            copyComment.kids = kids;

            return copyComment;
          };

          const result = await getKidsComments(currentNews);
          return result;
          // dispatch(addComments({ id: idNews, comments: result }));
        };

        loadComments().then((comments) => {
          console.log(comments);
          dispatch(addComments({ id: comments.id, comments: comments.kids }));
        });
      }
    }
  }, []);

  if (!currentNews) {
    return <div>новость не найдена</div>;
  }

  const { title, by, time, url } = currentNews;

  return (
    <Article>
      <WrapperNews>
        <ButtonBack to="/">{'<'}</ButtonBack>
        <Header>{title}</Header>
        <List>
          <li>{`Author: ${by}`}</li>
          <li>{`Publication date: ${getFullDate(time)}`}</li>
          <li>
            {'URL: '}
            <a href={url}>{url}</a>
          </li>
          <li>{`Comments count: ${calculateCommentsCount(comments[id])}`}</li>
        </List>
      </WrapperNews>

      <CommentTitle>Comments</CommentTitle>
      {comments[id] && <Comments comments={comments[id]} padding={0} />}
    </Article>
  );
};

export default NewsPage;
