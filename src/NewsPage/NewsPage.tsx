import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../store';
import { addNews } from '../store/newsSlice';
import { addComments, deleteComments } from '../store/commentsSlice';
import { getFullDate, getComments } from '../utils/utils';
import { testNews, testObj2 } from '../testObj';
import CommentCard from './CommentCard';
import ButtonReload from './ButtonReload';

const Article = styled.article`
  max-width: 760px;
  padding: 15px;
  background-color: #16181c;
  color: 'white';
  box-shadow: 0px 0px 6px 3px white;
`;

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
  display: inline-block;
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

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const NewsPage = () => {
  const { id } = useParams<{ id: string }>();
  const newsId = Number(id);
  const { entities: news } = useSelector((state: RootState) => state.news);
  const { entities: comments } = useSelector(
    (state: RootState) => state.comments
  );
  const dispatch = useDispatch();

  const currentNews = news.find((oneNews) => oneNews.id === newsId);

  useEffect(() => {
    if (!currentNews) {
      dispatch(addNews(testNews));
    }
  }, []);

  useEffect(() => {
    if (currentNews && !comments[newsId]) {
      const loadComments = async () => {
        const loadedComments = await getComments(currentNews.kids);
        dispatch(addComments({ id: newsId, comments: loadedComments }));
      };

      loadComments();
      // dispatch(addComments({ id: newsId, comments: testObj2 }));
    }
  }, [currentNews, comments[newsId]]);

  if (!currentNews) {
    return <div>новость не найдена</div>;
  }

  const { title, by, time, url, descendants } = currentNews;

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
          <li>{`Comments count: ${descendants}`}</li>
        </List>
      </WrapperNews>
      <Wrapper>
        <CommentTitle>Comments</CommentTitle>
        <ButtonReload action={() => dispatch(deleteComments())} />
      </Wrapper>
      {comments[newsId] &&
        comments[newsId].map((comment) => (
          <CommentCard key={comment.id} comment={comment} padding={0} />
        ))}
    </Article>
  );
};

export default NewsPage;
