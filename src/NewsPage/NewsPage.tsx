import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../store';
import { addNews } from '../store/newsSlice';
import { getFullDate } from '../utils/utils';
import { testNews } from '../testObj';
import Comments from './Comments';

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
  const { id } = useParams<{ id: string }>();
  const newsId = Number(id);
  const { entities: news } = useSelector((state: RootState) => state.news);
  const dispatch = useDispatch();

  const currentNews = news.find((oneNews) => oneNews.id === newsId);

  useEffect(() => {
    if (!currentNews) {
      dispatch(addNews(testNews));
    }
  }, []);

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
      <Comments id={newsId} news={currentNews} />
    </Article>
  );
};

export default NewsPage;
