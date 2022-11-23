import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { testNews } from '../../testObj';
import NewsCard from './NewsCard';
import { RootState } from '../../store';
import { addNews } from '../../store/newsSlice';
import { News } from '../../types';
import ButtonReload from '../Buttons/ButtonReload';
import { Statuses } from '../../Enums/Enums';
import { Loader, WrapperLoader } from '../../Loader';
import Error from './Error';
import { filterByExistence } from 'src/utils/utils';

const WrapperNewsCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

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

const WrapperError = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-grow: 1;
`;

const MainPage = () => {
  const { entities: news } = useSelector((state: RootState) => state.news);
  const [status, setStatus] = useState(Statuses.fulfilled);
  const dispatch = useDispatch();

  const sortedNews = [...news].sort(
    (firstNews, secondsNews) => secondsNews.time - firstNews.time
  );

  useEffect(() => {
    const loadNews = async () => {
      if (news.length === 0) {
        try {
          setStatus(Statuses.pending);
          // const ids = await getTopNewsIds();
          // const news = await getTopNewsData(ids);
          // dispatch(news);

          // Plug
          dispatch(addNews(testNews));
          setStatus(Statuses.fulfilled);
        } catch (error) {
          setStatus(Statuses.rejected);
        }
      }
    };

    loadNews();
  }, []);

  useEffect(() => {
    const millisecondsInOneSecond = 1000;
    const secondsInOneMinute = 60;
    const millisecondsInOneMinute =
      millisecondsInOneSecond * secondsInOneMinute;

    let timerId = setTimeout(function timer() {
      try {
        // const ids = await getTopNewsIds();
        // const news = await getTopNewsData(ids);
        // dispatch(news);

        // plug
        dispatch(addNews(testNews));
        setStatus(Statuses.fulfilled);
        timerId = setTimeout(() => timer(), millisecondsInOneMinute);
      } catch (error) {
        setStatus(Statuses.rejected);
      }
    }, millisecondsInOneMinute);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <Container>
      <Header>
        <h1>News</h1>
        <ButtonReload
          action={() => {
            setStatus(Statuses.pending);
            setTimeout(async () => {
              try {
                // const ids = await getTopNewsIds();
                // const news = await getTopNewsData(ids);
                // dispatch(news);

                // plug
                dispatch(addNews(testNews));
                setStatus(Statuses.fulfilled);
              } catch {
                setStatus(Statuses.rejected);
              }
            }, 2000);
          }}
          disabled={status === Statuses.pending}
        />
      </Header>
      {status === Statuses.pending && (
        <WrapperLoader>
          <Loader />
        </WrapperLoader>
      )}
      {status === Statuses.rejected && (
        <WrapperError>
          <Error />
        </WrapperError>
      )}
      {status === Statuses.fulfilled && (
        <WrapperNewsCards>
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
        </WrapperNewsCards>
      )}
    </Container>
  );
};

export default MainPage;
