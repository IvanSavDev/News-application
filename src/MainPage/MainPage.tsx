import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
import styled from 'styled-components';
import { testNews } from '../testObj';

import NewsCard from './NewsCard';
import { RootState } from '../store';
import { addNews } from '../store/newsSlice';
// import { News } from '../types';

const Header = styled.h1`
  text-align: center;
  margin-bottom: 10px;
`;

const MainPage = () => {
  const [numbersHistory, setNumbersHistory] = useState<Number[] | []>([]);
  const { entities: news } = useSelector((state: RootState) => state.news);
  const dispatch = useDispatch();

  useEffect(() => {
    const getListNews = async () => {
      // const response = await axios.get(
      //   'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
      // );
      setNumbersHistory([1, 2]);
    };
    getListNews();
  }, []);

  useEffect(() => {
    if (numbersHistory.length !== 0) {
      const loadNews = async () => {
        // const responses = [];
        // for (let i = 0; i < 2; i += 1) {
        //   responses.push(
        //     axios.get(
        //       `https://hacker-news.firebaseio.com/v0/item/${numbersHistory[i]}.json?print=pretty`
        //     )
        //   );
        // }
        // const result = await Promise.allSettled(responses);

        // const successfulResponses = result.filter(
        //   ({ status }) => status === 'fulfilled'
        // );
        // const listNews = successfulResponses.map(
        //   (res) => (res as PromiseFulfilledResult<{ data: News }>).value.data
        // );

        dispatch(addNews(testNews));
      };
      loadNews();
    }
  }, [numbersHistory]);

  return (
    <>
      <Header>News</Header>
      {news.map(({ title, score, by, time, id }) => (
        <NewsCard
          id={id}
          key={id}
          title={title}
          score={score}
          author={by}
          time={time}
        />
      ))}
    </>
  );
};

export default MainPage;
