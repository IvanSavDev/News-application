import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import NewsCard from './NewsCard/NewsCard';
import { RootState } from 'src/store';
import { addSomeNews } from 'src/store/newsSlice';
import ButtonReload from 'src/components/Buttons/ButtonReload';
import { Statuses } from 'src/enums/enums';
import { Loader, WrapperLoader } from 'src/components/Loader';
import Error from './Error';
import { filterByExistence } from 'src/utils/utils';
import { getTopNewsData, getTopNewsIds } from 'src/api/api';
import { NEWS_COUNT_ON_PAGE } from 'src/constants/constants';
import { testNews } from 'src/testObj';

const Header = styled.header`
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: start;
  gap: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 760px;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

const MainPage = () => {
  const [status, setStatus] = useState(Statuses.Fulfilled);
  const { entities: news } = useSelector((state: RootState) => state.news);
  const dispatch = useDispatch();

  const sortedNews = Object.values(news).sort(
    (firstNews, secondsNews) => secondsNews.time - firstNews.time
  );

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsCount = Object.keys(news).length;
        if (newsCount < NEWS_COUNT_ON_PAGE) {
          setStatus(Statuses.Pending);
          const ids = await getTopNewsIds();
          const news = await getTopNewsData(ids);
          dispatch(addSomeNews(news));
          setStatus(Statuses.Fulfilled);
        }
      } catch {
        setStatus(Statuses.Rejected);
      }
    };

    loadNews();
  }, []);

  useEffect(() => {
    const pageRefreshRateInSeconds = 60;
    const millisecondsInOneSecond = 1000;
    const milliseconds = pageRefreshRateInSeconds * millisecondsInOneSecond;

    let timerId = setTimeout(async function timer() {
      try {
        const ids = await getTopNewsIds();
        const news = await getTopNewsData(ids);
        dispatch(addSomeNews(news));
        timerId = setTimeout(() => timer(), milliseconds);
      } catch {
        setStatus(Statuses.Rejected);
      }
    }, milliseconds);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const handleClick = async () => {
    try {
      setStatus(Statuses.Pending);
      const ids = await getTopNewsIds();
      const news = await getTopNewsData(ids);
      dispatch(addSomeNews(news));
      setStatus(Statuses.Fulfilled);
    } catch {
      setStatus(Statuses.Rejected);
    }
  };

  return (
    <Container>
      <Header>
        <h1>News</h1>
        <ButtonReload
          action={handleClick}
          disabled={status === Statuses.Pending}
        />
      </Header>
      <Wrapper>
        {status === Statuses.Pending && <Loader />}
        {status === Statuses.Rejected && <Error />}
        {status === Statuses.Fulfilled && (
          <>
            {filterByExistence(sortedNews).map(
              ({ title, score, by, time, id }) => (
                <NewsCard
                  id={id}
                  key={id}
                  title={title}
                  score={score}
                  author={by}
                  time={time}
                />
              )
            )}
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default MainPage;
