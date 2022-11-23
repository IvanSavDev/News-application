import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../store';
import { addNews } from '../../store/newsSlice';
import { testNews } from '../../testObj';
import Comments from './Comments/Comments';
import NewsCard from './NewsCard';
import { Statuses } from '../../Enums/Enums';
import { Loader, WrapperLoader } from '../../Loader';
import Error from './Error';

const Article = styled.article`
  display: flex;
  flex-direction: column;
  max-width: 760px;
  width: 100%;
  padding: 15px;
  background-color: #16181c;
  color: 'white';
  box-shadow: 0px 0px 6px 3px white;
`;

const NewsPage = () => {
  const { id } = useParams<{ id: string }>();
  const newsId = Number(id);
  const { entities: news } = useSelector((state: RootState) => state.news);
  const [status, setStatus] = useState(Statuses.fulfilled);
  const dispatch = useDispatch();

  const newsFromStore = news.find((oneNews) => oneNews.id === newsId);

  useEffect(() => {
    if (!newsFromStore) {
      // const ids = await getTopNewsIds();
      // const news = await getTopNewsData(ids);
      // dispatch(news);

      // Plug
      try {
        setStatus(Statuses.pending);
        setTimeout(() => {
          dispatch(addNews(testNews));
          setStatus(Statuses.fulfilled);
        }, 2000);
      } catch {
        setStatus(Statuses.rejected);
      }
    }
  }, []);
  console.log('newsPage');
  return (
    <Article>
      {status === Statuses.pending && (
        <WrapperLoader>
          <Loader />
        </WrapperLoader>
      )}
      {status === Statuses.rejected && <Error />}
      {newsFromStore && (
        <>
          <NewsCard news={newsFromStore} />
          <Comments newsId={newsId} news={newsFromStore} />
        </>
      )}
    </Article>
  );
};

export default NewsPage;
