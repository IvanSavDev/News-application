import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from 'src/store';
import { addNews } from 'src/store/newsSlice';
import Comments from './Comments/Comments';
import NewsCard from './NewsCard/NewsCard';
import { Statuses } from 'src/enums/enums';
import { Loader, WrapperLoader } from 'src/components/Loader';
import Error from './Error';
import { getNews } from 'src/api/api';

const Article = styled.article`
  display: flex;
  flex-direction: column;
  max-width: 760px;
  width: 100%;
  padding: 15px;
  background-color: #16181c;
  box-shadow: 0px 0px 6px 3px white;
`;

const NewsPage = () => {
  const [status, setStatus] = useState(Statuses.Fulfilled);
  const { entities: news } = useSelector((state: RootState) => state.news);
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const newsId = Number(id);

  const newsFromStore = news[newsId];

  useEffect(() => {
    if (!newsFromStore) {
      const loadNews = async () => {
        try {
          setStatus(Statuses.Pending);
          const news = await getNews(newsId);
          dispatch(addNews({ id: newsId, news }));
          setStatus(Statuses.Fulfilled);
        } catch {
          setStatus(Statuses.Rejected);
        }
      };

      loadNews();
    }
  }, []);

  return (
    <Article>
      {status === Statuses.Pending && (
        <WrapperLoader>
          <Loader />
        </WrapperLoader>
      )}
      {status === Statuses.Rejected && <Error />}
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
